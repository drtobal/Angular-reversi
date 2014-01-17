reversi.service('juegoService', [
    '$rootScope',
    function($rootScope) {
        this.nuevoTablero = function() {
            $rootScope.tablero = new Array();
            for (x = 0; x < 8; x++) {
                $rootScope.tablero[x] = new Array();
                for (y = 0; y < 8; y++)
                    $rootScope.tablero[x][y] = {
                        index: x + "." + y,
                        value: null,
                        puedeMover: false
                    };
            }
            /*$rootScope.tablero[3][3].value = 1;
            $rootScope.tablero[4][4].value = 1;
            $rootScope.tablero[3][4].value = 0;
            $rootScope.tablero[4][3].value = 0;*/
            $rootScope.valoresDelTablero = new Array(
                    new Array(100, -10, 11, 6, 6, 11, -10, 100),
                    new Array(-10, -20, 1, 2, 2, 1, -20, -10),
                    new Array(10, 1, 5, 4, 4, 5, 1, 10),
                    new Array(6, 2, 4, 2, 2, 4, 2, 6),
                    new Array(6, 2, 4, 2, 2, 4, 2, 6),
                    new Array(10, 1, 5, 4, 4, 5, 1, 10),
                    new Array(-10, -20, 1, 2, 2, 1, -20, -10),
                    new Array(100, -10, 11, 6, 6, 11, -10, 100));
            $rootScope.turno = 0;
        };
    }
]);