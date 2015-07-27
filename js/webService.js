angular.module("myApp")
    .service("webService", function($http) {
        // console.log("init webService");

        this.test = "Service Test";

        var getNamesFromArray = function(arrType, arr) {
            if (arr.length > 0) {
                var str = arrType + ": ";
                for (var i = 0; i < arr.length; i++) {
                	if(i > 0) {
                		str = str + ",";
                	}
                    str = str + " " + arr[i].name;
                }
                return str;
            }
            return "";
        }

        this.getPokemonInfo = function(pokemonId) {
            return $http.get("http://pokeapi.co/api/v1/pokemon/" + pokemonId + "/").then(function(response) {
                // console.log(response.data);
                
                var pokemon = {
                	name: response.data.name,
                	species: response.data.species || "None",
 	                height: response.data.height,
 	                weight: response.data.weight,
 	                speed: response.data.speed,
 	                typesStr: getNamesFromArray("Types", response.data.types),
 	                abilitiesStr: getNamesFromArray("Abilities", response.data.abilities)
                };
                // console.log(pokemon);
                // console.log('name: ', pokemon.name);
                // console.log('species: ', pokemon.species);
                // console.log(pokemon.typesStr);
                // console.log('height, weight, speed: ', pokemon.height, pokemon.weight, pokemon.speed);
                // console.log(pokemon.abilitiesStr);
                return pokemon;
            });
        }
        this.getPokemonInfo("3");
    });
