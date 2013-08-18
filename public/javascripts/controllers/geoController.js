function GeoCtrl(	$rootScope, $scope, $window) {
    $scope.supportsGeo = $window.navigator;
    $scope.position = null;
    $scope.findMe = function() {
        window.navigator.geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function() {
                $scope.position = position;
								user_position = function (){
									return position;
								}
								$rootScope.$broadcast('userPositionEvent', position.coords);
            });
        }, function(error) {
            console.log(error);
						$scope.findMe2();
        });
    };

    $scope.findMe2 = function() {
        $window.navigator.geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function() {
                $scope.position = position;
								user_position = function (){
									return  position;
								}
								$rootScope.$broadcast('userPositionEvent', position.coords);
            });
        }, function(error) {
             console.log(error);
        });
    };

		$scope.findMe();

}