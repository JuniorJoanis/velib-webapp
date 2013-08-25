function VelibCtrl ($rootScope, $scope, $log, $http, $resource) {
	//$http.defaults.useXDomain = true;
	
	$scope.title = "Velib WebApp";
	$scope.getLocation = function (){
		return "Paris";
	};
	
	$scope.velib = function (){
		return $resource('/velibs.json',
			 { contract: $scope.getLocation()}, 
					{get: {
						method: 'GET', 
						isArray: true,
						headers: {
			          			"Accept": "application/json"
			      }
					}
					});	
	};
		
	var iterator = 0;
	var call_number = 1;
	$scope.velibResult = function (){
		if (call_number == 1){
			$scope.$emit('LOAD');
		}
		
 		$scope.velib().get(function(result){
			var _stations_markers = {};
			
			result.forEach(function(e){
				if (e.position.lat != undefined || e.position.lng != undefined ){
					var _pluralize = e.available_bikes > 0 ? "s" : "" ;
					var _message = e.available_bikes+" velo"+_pluralize+" disponible";
					_stations_markers[iterator] = { lat: parseFloat(e.position.lat), lng: parseFloat(e.position.lng),  message: _message , available_bikes: parseFloat(e.available_bikes)};
				}
				iterator++;
			});
			if (call_number == 1){
				$scope.$emit('UNLOAD');
			}
			call_number++;
			$rootScope.$broadcast('velibMarkersEvent', _stations_markers);
			
			setTimeout($scope.velibResult(), 5000);
		});
	}
	
	
	$scope.velibResult();
	
	$scope.doSearchByCity = function (){	
		$scope.getLocation = function (){
			return $scope.searchText;
		};
		console.log( "getLocation ="+ $scope.getLocation());
	}
}