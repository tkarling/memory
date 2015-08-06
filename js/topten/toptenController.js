angular.module("myApp")
    .controller("ToptenController", function($scope, toptenService, authService, TOPTEN_TYPES) {
        // console.log("init ToptenController");
        $scope.everByTime = TOPTEN_TYPES.everByTime;
        $scope.everByTries = TOPTEN_TYPES.everByTries;

        $scope.$watch(toptenService.getCurrentWinner(), function() {
            $scope.currentWinner = toptenService.getCurrentWinner();
            // console.log("$scope.currentWinner", $scope.currentWinner);
        });

        $scope.data = {};
        var userData = authService.getUserData();
        $scope.data.winnerName = userData ? userData.name : undefined;
        $scope.addWinner = function() {
        	// console.log("scope.addWinner", $scope.data.winnerName, $scope.currentWinner)
        	if($scope.data.winnerName) {
	        	$scope.currentWinner.who = $scope.data.winnerName;
	        	toptenService.addToLists($scope.currentWinner).then(function(response) {
                    $scope.data = {};
                    toptenService.setCurrentWinner(undefined);
                    $scope.currentWinner = toptenService.getCurrentWinner();
                })
        	}
        }


    });
