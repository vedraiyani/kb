angular.module('starter.albumSong-controller', []).controller('AlbumSongCtrl', [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  '$ionicPopup',
  '$state',
  '$ionicActionSheet',
  'SearchSongs',
  function ($scope, $stateParams, $ionicLoading, $ionicPopup, $state, $ionicActionSheet, SearchSongs) {
    //$stateParams.album
    $scope.showLoading = function () {
      $ionicLoading.show({ template: '<i class="ion-loading-c" style="color:rgb(202,74,35); font-size:2em;"></i>' });
    };
    $scope.hideLoading = function () {
      $ionicLoading.hide();
    };
    $scope.showLoading();
    $scope.servicerooturl = config.servicerooturl;
    if (cordovaEvents.isOnline) {
      SearchSongs.get('album', $stateParams.album, '', '', function (songs) {
        $scope.songs = songs;
        $scope.hideLoading();
        var genre = songs[0].genre;
        cordovaEvents.query('delete from ' + genre + ' where album="' + $stateParams.album + '"', cordovaEvents.nullHandler);
        for (var i = 0; i < songs.length; i++) {
          cordovaEvents.query('insert into ' + genre + '(id,name,file,title,album,year,genre,date,cover,duration)values(' + songs[i].id + ',"' + songs[i].name + '","' + songs[i].file + '","' + songs[i].title + '","' + songs[i].album + '",' + songs[i].year + ',"' + songs[i].genre + '","' + songs[i].date + '","' + songs[i].cover + '",' + songs[i].duration + ')', cordovaEvents.nullHandler);
        }
      });
    } else {
      cordovaEvents.query('SELECT genre FROM album where name="' + $stateParams.album + '"', function (rows) {
        if (rows.length) {
          cordovaEvents.query('SELECT * FROM ' + rows.item(0).genre + ' where album="' + $stateParams.album + '"', function (rows) {
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
    $scope.showActionSheet = function () {
      $ionicActionSheet.show({
        buttons: [{ text: '<b style="color:rgb(202,74,35) !important;">Load Album to Queue</b>' }],
        cancelText: '<b>Close</b>',
        cancel: function () {
        },
        buttonClicked: function (index) {
          switch (index) {
          case 0:
            cordovaEvents.query('delete FROM queue', cordovaEvents.nullHandler);
            media.queue = [];
            var medialength = 0;
            for (var i = 0; i < $scope.songs.length; i++) {
              cordovaEvents.query('insert into queue(id,name,file,title,album,year,genre,date,cover,duration,priority)values(' + $scope.songs[i].id + ',"' + $scope.songs[i].name + '","' + $scope.songs[i].file + '","' + $scope.songs[i].title + '","' + $scope.songs[i].album + '",' + $scope.songs[i].year + ',"' + $scope.songs[i].genre + '","' + $scope.songs[i].date + '","' + $scope.songs[i].cover + '",' + $scope.songs[i].duration + ',' + medialength + ')', cordovaEvents.nullHandler);
              medialength++;
              media.queue.push($scope.songs[i]);
            }
            media.queue[0].path = config.servicerooturl + 'uploads/' + media.queue[0].file + '.mp3';
            media.playAudio(media.queue[0]);
            $ionicPopup.show({
              template: '<i class="ion-checkmark-circled" style="color:yellow;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Added successfully..!',
              title: '<b>Success</b>',
              scope: $scope,
              buttons: [{
                  text: '<b>OK</b>',
                  type: 'button-energized',
                  onTap: function (e) {
                  }
                }]
            });
            break;
          }
          return true;
        }
      });
    };
  }
]);