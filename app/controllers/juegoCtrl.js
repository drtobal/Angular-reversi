reversi.controller('juegoCtrl', [
    '$scope', '$rootScope', 'juegoService', 'movimientoService',
    function($scope, $rootScope, juegoService, movimientoService) {
        juegoService.nuevoTablero();
        movimientoService.checkeaMovimientos();
        console.log($rootScope.tablero);
    }
]);