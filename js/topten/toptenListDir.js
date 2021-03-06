angular.module("myApp")
.directive("toptenList", function() {
	return {
		restricted: "E",
		templateUrl: "./js/topten/toptenListTmpl.html",
		scope: {
			listType: "@"
		},
		controller: function($scope, toptenService, TOPTEN_TYPES) {
			// console.log("ToptenList dir controller init", $scope.listType);
			$scope.winningType = $scope.listType.indexOf("Time") !== -1 ? "Time" : "Tries";
			$scope.leaderList = toptenService.getTopTen($scope.listType);
			// console.log($scope.listType, $scope.leaderList);
		}
	}
});