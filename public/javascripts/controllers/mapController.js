function mapCtrl($scope, $timeout, $log, $window){

	$scope._width = function () {return window.innerWidth;};
	angular.extend($scope, {
	    center: {
	        lat: user_position["latitude"],
	        lng: user_position["longitude"],
	        zoom: 10
	    },
	    markers: {
	        // Moi: {
	        //     lat: user_position.latitude,
	        //     lng: user_position.longitude,
	        //     message: "Drag me to your position",
	        //     focus: true,
	        //     draggable: true
	        // }
	    }
	});
	
	$scope.$on('userPositionEvent', function(event, mass) {
		console.log("userPositionEvent Event !!"+mass.latitude + " | "+ mass.longitude);
		$scope.center.lat = mass.latitude;
		$scope.center.lng = mass.longitude;
		$scope.center.zoom = 150;
		$scope.markers["me"] = $scope.center;
	});
	
	var myIcon = L.icon({
	    iconUrl: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=0'
	});

	$scope.getIcon = function (nb_available){
		var icon_url = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=0';

		if (nb_available > 0) {
			icon_url = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+nb_available+"|FE6256|000000"
		}
		return L.icon({ iconUrl: icon_url});
	}
	$scope.$on('velibMarkersEvent', function(event, h) {
		console.log("velibMarker Event !!");
		$scope.markers = {"me" : $scope.center};
		
		for (var k in h) {
					if (h.hasOwnProperty(k)) {
						$scope.markers[k] = {
							lat: h[k].lat,
							lng: h[k].lng,					
							message: h[k].message,					
							icon: $scope.getIcon(h[k].available_bikes) 
						};
					}	
				}
	});
	
}


//========================================//
