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
            for (a = -1; a <= 1; ++a) {
                for (b = -1; b <= 1; ++b) {
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
            return ( !(y + yo + yo < 0 || y + yo + yo > 7 || x + xo + xo < 0 || x + xo + xo > 7) && 
                    $rootScope.tablero[y + yo][x + xo].value !== null && 
                    $rootScope.tablero[y + yo][x + xo].value === otroColor &&
                    ($rootScope.tablero[y + yo + yo][x + xo + xo].value === miColor ||
                            this.puedeCapturarDir(y + yo, x + xo, yo, xo, miColor)));
        };
        this.checkeaMovimientos = function() {
            for (var y = 0; y < 8; y++) {
                for (var x = 0; x < 8; x++) {
                    $rootScope.tablero[y][x].puedeMover = this.movimientoValido(y, x, $rootScope.turno);
                }
            }
        };
    }
]);