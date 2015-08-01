angular.module("myApp")
    .service("gamePokemonService", function($q, $firebase, $firebaseArray, FB, GAMESIZE) {
        var fbRef = new Firebase(FB.url + '/myPokemons');
        var pokemons = $firebaseArray(fbRef);

        var pokemonInList = function(pokemonId) {
            for (var i = 0; i < pokemons.length; i++) {
                if (pokemonId === pokemons[i].id) {
                    return true;
                }
            }
            return false;
        }

        var getNextFreeId = function(arr) {
            var i = 1;
            while ((i < 20) && (arr.indexOf(i + "") !== -1)) {
                i++;
            }
            return i + "";
        };

        this.getIdArray = function() {
            return pokemons.$loaded().then(function(response) {
                var result = [];
                for (var i = 0; i < GAMESIZE.noOfPokemon; i++) {
                    if (i < pokemons.length) {
                        result.push(pokemons[i].id);
                        result.push(pokemons[i].id);
                    } else {
                        var id = getNextFreeId(result);
                        result.push(id);
                        result.push(id);
                    }

                }
                return result;
            });
        };

        this.getMyPokemons = function() {
            var self = this;
            return pokemons.$loaded().then(function(response) {
                // console.log('response', response);
                // console.log("IdArray", self.getIdArray());

                return response;
            });
        };



        this.addPokemon = function(pokemon) {
            // console.log('GAMESIZE.noOfPokemon', GAMESIZE.noOfPokemon);
            if (pokemons.length >= GAMESIZE.noOfPokemon) {
                return $q.reject(GAMESIZE.noOfPokemon + " Pokemon is enough");
            }
            if (!pokemonInList(pokemon.id)) {
                return pokemons.$add(pokemon);
            }
            return $q.reject("Pokemon chosen already");

        };

        this.removePokemon = function(pokemon) {
            pokemons.$remove(pokemon);
        };

    });
