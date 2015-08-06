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
            .when("/login", {
                templateUrl: "./js/auth/auth.html",
                controller: "AuthController"
            })
            .otherwise({
                redirectTo: "/memory"
            })

    })
    .controller("MainController", function($scope, $location, memoryService, authService) {
        $scope.startGame = function() {
            memoryService.startGame();
            $location.path("/memory");
        };

        $scope.gotoPage = function(page) {
            // console.log("page", page);
            $location.path(page);
        }

        $scope.authData = authService.getAuthData();
        $scope.$on("auth", function(event, args) {
            $scope.authData = args.authData;
            console.log("args", args, $scope.authData);
        });

        // $scope.$watch(function () {
        //     authService.authData;
        //     console.log("$digest");
        // }, function() {
        //     $scope.authData = authService.authData;
        //     console.log("MainController $scope.authData", $scope.authData);
        // }, true);

        $scope.logout = function() {
            authService.logout();
        };
    });
