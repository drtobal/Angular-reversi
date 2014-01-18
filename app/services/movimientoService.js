reversi.service('movimientoService', [
    '$rootScope',
    function($rootScope) {
        //-> x
        this.movimientoValido = function(y, x, c, tablero) {
            if (typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            return (!(y < 0 || y > 7 || x < 0 || x > 7) &&
                    (tablero[y][x].value === null) &&
                    this.puedeCapturar(y, x, c, tablero));
        };
        this.puedeCapturar = function(y, x, c, tablero) {
            if (typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            for (var a = -1; a <= 1; ++a)
                for (var b = -1; b <= 1; ++b)
                    if (!(a === 0 && b === 0))
                        if (this.puedeCapturarDir(y, x, a, b, c, tablero)) {
                            return true;
                            break;
                        }
            return false;
        };
        this.puedeCapturarDir = function(y, x, yo, xo, miColor, tablero) {
            if (typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            var otroColor = (miColor === 0) ? 1 : 0;
            return (!(y + yo + yo < 0 || y + yo + yo > 7 || x + xo + xo < 0 || x + xo + xo > 7) &&
                    tablero[y + yo][x + xo].value !== null &&
                    tablero[y + yo][x + xo].value === otroColor &&
                    (tablero[y + yo + yo][x + xo + xo].value === miColor ||
                            this.puedeCapturarDir(y + yo, x + xo, yo, xo, miColor, tablero)));
        };
        this.checkeaMovimientos = function(turno, tablero) {
            if (typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            for (var y = 0; y < 8; y++)
                for (var x = 0; x < 8; x++)
                    tablero[y][x].puedeMover = this.movimientoValido(y, x, turno, tablero);
        };
        this.movimientoCPU = function(c, tablero) {
            var prospeccion = 6;
            $rootScope.mejores = new Array();
            $rootScope.mejor = -999;
            var a = this.movimiento(c, c, tablero, 0, prospeccion, 0, 0);
            console.log($rootScope.mejores);
            return a;
        };
        this.movimiento = function(miColor, c, tablero, turno, prospeccion, sum, origen) {
            if (turno <= prospeccion) {
                var movidas = new Array();
                var puntajeMaximo = -999, mx = 0, my = 0;
                for (var y = 0; y < 8; y++) {
                    for (var x = 0; x < 8; x++) {
                        var vc = this.valorCelda(y, x, c, tablero);
                        if (vc !== false) {
                            var puntaje = (vc * $rootScope.valoresDelTablero[y][x]);
                            if (puntaje === puntajeMaximo) {
                                movidas.push({
                                    y: y,
                                    x: x,
                                    v: puntaje,
                                    turno: turno,
                                    c: c,
                                    tablero: this.realizaMovimiento(y, x, c, JSON.parse(JSON.stringify(tablero))),
                                    sum: (miColor == c) ? (sum + puntaje) : (sum - puntaje),
                                    origen: origen
                                });
                            } else if (puntaje > puntajeMaximo) {
                                movidas = new Array({
                                    y: y,
                                    x: x,
                                    v: puntaje,
                                    turno: turno,
                                    c: c,
                                    tablero: this.realizaMovimiento(y, x, c, JSON.parse(JSON.stringify(tablero))),
                                    sum: (miColor == c) ? (sum + puntaje) : (sum - puntaje),
                                    origen: origen
                                });
                                puntajeMaximo = puntaje;
                            }
                        }
                    }
                }
                if (movidas.length === 0) {
                    return false;
                } else {
                    ++turno;
                    for (var x = 0 in movidas) {
                        if (turno === 1) {
                            origen = x;
                        }
                        var nTablero = this.realizaMovimiento(movidas[x].y, movidas[x].x, c, JSON.parse(JSON.stringify(tablero)));
                        movidas[x].movidas = this.movimiento(miColor, ((c == 1) ? 0 : 1), nTablero, turno, prospeccion, movidas[x].sum, origen);
                    }
                }
            } else {
                if(sum > $rootScope.mejor){
                    $rootScope.mejores = new Array({
                        origen: origen,
                        sum: sum
                    });
                    $rootScope.mejor = sum;
                } else if(sum == $rootScope.mejor){
                    $rootScope.mejores.push({
                        origen: origen,
                        sum: sum
                    });
                }
            }
            return movidas;
        };
        this.puntajeEntreDirecciones = function(y, x, yo, xo, miColor, tablero) {
            if (typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            var otroColor = (miColor === 0) ? 1 : 0;
            var resultado = 0;
            if (tablero[y + yo][x + xo].value === otroColor)
                resultado = 1 + this.puntajeEntreDirecciones(y + yo, x + xo, yo, xo, miColor, tablero);
            return resultado;
        };
        this.valorCelda = function(y, x, c, tablero) {
            if (typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            var puntaje = 0;
            if (this.movimientoValido(y, x, c, tablero)) {
                puntaje = 1;
                for (var a = -1; a <= 1; a++)
                    for (var b = -1; b <= 1; b++)
                        if (!(a === 0 && b === 0))
                            if (this.puedeCapturarDir(y, x, a, b, c, tablero))
                                puntaje += this.puntajeEntreDirecciones(y, x, a, b, c, tablero);
            } else
                return false;
            return puntaje;
        };
        this.realizaMovimiento = function(y, x, c, tablero) {
            if (this.movimientoValido(y, x, c, tablero)) {
                tablero[y][x].value = c;
                tablero = this.pintaIntermedios(y, x, c, tablero);
            }
            return tablero;
        };
        this.pintaIntermedios = function(y, x, c, tablero) {
            if (typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            for (var a = -1; a <= 1; ++a) {
                for (var b = -1; b <= 1; ++b) {
                    if (!(a === 0 && b === 0)) {
                        if (this.puedeCapturarDir(y, x, a, b, c, tablero)) {
                            tablero = this.pintaIntermediosDir(y, x, a, b, c, tablero);
                        }
                    }
                }
            }
            return tablero;
        };
        this.pintaIntermediosDir = function(y, x, yo, xo, miColor, tablero) {
            if (typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            var otroColor = (miColor === 0) ? 1 : 0;
            if (tablero[y + yo][x + xo].value === otroColor) {
                tablero[y + yo][x + xo].value = miColor;
                this.pintaIntermediosDir(y + yo, x + xo, yo, xo, miColor, tablero);
            }
            return tablero;
        };
        this.getRandomArbitary = function(min, max) {
            return parseInt(Math.random() * (max - min) + min);
        };
    }
]);