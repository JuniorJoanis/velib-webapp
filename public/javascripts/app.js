//https://api.jcdecaux.com/vls/v1/stations?apiKey=c45323fc7cd54597443256e5c594e35020a49822&contract=Paris
console.log("load VELIB");
var velib_apikey = "c45323fc7cd54597443256e5c594e35020a49822";
var stations_markers = [];



(function () {
 angular.module("VelibWebApp", ['ngResource','google-maps']).config(function($httpProvider){
	    delete $httpProvider.defaults.headers.common['X-Requested-With'];
	});
}());