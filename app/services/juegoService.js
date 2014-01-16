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
            $rootScope.tablero[4][3].value = 0;
            $rootScope.tablero[5][5].value = 0;*/
            $rootScope.turno = 0;
        };
    }
]);