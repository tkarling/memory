angular.module("myApp")
    .service("memoryService", function() {
        // console.log("init memoryService");
        this.test = "Memory Service Test"

        var backPic = "https://cdn0.iconfinder.com/data/icons/good-weather-1/96/weather_icons-01-128.png";
        var frontPic = "https://cdn3.iconfinder.com/data/icons/meteocons/512/moon-symbol-128.png";
        // e.g. http://assets22.pokemon.com/assets/cms2/img/pokedex/full/002.png
        var frontUrl = "http://assets22.pokemon.com/assets/cms2/img/pokedex/full/00"
        var table = [];
        var cols = 4;
        var rows = 4;

        var initTable = function() {
        	var pokemonId = 0;
            for (var i = 0; i < rows; i++) {
                table[i] = {
                    row: []
                };
                for (var j = 0; j < cols; j++) {
                    var str = i + " " + j;
                    pokemonId = pokemonId % 8 + 1;
                    // console.log('pokemonId', pokemonId);
                    table[i].row.push({
                        text: str,
                        pokemonId: pokemonId,
                        img: backPic,
                        // imgFront: "https://cdn3.iconfinder.com/data/icons/meteocons/512/moon-symbol-128.png"
                        imgFront: frontUrl + pokemonId + ".png"
                    });
                }
            }
        }

        this.getTable = function() {
            return table;
        };

        var matchFound = function() {
        	return openItems[0].pokemonId === openItems[1].pokemonId;
        }

        var openItems = [];
        var itemsOpen = 0;
        this.toggleSide = function(item) {
            if (itemsOpen >= 2) {
                for (var i = 0; i < openItems.length; i++) {
                	if(matchFound()) {
	                    openItems[i].img = frontPic;
                	} else {
	                    openItems[i].img = backPic;
                	}
                }
                openItems = [];
                itemsOpen = 0;
            } else if (item.img === backPic) {
                if (itemsOpen === 0) {
                    openItems[0] = item;
                } else if (itemsOpen === 1) {
                    openItems[1] = item;
                }
                if (itemsOpen < 2) {
                    itemsOpen++;
                    item.img = item.imgFront;
                }
                if(itemsOpen === 2) {
                	return matchFound();
                }
            }
            return false;
        }

        initTable();
        // console.log(table);

    });
