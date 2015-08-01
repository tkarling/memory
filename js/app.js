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
    .config(function($routeProvider) {
        $routeProvider
            .when("/memory", {
                templateUrl: "./js/memory/memoryTmpl.html",
                controller: "MemoryController"
            })
            .when("/choosePokemon", {
                templateUrl: "./js/pokemonList/pokemonListTmpl.html",
                controller: "PokemonListController"
            })
            .otherwise({
                redirectTo: "/memory"
            })

    });
