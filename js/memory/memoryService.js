angular.module("myApp")
    .service("memoryService", function($interval, gamePokemonService, webService, GAMESIZE) {
        // console.log("init memoryService");
        this.test = "Memory Service Test"

        var backPic = "./js/images/ic_brightness_5_white_48dp.png";
        var frontPic = "./js/images/ic_brightness_3_white_48dp.png";
        // var backPic = "";
        // var frontPic = "";

        var table = [];
        var cols = GAMESIZE.columns;
        var rows = GAMESIZE.rows;

        var gamePokemon = [];

        this.getGamePokemon = function() {
            return gamePokemon;
        };

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
                        imgFront: webService.getPokemonImg(pokemonId)
                    });
                }
            }
        };

        var showPics = function() {
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
            if (openItems[0].pokemonId === openItems[1].pokemonId) {
                return openItems[0].pokemonId;
            }
            return false;
        }

        var openItems = [];
        var itemsOpen = 0;
        this.toggleSide = function(item) {
            if (itemsOpen >= 2) {
                for (var i = 0; i < openItems.length; i++) {
                    openItems[i].isFlipped = false;
                    if (matchFound()) {
                        openItems[i].img = frontPic;
                    } else {
                        openItems[i].img = backPic;
                    }
                }
                openItems = [];
                itemsOpen = 0;
            }
            if (item.img === backPic) {
                // console.log("itemsOpen", itemsOpen);
                if (itemsOpen === 0) {
                    openItems[0] = item;
                } else if (itemsOpen === 1) {
                    openItems[1] = item;
                }
                if (itemsOpen < 2) {
                    item.isFlipped = true;
                    itemsOpen++;
                    item.img = item.imgFront;
                }
                if (itemsOpen === 2) {
                    var match = matchFound();
                    ++stats.tryCount;
                    if (match) {
                        ++stats.matchCount;
                    }
                    return match;
                }
            }
            return undefined;
        }

        // var createIds = function() {
        //     var arr = [];
        //     var max = rows * cols / 2;
        //     for (var i = 0; i < max; i++) {
        //         arr.push(i + 1);
        //         arr.push(i + 1);
        //     }
        //     return arr;
        // };

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


        var setupTable = function() {
            return gamePokemonService.getIdArray().then(function(pokemonIds) {
                console.log('Game pokemonIds', pokemonIds);
                shuffleIds(pokemonIds);
                // console.log(pokemonIds);
                initTable(pokemonIds);
                // console.log(table);
                return true;
            });

        }

        var colonTimeString = function(seconds) {
            var displaySeconds = seconds % 60;
            var secondsStr = (displaySeconds < 10) ? "0" + displaySeconds : displaySeconds;
            return Math.floor(seconds / 60).toFixed() + ":" + secondsStr;
        };

        var stats = {
            seconds: 0,
            timeString: "0.0",
            tryCount: 0,
            matchCount: 0,
            gameOn: false
        };
        var myInterval;
        var startTimer = function() {
            stats.seconds = 0;
            stats.timeString = "0.0";
            stats.tryCount = 0;
            stats.matchCount = 0;
            stats.gameOn = true;

            myInterval = $interval(function() {
                ++stats.seconds;
                stats.timeString = colonTimeString(stats.seconds);
            }, 1000, 60 * 60);
            // return timer;
        };

        var stopTimer = function() {
            $interval.cancel(myInterval);
            stats.gameOn = false;
        };

        this.getStats = function() {
            return stats;
        };

        this.startGame = function() {
            // console.log("starting game");
            setupTable().then(function() {
                startTimer();
            })
        };

        this.stopGame = function() {
            stopTimer();
            showPics();
        };

    });
