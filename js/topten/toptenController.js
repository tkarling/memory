angular.module("myApp")
    .controller("ToptenController", function($scope, toptenService, TOPTEN_TYPES) {
        // console.log("init ToptenController");
        $scope.everByTime = TOPTEN_TYPES.everByTime;
        $scope.everByTries = TOPTEN_TYPES.everByTries;

        $scope.$watch(toptenService.getCurrentWinner(), function() {
            $scope.currentWinner = toptenService.getCurrentWinner();
            // console.log("$scope.currentWinner", $scope.currentWinner);
        });

        $scope.data = {};
        $scope.addWinner = function() {
        	// console.log("scope.addWinner", $scope.data.winnerName, $scope.currentWinner)
        	if($scope.data.winnerName) {
	        	$scope.currentWinner.who = $scope.data.winnerName;
	        	toptenService.addToLists($scope.currentWinner);
        	}
        }


    });
