angular.module("myApp")
    .controller("MemoryController", function($scope, $interval, $location, GAMESIZE, memoryService, webService, toptenService) {
        // $scope.test = "Controller Test";
        // $scope.wTest = webService.test;
        // $scope.mTest = memoryService.test;

        $scope.table = memoryService.getTable();

        $scope.matchCount = 0;
        $scope.tryCount = 0;

        var handleWinning = function() {
            $scope.infoText = "You Won in " + minsSecsTimeString($scope.stats.seconds) + "!!";
            memoryService.stopGame();
            // console.log("$scope.stats", $scope.stats);
            var result = {
                tries: $scope.stats.tryCount,
                seconds: $scope.stats.seconds,
                timeString: $scope.stats.timeString
            };
            if (toptenService.newRecord(result)) {
                toptenService.setCurrentWinner(result);
                $location.path("/winners");
            }
        };

        $scope.toggleSide = function(item) {
            // console.log("item clicked ", item);
            if (!$scope.stats.gameOn) {
                if ($scope.stats.seconds > 0) {
                    showPokemonInfo(item.pokemonId);
                }
                return;
            }
            $scope.infoText = "";
            var matchFoundId = memoryService.toggleSide(item);
            // console.log('matchFoundId', matchFoundId);
            if (matchFoundId) {
                $scope.infoText = "Match Found!";
                showPokemonInfo(matchFoundId);
                if ($scope.stats.matchCount === GAMESIZE.noOfPokemon) { // KORJATTU
                    handleWinning();
                }
            }
        };

        var minsSecsTimeString = function(seconds) {
            var mins = Math.floor(seconds / 60);
            var minStr = (mins > 0) ? Math.floor(seconds / 60).toFixed() + " mins and " : "";
            return minStr + seconds % 60 + " seconds";
        };

        $scope.stats = memoryService.getStats();

        var showPokemonInfo = function(pokemonId) {
            webService.getPokemonInfo(pokemonId).then(function(response) {
                $scope.pokemon = response;
                // console.log("Ctrl pokemon", $scope.pokemon);
            });
        }

        // $scope.stats = {
        //     seconds: 37,
        //     tryCount: 14,
        //     timeString: "0:37"
        // };
        // toptenService.listsLoaded().then(function() {
        //     handleWinning();
        // });

    });
