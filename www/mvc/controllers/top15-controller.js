angular.module('starter.top15-controller', []).controller('Top15Ctrl', [
  '$scope',
  '$ionicLoading',
  'SearchSongs',
  function ($scope, $ionicLoading, SearchSongs) {
    $scope.showLoading = function () {
      $ionicLoading.show({ template: '<i class="ion-loading-c" style="color:rgb(202,74,35); font-size:2em;"></i>' });
    };
    $scope.hideLoading = function () {
      $ionicLoading.hide();
    };
    $scope.showLoading();
    $scope.servicerooturl = config.servicerooturl;

    if (cordovaEvents.isOnline) {
      SearchSongs.get('top15', '', 15, '', function (songs) {
        $scope.songs = songs;
        $scope.hideLoading();
        cordovaEvents.query('delete from top15', cordovaEvents.nullHandler);
        for (var i = 0; i < songs.length; i++) {
          cordovaEvents.query('insert into top15(id,name,file,title,album,year,genre,date,cover,duration)values(' + songs[i].id + ',"' + songs[i].name + '","' + songs[i].file + '","' + songs[i].title + '","' + songs[i].album + '",' + songs[i].year + ',"' + songs[i].genre + '","' + songs[i].date + '","' + songs[i].cover + '",' + songs[i].duration + ')', cordovaEvents.nullHandler);
        }
      });
    } else {
      SearchSongs.getDB('top15', function (rows) {
        if (rows.length) {
          $scope.songs = new Array();
          for (var i = 0; i < rows.length; i++) {
            $scope.songs.push(rows.item(i));
          }
          $scope.hideLoading();
        } else {
          $scope.hideLoading();
          ///show error and redirect
          $ionicPopup.show({
            template: '<i class="ion-alert-circled" style="color:red;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please check your connection..!',
            title: '<b>Error</b>',
            scope: $scope,
            buttons: [{
                text: '<b>OK</b>',
                type: 'button-assertive',
                onTap: function (e) {
                  e.preventDefault();
                  location.href = 'start.html';
                }
              }]
          });
        }
      });
    }
  }
]);