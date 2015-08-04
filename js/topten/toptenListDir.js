angular.module("myApp")
.directive("toptenList", function() {
	return {
		restricted: "E",
		templateUrl: "./js/topten/topTenListTmpl.html",
		scope: {
			listType: "@"
		},
		controller: function($scope, toptenService) {
			console.log("ToptenList dir controller init", $scope.listType);
			$scope.test = "test moi";
			$scope.leaderList = toptenService.getTopTen($scope.listType);
			console.log($scope.listType, $scope.leaderList);
		}
	}
});