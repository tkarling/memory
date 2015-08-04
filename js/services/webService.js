angular.module("myApp")
    .service("webService", function($http, $q) {
        // console.log("init webService");

        this.test = "Service Test";

        var getNamesFromArray = function(arrType, arr) {
            if (arr.length > 0) {
                var str = arrType + ": ";
                for (var i = 0; i < arr.length; i++) {
                    if (i > 0) {
                        str = str + ",";
                    }
                    str = str + " " + arr[i].name;
                }
                return str;
            }
            return "";
        }

        var numToThreeDigitString = function(num) {
            if (num < 10) {
                return "00" + num;
            } else if (num < 100) {
                return "0" + num;
            } // else
            return num + "";
        }

        this.getPokemonImg = function(pokemonId) {
            var idStr = numToThreeDigitString(pokemonId);
            // console.log("idStr", idStr);
            return "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/" + idStr + ".png";
        };

        // FOR NO API TESTING
        // var testPokemon = {
        //     name: "Bulbasaur",
        //     species: "seed pokemon",
        //     height: "2'4",
        //     weight: "15.2lbs",
        //     speed: 45,
        //     typesStr: getNamesFromArray("Types", [{
        //         "name": "grass",
        //         "resource_uri": "/api/v1/type/5/"
        //     }, {
        //         "name": "poison",
        //         "resource_uri": "/api/v1/type/8/"
        //     }]),
        //     abilitiesStr: getNamesFromArray("Abilities", [{
        //         "name": "overgrow",
        //         "resource_uri": "/api/v1/ability/1/"
        //     }, {
        //         "name": "chlorophyll",
        //         "resource_uri": "/api/v1/ability/2/"
        //     }])
        // };

        this.getPokemonInfo = function(pokemonId) {
            var self = this;
            return $http.get("http://pokeapi.co/api/v1/pokemon/" + pokemonId + "/").then(function(response) {
                // console.log(response.data);

                var pokemon = {
                    // img: "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/00" + pokemonId + ".png"
                    img: self.getPokemonImg(pokemonId),
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

            // FOR NO API TESTING
            // var deferred = $q.defer();
            // testPokemon.name = testPokemonList[pokemonId -1].name;
            // // testPokemon.img = "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/00" + pokemonId + ".png";
            // testPokemon.img = self.getPokemonImg(pokemonId);
            // deferred.resolve(testPokemon);
            // return deferred.promise;

        };
        // this.getPokemonInfo("3");

        // FOR NO API TESTING
        // var testPokemonList = [{
        //     name: "Bulbasaur",
        //     resource_uri: "api/v1/pokemon/1/"
        // }, {
        //     name: "Ivysaur",
        //     resource_uri: "api/v1/pokemon/2/"
        // }, {
        //     name: "Venusaur",
        //     resource_uri: "api/v1/pokemon/3/"
        // }, {
        //     name: "Charmander",
        //     resource_uri: "api/v1/pokemon/4/"
        // }, {
        //     name: "Charmeleon",
        //     resource_uri: "api/v1/pokemon/5/"
        // }, {
        //     name: "Charizard",
        //     resource_uri: "api/v1/pokemon/6/"
        // }, {
        //     name: "Squirtle",
        //     resource_uri: "api/v1/pokemon/7/"
        // }, {
        //     name: "Wartortle",
        //     resource_uri: "api/v1/pokemon/8/"
        // }, {
        //     name: "Blastoise",
        //     resource_uri: "api/v1/pokemon/9/"
        // }, {
        //     name: "Caterpie",
        //     resource_uri: "api/v1/pokemon/10/"
        // }, {
        //     name: "Ivysaur1",
        //     resource_uri: "api/v1/pokemon/12/"
        // }, {
        //     name: "Venusaur1",
        //     resource_uri: "api/v1/pokemon/13/"
        // }, {
        //     name: "Charmander1",
        //     resource_uri: "api/v1/pokemon/14/"
        // }, {
        //     name: "Charmeleon1",
        //     resource_uri: "api/v1/pokemon/15/"
        // }, {
        //     name: "Charizard1",
        //     resource_uri: "api/v1/pokemon/16/"
        // }, {
        //     name: "Squirtle1",
        //     resource_uri: "api/v1/pokemon/17/"
        // }, {
        //     name: "Wartortle1",
        //     resource_uri: "api/v1/pokemon/18/"
        // }, {
        //     name: "Blastoise1",
        //     resource_uri: "api/v1/pokemon/19/"
        // }, {
        //     name: "Caterpie1",
        //     resource_uri: "api/v1/pokemon/20/"
        // }, {
        //     name: "Ivysaur2",
        //     resource_uri: "api/v1/pokemon/22/"
        // }, {
        //     name: "Venusaur2",
        //     resource_uri: "api/v1/pokemon/23/"
        // }, {
        //     name: "Charmander2",
        //     resource_uri: "api/v1/pokemon/24/"
        // }, {
        //     name: "Charmeleon2",
        //     resource_uri: "api/v1/pokemon/25/"
        // }, {
        //     name: "Charizard2",
        //     resource_uri: "api/v1/pokemon/26/"
        // }, {
        //     name: "Squirtle2",
        //     resource_uri: "api/v1/pokemon/27/"
        // }, {
        //     name: "Wartortle2",
        //     resource_uri: "api/v1/pokemon/28/"
        // }, {
        //     name: "Blastoise2",
        //     resource_uri: "api/v1/pokemon/29/"
        // }, {
        //     name: "Caterpie2",
        //     resource_uri: "api/v1/pokemon/30/"
        // }];

        var getIdFromResourceUri = function(uri) {
            // from http://stackoverflow.com/questions/10003683/javascript-get-number-from-string
            var str = uri.slice(-6, -1);
            str = str.replace(/^\D+/g, '');
            // console.log("id", str);
            return str;
        };
        // getIdFromResourceUri("api/v1/pokemon/1/");

        var setPokemonIds = function(pokemonList) {
            for (var i = 0; i < pokemonList.length; i++) {
                pokemonList[i].id = getIdFromResourceUri(pokemonList[i].resource_uri);
            }
        };

        var removePkemonWithIdGreaterThan999 = function(arr) {
            for (var i = arr.length - 1; i >= 0; i--) {
                // console.log(arr[i], arr[i].id, Number(arr[i].id));
                if (Number(arr[i].id) > 999) {
                    arr.splice(i, 1);
                }
            }
            // return arr;
        };


        this.getPokemonList = function() {
            return $http.get("http://pokeapi.co/api/v1/pokedex/1/").then(function(response) {
                // console.log("response.data", response.data.pokemon);
                var pokemonList = response.data.pokemon;
                // console.log("pokemonList.length BEFORE", pokemonList.length);
                setPokemonIds(pokemonList);
                removePkemonWithIdGreaterThan999(pokemonList);
                // console.log("pokemonList.length AFTER", pokemonList.length);
                return pokemonList;
            });

            // FOR NO API TESTING
            // var deferred = $q.defer();
            // deferred.resolve(testPokemonList);
            // return deferred.promise;
        };

    });
