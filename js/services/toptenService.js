angular.module("myApp")
    .service("toptenService", function($q, $firebase, $firebaseArray, FB, TOPTEN_TYPES) {
        // console.log("init ToptenService");

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
        // lists[TOPTEN_TYPES.thisByTime] = initList(TOPTEN_TYPES.thisByTime);
        // lists[TOPTEN_TYPES.thisByTries] = initList(TOPTEN_TYPES.thisByTries);
        lists[TOPTEN_TYPES.everByTime] = initList(TOPTEN_TYPES.everByTime);
        lists[TOPTEN_TYPES.everByTries] = initList(TOPTEN_TYPES.everByTries);

        var listsLoaded = function() {
            return $q.all([lists[TOPTEN_TYPES.everByTime].$loaded(),
                lists[TOPTEN_TYPES.everByTries].$loaded()
            ]);
        };
        this.listsLoaded = listsLoaded;

        this.getTopTen = function(listType) {
            return lists[listType];
        };

        var lastItem = function(list) {
            return list[list.length - 1];
        }

        var newRecordOnList = function(listType, result) {
            if(lists[listType].length < TOPTEN_TYPES.maxItems) {
                return true;
            }
            if (listType === TOPTEN_TYPES.everByTime || listType === TOPTEN_TYPES.thisByTime) {
                // console.log(listType, lists[listType].length, result);
                return result.seconds < lastItem(lists[listType]).seconds;
            } // else 
            return result.tries < lastItem(lists[listType]).tries;
        }

        this.newRecord = function(result) {
            return newRecordOnList(TOPTEN_TYPES.everByTime, result) ||
                newRecordOnList(TOPTEN_TYPES.everByTries, result);
        };

        var addIfBetter = function(listType, result) {
            var better = newRecordOnList(listType, result);
            if (better) {
                return lists[listType].$add(result).then(function(response) {
                    // console.log("length", lists[listType].length, lists[listType]);
                    if (lists[listType].length > TOPTEN_TYPES.maxItems) {
                        // console.log("deleting", lists[listType].length);
                        return lists[listType].$remove(lists[listType][lists[listType].length - 1]);
                    }
                });
            }
        };

        var addIfShould = function(listType, result) {
            if (lists[listType].length < TOPTEN_TYPES.maxItems) {
                return lists[listType].$add(result);
            } else {
                // console.log("calling addIfBetter");
                return addIfBetter(listType, result)
            }
        };

        this.addToLists = function(result) {
            return $q.all([addIfShould(TOPTEN_TYPES.everByTime, result), 
            addIfShould(TOPTEN_TYPES.everByTries, result)]);
        };

        var currentWinner;
        this.setCurrentWinner = function(result) {
            currentWinner = result ? result : undefined;
            // console.log("toptenService: currentWinner", currentWinner);
        }

        this.getCurrentWinner = function(result) {
            return currentWinner;
        }

        // var testResult = {
        //     who: "A Name",
        //     tries: 8,
        //     seconds: 57,
        //     timeStamp: new Date().getTime()
        // }
        // var self = this;
        // listsLoaded().then(function(response) {
        //     console.log("lengths", lists[TOPTEN_TYPES.everByTries].length, lists[TOPTEN_TYPES.everByTime].length);
        //     if (self.newRecord(testResult)) {
        //         console.log("trying to add");
        //         self.addToLists(testResult);
        //     }
        // });

    });
