angular.module("myApp")
.directive("titleAndMenu", function() {
	return {
		restricted: "E",
		templateUrl: "./js/titleAndMenu/titleAndMenuTmpl.html",
		link: function() {
			console.log("Hello");
		}
	}
});