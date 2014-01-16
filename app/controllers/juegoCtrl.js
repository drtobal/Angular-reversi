reversi.controller('juegoCtrl', [
    '$scope', '$rootScope', 'juegoService', 'movimientoService',
    function($scope, $rootScope, juegoService, movimientoService) {
        juegoService.nuevoTablero();
        movimientoService.checkeaMovimientos();
        $scope.calculaMovimientosDelNegro = function(){
            console.log('asdasdasd');
            movimientoService.checkeaMovimientos();
        };
        $scope.cambiaEstado = function(obj){
            switch(obj.value){
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