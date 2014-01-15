reversi.controller('juegoCtrl', [
    '$scope', 'juegoService',
    function($scope, juegoService) {
        $scope.tablero = juegoService.nuevoTablero();
    }
]);