angular.module("myApp")
    .service("toptenService", function($firebase, $firebaseArray, FB, TOPTEN_TYPES) {
        console.log("init ToptenService");

        var fbRef = new Firebase(FB.url + '/leaders');
        var pokemons = $firebaseArray(fbRef);


        var createUrl = function(listType) {
            return FB.url + '/leaders/' + listType;
        };

        var initList = function(listType) {
            var url = createUrl(listType);
            var fbRef = new Firebase(url);
            var orderByField = (listType === TOPTEN_TYPES.everByTime || 
            	listType === TOPTEN_TYPES.thisByTime) ? "seconds" : "tries";
            return $firebaseArray(fbRef.orderByChild(orderByField));
        };

        var lists = {};
        lists[TOPTEN_TYPES.thisByTime] = initList(TOPTEN_TYPES.thisByTime);
        lists[TOPTEN_TYPES.thisByTries] = initList(TOPTEN_TYPES.thisByTries);
        lists[TOPTEN_TYPES.everByTime] = initList(TOPTEN_TYPES.everByTime);
        lists[TOPTEN_TYPES.everByTries] = initList(TOPTEN_TYPES.everByTries);

        this.getTopTen = function(listType) {
            return lists[listType];
        };

        var lastItem = function(list) {
            return list[list.length - 1];
        }

        var betterThanOnList = function(listType, result) {
            if (listType === TOPTEN_TYPES.everByTime || listType === TOPTEN_TYPES.thisByTime) {
                return result.seconds < lastItem(lists[listType]).seconds;
            } // else 
            return result.tries < lastItem(lists[listType]).tries;
        }

        var addIfBetter = function(listType, result) {
            var better = betterThanOnList(listType, result);
            if (better) {
                lists[listType].$add(result).then(function(response) {
                    console.log("length", lists[listType].length, lists[listType]);
                    if (lists[listType].length > TOPTEN_TYPES.maxItems) {
                        console.log("deleting", lists[listType].length);
                        lists[listType].$remove(lists[listType][lists[listType].length - 1]);
                    }
                });
            }
            return better;
        }

        this.addIfShould = function(listType, result) {
            if (lists[listType].length < TOPTEN_TYPES.maxItems) {
                lists[listType].$add(result);
            } else {
                console.log("calling addIfBetter");
                addIfBetter(listType, result)
            }
        }

        var testResult = {
            who: "moi",
            tries: 10,
            seconds: 65,
            timeStamp: new Date().getTime()
        }
        var testListType = TOPTEN_TYPES.everByTries;
        var self = this;
        lists[testListType].$loaded().then(function(response) {
            self.addIfShould(testListType, testResult);
            console.log(self.getTopTen(testListType));
        });

    });
