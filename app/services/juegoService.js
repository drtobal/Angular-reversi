reversi.service('juegoService', [
    function() {
        this.nuevoTablero = function() {
            var tablero = new Array();
            for (x = 0; x < 8; x++) {
                tablero[x] = new Array();
                for (y = 0; y < 8; y++)
                    tablero[x][y] = {
                        index: x + "." + y,
                        value: null
                    };
            }
            tablero[3][3].value = 2;
            tablero[4][4].value = 2;
            tablero[3][4].value = 1;
            tablero[4][3].value = 1;
            return tablero;
        };
    }
]);