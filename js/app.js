angular.module("myApp", ["ngRoute", "firebase"]);

angular.module("myApp")
    .constant("FB", {
        url: "https://blinding-heat-8535.firebaseio.com/pokemonApp"
    })
    .constant("GAMESIZE", {
        noOfPokemon: 8,
        columns: 4,
        rows: 4
    })
    .constant("TOPTEN_TYPES", {
        thisByTime: "thisByTime",
        thisByTries: "thisByTries",
        everByTime: "everByTime",
        everByTries: "everByTries",
        maxItems: 10
    })
    .config(function($routeProvider) {
        $routeProvider
            .when("/memory", {
                templateUrl: "./js/memory/memoryTmpl.html",
                controller: "MemoryController"
            })
            .when("/winners", {
                templateUrl: "./js/topten/toptenTmpl.html",
                controller: "ToptenController"
            })
            .when("/choosePokemon", {
                templateUrl: "./js/pokemonList/pokemonListTmpl.html",
                controller: "PokemonListController"
            })
            .otherwise({
                redirectTo: "/memory"
            })

    })
    .controller("MainController", function($scope, $location, memoryService) {
        $scope.startGame = function() {
            memoryService.startGame();
            $location.path("/memory");
        };

        $scope.gotoPage = function(page) {
            // console.log("page", page);
            $location.path(page);
        }
    });
