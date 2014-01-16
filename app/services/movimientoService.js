reversi.service('movimientoService', [
    '$rootScope',
    function($rootScope) {
        //-> x
        this.movimientoValido = function(y, x, c) {
            return (!(y < 0 || y > 7 || x < 0 || x > 7) &&
                    ($rootScope.tablero[y][x].value === null) &&
                    this.puedeCapturar(y, x, c));
        };
        this.puedeCapturar = function(y, x, c) {
            for (var a = -1; a <= 1; ++a) {
                for (var b = -1; b <= 1; ++b) {
                    if (!(a === 0 && b === 0)) {
                        if (this.puedeCapturarDir(y, x, a, b, c)) {
                            return true;
                            break;
                        }
                    }
                }
            }
            return false;
        };
        this.puedeCapturarDir = function(y, x, yo, xo, miColor) {
            var otroColor = (miColor === 0) ? 1 : 0;
            return (!(y + yo + yo < 0 || y + yo + yo > 7 || x + xo + xo < 0 || x + xo + xo > 7) &&
                    $rootScope.tablero[y + yo][x + xo].value !== null &&
                    $rootScope.tablero[y + yo][x + xo].value === otroColor &&
                    ($rootScope.tablero[y + yo + yo][x + xo + xo].value === miColor ||
                            this.puedeCapturarDir(y + yo, x + xo, yo, xo, miColor)));
        };
        this.checkeaMovimientos = function(turno) {
            for (var y = 0; y < 8; y++) {
                for (var x = 0; x < 8; x++) {
                    $rootScope.tablero[y][x].puedeMover = this.movimientoValido(y, x, turno);
                    if ($rootScope.tablero[y][x].puedeMover) {
                        console.log($rootScope.tablero[y][x]);
                    }
                }
            }
        };
        this.movimientoCPU = function(c) {
            var movidas = new Array();
            var puntajeMaximo = 0, mx = 0, my = 0;
            for (var y = 0; y < 8; y++) {
                for (var x = 0; x < 8; x++) {
                    var puntaje = this.valorCelda(y, x, c);
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
            var movida = movidas[this.getRandomArbitary(0, movidas.length - 1)];
            console.log("-----");
            console.log(movidas.length);
            this.realizaMovimiento(movida.y, movida.x, c);
        };
        this.puntajeEntreDirecciones = function(y, x, yo, xo, miColor) {
            var otroColor = (miColor === 0) ? 1 : 0;
            var resultado = 0;
            if ($rootScope.tablero[y + yo][x + xo].value === otroColor)
                resultado = 1 + this.puntajeEntreDirecciones(y + yo, x + xo, yo, xo, miColor);
            return resultado;
        };
        this.valorCelda = function(y, x, c) {
            var puntaje = 0;
            if (this.movimientoValido(y, x, c)) {
                puntaje = 1;
                for (var a = -1; a <= 1; a++)
                    for (var b = -1; b <= 1; b++)
                        if (!(a === 0 && b === 0))
                            if (this.puedeCapturarDir(y, x, a, b, c))
                                puntaje += this.puntajeEntreDirecciones(y, x, a, b, c);
            }
            return puntaje;
        };
        this.realizaMovimiento = function(y, x, c) {
            if (this.movimientoValido(y, x, c)) {
                $rootScope.tablero[y][x].value = c;
                this.pintaIntermedios(y, x, c);
            }
        };
        this.pintaIntermedios = function(y, x, c) {
            for (var a = -1; a <= 1; ++a) {
                for (var b = -1; b <= 1; ++b) {
                    if (!(a === 0 && b === 0)) {
                        if (this.puedeCapturarDir(y, x, a, b, c)) {
                            this.pintaIntermediosDir(y, x, a, b, c);
                        }
                    }
                }
            }
        };
        this.pintaIntermediosDir = function(y, x, yo, xo, miColor) {
            var otroColor = (miColor === 0) ? 1 : 0;
            if ($rootScope.tablero[y + yo][x + xo].value === otroColor) {
                $rootScope.tablero[y + yo][x + xo].value = miColor;
                this.pintaIntermediosDir(y + yo, x + xo, yo, xo, miColor);
            }
        };
        this.getRandomArbitary = function(min, max) {
            return parseInt(Math.random() * (max - min) + min);
        };
    }
]);