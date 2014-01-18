reversi.controller('juegoCtrl', [
    '$scope', '$rootScope', 'juegoService', 'movimientoService',
    function($scope, $rootScope, juegoService, movimientoService) {
        $scope.turno = 1;
        $rootScope.tablero = juegoService.nuevoTablero();
        $scope.calculaMovimientosDelNegro = function() {
            movimientoService.checkeaMovimientos(parseInt($scope.turno), $rootScope.tablero);
        };
        $scope.movimientoCPU = function() {
            $scope.mov = movimientoService.movimientoCPU(parseInt($scope.turno));
            /*$scope.turno = ($scope.turno === 1) ? 0 : 1;
            $scope.calculaPuntaje();
            $scope.calculaMovimientosDelNegro();
            $scope.ultimoMovimiento = $rootScope.ultimoMovimiento;*/
        };
        $scope.blancos = 0;
        $scope.negros = 0;
        $scope.realizaMovimiento = function(y, x) {
            movimientoService.realizaMovimiento(y, x, parseInt($scope.turno));
            $rootScope.ultimoMovimiento = y + "," + x;
            for (var y = 0; y < 8; y++) {
                for (var x = 0; x < 8; x++) {
                    $rootScope.tablero[y][x].puedeMover = false;
                }
            }
            $scope.ultimoMovimiento = $rootScope.ultimoMovimiento;
            $scope.turno = ($scope.turno === 1) ? 0 : 1;
            $scope.calculaPuntaje();
        };
        $scope.cambia = function(c, y, x) {
            c.value = (c.value == 0) ? 1 : 0;
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
        $scope.pasa = function(tablero){
            $rootScope.tablero = tablero;
        };
        $scope.calculaPuntaje();
        $scope.calculaMovimientosDelNegro();
    }
]);