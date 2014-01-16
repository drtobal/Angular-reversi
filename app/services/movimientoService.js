reversi.service('movimientoService', [
    '$rootScope',
    function($rootScope) {
        //-> x
        this.movimientoValido = function(y, x, c) {
            if (y < 1 || y > 8 || x < 1 || x > 8)
                return false;
            if ($rootScope.tablero[y-1][x-1].value !== null)
                return false;
            if (this.puedeCapturar(y, x, c) !== true)
                return false;
            return true;
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
            console.log((y + yo) + "," + (x + xo));
            var otroColor = (miColor === 0) ? 1 : 0;
            if (y + yo + yo < 1 || y + yo + yo > 8 || x + xo + xo < 1 || x + xo + xo > 8)
                return false;
            console.log('a');
            if ($rootScope.tablero[y + yo - 1][x + xo - 1].value === null)
                return false;
            console.log('b');
            if ($rootScope.tablero[y + yo - 1][x + xo - 1].value === otroColor) {
                console.log('d');
                if ($rootScope.tablero[y + yo + yo - 1][x + xo + xo - 1].value === miColor) {
                    console.log('e');
                    return true;
                }
                if (this.puedeCapturarDir(y + yo, x + xo, yo, xo, miColor)) {
                    console.log('f');
                    return true;
                }
            }
            console.log('c');
            return false;
        };
    }
]);