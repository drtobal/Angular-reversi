reversi.controller('juegoCtrl', [
    '$scope', '$rootScope', 'juegoService', 'movimientoService',
    function($scope, $rootScope, juegoService, movimientoService) {
        $scope.turno = 1;
        juegoService.nuevoTablero();
        //movimientoService.checkeaMovimientos();
        $scope.calculaMovimientosDelNegro = function() {
            //console.log('asdasdasd');
            movimientoService.checkeaMovimientos(parseInt($scope.turno));
            //movimientoService.movimientoValido(4, 2, 0);
        };
        $scope.movimientoCPU = function() {
            movimientoService.movimientoCPU(parseInt($scope.turno));
            $scope.turno = ($scope.turno === 1) ? 0 : 1;
            $scope.calculaPuntaje();
            $scope.calculaMovimientosDelNegro();
        };
        $scope.blancos = 0;
        $scope.negros = 0;
        /*$scope.cambiaEstado = function(obj) {
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
         };*/
        $rootScope.tablero[3][3].value = 1;
        $rootScope.tablero[4][4].value = 1;
        $rootScope.tablero[3][4].value = 0;
        $rootScope.tablero[4][3].value = 0;
        $scope.realizaMovimiento = function(y, x) {
            movimientoService.realizaMovimiento(y, x, parseInt($scope.turno));
            for (var y = 0; y < 8; y++) {
                for (var x = 0; x < 8; x++) {
                    $rootScope.tablero[y][x].puedeMover = false;
                }
            }
            $scope.turno = ($scope.turno === 1) ? 0 : 1;
            $scope.calculaPuntaje();
        };
        $scope.calculaPuntaje = function() {
            $scope.negros = 0;
            $scope.blancos = 0;
            for (var y = 0; y < 8; y++) {
                for (var x = 0; x < 8; x++) {
                    if ($rootScope.tablero[y][x].value === 0)
                        $scope.negros++;
                    if ($rootScope.tablero[y][x].value === 1)
                        $scope.blancos++;
                }
            }
        };
        $scope.calculaPuntaje();
        $scope.calculaMovimientosDelNegro();
        console.log($rootScope.tablero);
    }
]);