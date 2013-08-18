function VelibCtrl ($rootScope, $scope, $http, $resource) {
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
		
					
	$scope.velibResult = function (){
 		$scope.velib().query(function(result){
			stations_markers = [];
			result.forEach(function(e){
			  var _icon = e.available_bikes == "0" ? "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=0" : "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+e.available_bikes+"|FE6256|000000"
			
				stations_markers.push({ latitude: e.position.lat, longitude: e.position.lng,  icon: _icon});
			});
			$rootScope.$broadcast('velibMarkersEvent', stations_markers);
		});
	}
	
	$scope.$on('velibMarkersEvent', function(event, mass) {
		console.log("velibResult Event Call !!");
		$scope.velibResult();
	});
	
	$scope.velibResult();
	
	$scope.doSearchByCity = function (){	
		$scope.getLocation = function (){
			return $scope.searchText;
		};
		console.log( "getLocation ="+ $scope.getLocation());
	}
}