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


       var initTable = function(pokemonIds) {
            var idIndex = 0;
            for (var i = 0; i < rows; i++) {
                table[i] = {
                    row: []
                };
                for (var j = 0; j < cols; j++) {
                    var str = i + " " + j;
                    var pokemonId = pokemonIds[idIndex];
                    idIndex++;
                    // console.log('pokemonId', pokemonId);
                    table[i].row.push({
                        text: str,
                        pokemonId: pokemonId,
                        img: backPic,
                        imgFront: frontUrl + pokemonId + ".png"
                    });
                }
            }
        };

        this.showPics = function() {
        	for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                	table[i].row[j].img = table[i].row[j].imgFront;
                }
            }
        };

        this.getTable = function() {
            return table;
        };

        var matchFound = function() {
            if(openItems[0].pokemonId === openItems[1].pokemonId) {
            	return openItems[0].pokemonId;
            }
            return false;
        }

        var openItems = [];
        var itemsOpen = 0;
        this.toggleSide = function(item) {
            if (itemsOpen >= 2) {
                for (var i = 0; i < openItems.length; i++) {
                    if (matchFound()) {
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
                if (itemsOpen === 2) {
                    return matchFound();
                }
            }
            return undefined;
        }

        var createIds = function() {
            var arr = [];
            var max = rows * cols / 2;
            for (var i = 0; i < max; i++) {
                arr.push(i + 1);
                arr.push(i + 1);
            }
            return arr;
        };

        //from: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        var shuffleIds = function(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }


        var pokemonIds = createIds();
        shuffleIds(pokemonIds);
        // console.log(pokemonIds);
        initTable(pokemonIds);
        // console.log(table);

    });
