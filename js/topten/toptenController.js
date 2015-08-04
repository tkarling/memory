angular.module("myApp")
    .controller("ToptenController", function($scope, TOPTEN_TYPES) {
        console.log("init ToptenController");
        $scope.everByTime = TOPTEN_TYPES.everByTime;
        $scope.everByTries = TOPTEN_TYPES.everByTries;

    });
