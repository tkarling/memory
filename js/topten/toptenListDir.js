angular.module("myApp")
.directive("toptenList", function() {
	return {
		restricted: "E",
		templateUrl: "./js/topten/topTenListTmpl.html",
		scope: {
			listType: "@"
		},
		controller: function($scope, toptenService, TOPTEN_TYPES) {
			// console.log("ToptenList dir controller init", $scope.listType);
			$scope.winningType = $scope.listType.indexOf("Time") !== -1 ? "time" : "tries";
			$scope.leaderList = toptenService.getTopTen($scope.listType);
			// console.log($scope.listType, $scope.leaderList);
		}
	}
});