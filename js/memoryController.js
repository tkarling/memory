angular.module("myApp")
.controller("memoryController", function($scope, $element, memoryService, webService) {
	$scope.test = "Controller Test";
	$scope.wTest = webService.test;
	$scope.mTest = memoryService.test;

	$scope.table = memoryService.getTable();

	$scope.toggleSide = function(item) {
		console.log(item);
		// item.img = "https://cdn3.iconfinder.com/data/icons/meteocons/512/moon-symbol-128.png";
		memoryService.toggleSide(item);
		// console.log(item);
	};

});