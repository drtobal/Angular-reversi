reversi.controller('juegoCtrl', [
    '$scope', '$rootScope', 'juegoService', 'movimientoService',
    function($scope, $rootScope, juegoService, movimientoService) {
        $scope.turno = 1;
        juegoService.nuevoTablero();
        //movimientoService.checkeaMovimientos();
        $scope.calculaMovimientosDelNegro = function() {
            console.log('asdasdasd');
            movimientoService.checkeaMovimientos(parseInt($scope.turno));
            //movimientoService.movimientoValido(4, 2, 0);
        };
        $scope.movimientoCPU = function() {
            movimientoService.movimientoCPU(parseInt($scope.turno));
        };
        $scope.cambiaEstado = function(obj) {
            switch (obj.value) {
                case 0:
                    obj.value = 1;
                    break;
                case 1:
                    obj.value = 0;
                    break;
                default:
                    obj.value = 0;
                    break;
            }
        }
        console.log($rootScope.tablero);
    }
]);