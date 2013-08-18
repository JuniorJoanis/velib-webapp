function GmapCtrl($scope, $timeout, $log){
	google.maps.visualRefresh = true;
	$scope.dynamicMarkers = function(){
		return stations_markers;
	}
	
	angular.extend($scope, {

	    position: {
	      coords: user_position
	    },
		// 
		// /** the initial center of the map */
		// centerProperty: {
		// 	latitude: 48.8,
		// 	longitude: 2.5
		// },

		/** the initial zoom level of the map */
		zoomProperty: 16,

		/** list of markers to put in the map */
		markersProperty: [],
			
		dynamicMarkers: $scope.dynamicMarkers,
		 
		// These 2 properties will be set when clicking on the map
		clickedLatitudeProperty: null,	
		clickedLongitudeProperty: null,

		eventsProperty: {
		  click: function (mapModel, eventName, originalEventArgs) {	
		    // 'this' is the directive's scope
		    $log.log("user defined event on map directive with scope", this);
		    $log.log("user defined event: " + eventName, mapModel, originalEventArgs);
		  }
		}
	});
//	dynamicMarkers = stations_markers;
	// stations_markers.forEach(function(marker){
	//           marker.closeClick = function(){                        
	//               marker.showWindow = false;
	//               $scope.$apply();
	//           };
	//           marker.onClicked = function(){
	//               onMarkerClicked(marker);
	//           };
	//       });
	

	$scope.removeMarkers = function () {
        $log.info("Clearing markers. They should disappear from the map now");
        $scope.dynamicMarkers = function(){
					return [];
				}
    };


	$scope.$on('velibMarkersEvent', function(event, mass) {
		$scope.removeMarkers();
		console.log("velibMarker Event !!");
		$scope.dynamicMarkers = function(){
			return mass;
		}
	
	
	});
	
	$scope.$on('userPositionEvent', function(event, mass) {
		console.log("userPositionEvent Event !!"+mass.latitude + " | "+ mass.longitude);
		$scope.position.coords.latitude = mass.latitude;
		$scope.position.coords.longitude = mass.longitude;
	});
	
	
}