angular.module("myApp")
    .controller("PokemonListController", function($scope, webService, gamePokemonService, GAMESIZE) {

        gamePokemonService.getMyPokemons().then(function(response) {
            $scope.myPokemons = response;
            // console.log("myPokemons", $scope.myPokemons);
        });

        var getIdFromResourceUri = function(uri) {
            // from http://stackoverflow.com/questions/10003683/javascript-get-number-from-string
            var str = uri.slice(-4, -1);
            str = str.replace( /^\D+/g, '');
            // console.log("id", str);
            return str;
        };
        getIdFromResourceUri("api/v1/pokemon/1/");

        var setPokemonIds = function() {
            for (var i = 0; i < $scope.pokemonList.length; i++) {
                $scope.pokemonList[i].id = getIdFromResourceUri($scope.pokemonList[i].resource_uri);
            }
        };

        webService.getPokemonList().then(function(response) {
            $scope.pokemonList = response;
            setPokemonIds();
            // console.log('PokemonListController List', $scope.pokemonList);
        });

        $scope.addPokemonAndGetInfo = function(pokemon, shoudlAdd) {
            var pokemonId = pokemon.id;
            // console.log("pokemon", pokemon);
            webService.getPokemonInfo(pokemonId).then(function(response) {
                $scope.errorText = undefined;
                $scope.currentPokemon = response;
                if (shoudlAdd) {
                    gamePokemonService.addPokemon({
                        id: pokemonId,
                        name: $scope.currentPokemon.name
                    }).then(function(response) {
                            // $scope.errorText = undefined;
                        },
                        function(error) {
                            $scope.errorText = error;
                        });
                }
                // console.log('PokemonListController One', $scope.currentPokemon);
            })
        };

        $scope.removePokemon = function(pokemontoRemove) {
            $scope.errorText = undefined;
            gamePokemonService.removePokemon(pokemontoRemove);
        };

        $scope.maxNoOfPokemonSelected = function() {
            if ($scope.myPokemons) {
                // console.log('maxNoOfPokemonSelected', $scope.myPokemons.length, GAMESIZE.noOfPokemon, $scope.pokemonList.length >= GAMESIZE.noOfPokemon);                
            }
            return $scope.myPokemons ? $scope.myPokemons.length >= GAMESIZE.noOfPokemon : false;
        }

    });
