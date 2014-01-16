reversi.controller('juegoCtrl', [
    '$scope', '$rootScope', 'juegoService', 'movimientoService',
    function($scope, $rootScope, juegoService, movimientoService) {
        juegoService.nuevoTablero();
        console.log(movimientoService.movimientoValido(3, 2, 0));
        //movimientoService.movimientosValidos();
        console.log($rootScope.tablero);
    }
]);