angular.module('starter.search-service', [])

        /**
         * A simple example service that returns some data.
         */
        .factory('SearchSongs', function() {


            // Might use a resource here that returns a JSON array
            var songs = null;

            return {
                all: function(callBackFunction) {
                    // Some fake testing data
                    $.ajax({
                        url: cordovaEvents.serviceurl(),
                        data: {
                            service: "searchSong",
                            searchby: "all"
                        },
                        type: "POST",
                        success: function(data) {
                            callBackFunction(JSON.parse(data));
                        }
                    }).fail(function() {
                        //alert('error');
                    });
                    //return songs;
                },
                get: function(searchby, searchkey, size, condition, callBackFunction) {
                    $.ajax({
                        url: cordovaEvents.serviceurl(),
                        data: {
                            service: "searchSong",
                            searchby: searchby,
                            searchkey: searchkey,
                            size: size,
                            condition: condition

                        },
                        type: "POST",
                        success: function(data) {
                            callBackFunction(JSON.parse(data));
                        }
                    }).fail(function() {
                        //alert('error');
                    });
                    return songs;
                },
                getDB: function(dbname, callBackFunction) {
                    cordovaEvents.query("SELECT * FROM " + dbname + ";", function(rows) {
                        callBackFunction(rows);
                    });
                }
            }
        });
