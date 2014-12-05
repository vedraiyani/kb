angular.module('starter.search-service', []).factory('SearchSongs', function () {
  
  var songs = null;
  return {
    all: function (callBackFunction) {
      
      $.ajax({
        url: cordovaEvents.serviceurl(),
        data: {
          service: 'searchSong',
          searchby: 'all'
        },
        type: 'POST',
        success: function (data) {
          callBackFunction(JSON.parse(data));
        }
      }).fail(function () {
	  callBackFunction(null);
      });
    },
    get: function (searchby, searchkey, size, condition, callBackFunction) {
      $.ajax({
        url: cordovaEvents.serviceurl(),
        data: {
          service: 'searchSong',
          searchby: searchby,
          searchkey: searchkey,
          size: size,
          condition: condition
        },
        type: 'POST',
        success: function (data) {
          callBackFunction(JSON.parse(data));
        }
      }).fail(function () {
        callBackFunction(null);
      });
      return songs;
    },
    getDB: function (dbname, callBackFunction) {
      cordovaEvents.query('SELECT * FROM ' + dbname + ';', function (rows) {
        callBackFunction(rows);
      });
    }
  };
});