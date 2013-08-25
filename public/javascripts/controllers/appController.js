function AppCtrl($rootScope, $scope, $window) {
	$rootScope.$on('UNLOAD', function(){
		$scope.loading = false;
	});
	
	$rootScope.$on('LOAD', function(){
		$scope.loading = true;
	});
	
	 
	
	
	
}