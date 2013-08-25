console.log("load VELIB");
var stations_markers = {}; 
var user_position =  function () {
	return { latitude: 48.845, longitude: 2.3509 }; //Paris, France
}

(function () {
 angular.module("VelibWebApp", ['ngResource','leaflet-directive']).config(function($httpProvider){
	    delete $httpProvider.defaults.headers.common['X-Requested-With'];
	});
}());