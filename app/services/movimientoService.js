reversi.service('movimientoService', [
    '$rootScope',
    function($rootScope) {
        //-> x
        this.movimientoValido = function(y, x, c, tablero) {
            if(typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            return (!(y < 0 || y > 7 || x < 0 || x > 7) &&
                    (tablero[y][x].value === null) &&
                    this.puedeCapturar(y, x, c, tablero));
        };
        this.puedeCapturar = function(y, x, c, tablero) {
            if(typeof tablero === 'undefined')
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
            if(typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            var otroColor = (miColor === 0) ? 1 : 0;
            return (!(y + yo + yo < 0 || y + yo + yo > 7 || x + xo + xo < 0 || x + xo + xo > 7) &&
                    tablero[y + yo][x + xo].value !== null &&
                    tablero[y + yo][x + xo].value === otroColor &&
                    (tablero[y + yo + yo][x + xo + xo].value === miColor ||
                            this.puedeCapturarDir(y + yo, x + xo, yo, xo, miColor, tablero)));
        };
        this.checkeaMovimientos = function(turno, tablero) {
            if(typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            for (var y = 0; y < 8; y++)
                for (var x = 0; x < 8; x++)
                    tablero[y][x].puedeMover = this.movimientoValido(y, x, turno, tablero);
        };
        this.movimientoCPU = function(tablero){
            if(typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            var turno = 0;
            this.movimiento(tablero);
        };
        this.movimiento = function(c, tablero) {
            if(typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
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
                                v: puntaje
                            });
                        } else if (puntaje > puntajeMaximo) {
                            movidas = new Array({
                                y: y,
                                x: x,
                                v: puntaje
                            });
                            puntajeMaximo = puntaje;
                        }
                    }
                }
            }
            $("a[href]").each(function() {
                $(this).attr("href", $(this).attr("href").replace(new RegExp("\"","g"), ""));
            })
            if (movidas.length === 0) {
                return false;
            }
            var movida = movidas[this.getRandomArbitary(0, movidas.length - 1)];
            console.log("-----");
            console.log(movidas);
            console.log(movida);
            this.realizaMovimiento(movida.y, movida.x, c);
            $rootScope.ultimoMovimiento = movida.y + "," + movida.x;
        };
        this.puntajeEntreDirecciones = function(y, x, yo, xo, miColor, tablero) {
            if(typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            var otroColor = (miColor === 0) ? 1 : 0;
            var resultado = 0;
            if (tablero[y + yo][x + xo].value === otroColor)
                resultado = 1 + this.puntajeEntreDirecciones(y + yo, x + xo, yo, xo, miColor, tablero);
            return resultado;
        };
        this.valorCelda = function(y, x, c, tablero) {
            if(typeof tablero === 'undefined')
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
            if(typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            if (this.movimientoValido(y, x, c)) {
                tablero[y][x].value = c;
                this.pintaIntermedios(y, x, c, tablero);
            }
        };
        this.pintaIntermedios = function(y, x, c, tablero) {
            if(typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            for (var a = -1; a <= 1; ++a) {
                for (var b = -1; b <= 1; ++b) {
                    if (!(a === 0 && b === 0)) {
                        if (this.puedeCapturarDir(y, x, a, b, c, tablero)) {
                            this.pintaIntermediosDir(y, x, a, b, c, tablero);
                        }
                    }
                }
            }
        };
        this.pintaIntermediosDir = function(y, x, yo, xo, miColor, tablero) {
            if(typeof tablero === 'undefined')
                tablero = $rootScope.tablero;
            var otroColor = (miColor === 0) ? 1 : 0;
            if (tablero[y + yo][x + xo].value === otroColor) {
                tablero[y + yo][x + xo].value = miColor;
                this.pintaIntermediosDir(y + yo, x + xo, yo, xo, miColor, tablero);
            }
        };
        this.getRandomArbitary = function(min, max) {
            return parseInt(Math.random() * (max - min) + min);
        };
    }
]);