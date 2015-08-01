angular.module("myApp")
.directive("pokemonInfo", function() {
	return {
		restricted: "E",
		templateUrl: "./js/pokemonInfo/pokemonInfoTmpl.html",
		scope: {
			pokemon: '='
		}		
	}
});