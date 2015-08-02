angular.module("myApp")
    .controller("MemoryController", function($scope, $interval, GAMESIZE, memoryService, webService) {
        // $scope.test = "Controller Test";
        // $scope.wTest = webService.test;
        // $scope.mTest = memoryService.test;

        $scope.table = memoryService.getTable();

        $scope.matchCount = 0;
        $scope.tryCount = 0;
        $scope.toggleSide = function(item) {
            // console.log("item clicked ", item);
            if ($scope.infoText && $scope.infoText.includes("You Won")) {
                showPokemonInfo(item.pokemonId);
                return;
            }
            $scope.infoText = "";
            var matchFoundId = memoryService.toggleSide(item);
            // console.log('matchFoundId', matchFoundId);
            if (matchFoundId) {
                $scope.infoText = "Match Found!";
                $scope.matchCount++;
                $scope.tryCount++;
                showPokemonInfo(matchFoundId);
                if ($scope.matchCount === GAMESIZE.noOfPokemon) { // KORJATTU
                    var minAndSecs = $scope.time.split(":");
                    // $scope.infoText = "You Won in " + minAndSecs[0] + " mins " + minAndSecs[1] + " seconds!!"; 
                    $scope.infoText = "You Won in " + minsSecsTimeString() + "!!";
                    $interval.cancel(myInterval);
                    memoryService.showPics();
                }
            } else if (matchFoundId === false) {
                $scope.tryCount++;
            }
            // else if matchFoundId === undefined do nothing
            // console.log('tryCount', $scope.tryCount);
        };

        var colonTimeString = function() {
            var displaySeconds = seconds % 60;
            var secondsStr = (displaySeconds < 10) ? "0" + displaySeconds : displaySeconds;
            return Math.floor(seconds / 60).toFixed() + ":" + secondsStr;
        };

        var minsSecsTimeString = function() {
            var mins = Math.floor(seconds / 60);
            var minStr = (mins > 0) ? Math.floor(seconds / 60).toFixed() + " mins and " : "";
            return minStr + seconds % 60 + " seconds";
        };

        var seconds = 0;
        $scope.time = "0.00"
        var myInterval = $interval(function() {
            ++seconds;
            $scope.time = colonTimeString(seconds);
        }, 1000, 60 * 60);

        var showPokemonInfo = function(pokemonId) {
            webService.getPokemonInfo(pokemonId).then(function(response) {
                $scope.pokemon = response;
                // console.log("Ctrl pokemon", $scope.pokemon);
            });
        }

    });
