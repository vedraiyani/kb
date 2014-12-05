angular.module('starter.surpriseme-controller', []).controller('SurprisemeCtrl', [
  '$scope',
  '$rootScope',
  '$ionicLoading',
  '$ionicPopup',
  'SearchSongs',
  function ($scope, $rootScope, $ionicLoading, $ionicPopup, SearchSongs) {
    $scope.showLoading = function () {
      $ionicLoading.show({ template: '<i class="ion-loading-c" style="color:rgb(202,74,35); font-size:2em;"></i>' });
    };
    $scope.hideLoading = function () {
      $ionicLoading.hide();
    };
    $scope.servicerooturl = config.servicerooturl;
    $scope.loadQueuePlay = function () {
      $scope.showLoading();
      if (cordovaEvents.isOnline) {
        SearchSongs.get('surpriseme', '', 15, '', function (songs) {
          if (songs && songs.length) {
            cordovaEvents.query('delete FROM queue', cordovaEvents.nullHandler);
            media.queue = [];
            medialength = 0;
            for (var i = 0; i < songs.length; i++) {
              cordovaEvents.query('insert into queue(id,name,file,title,album,year,genre,date,cover,duration,priority)values(' + songs[i].id + ',"' + songs[i].name + '","' + songs[i].file + '","' + songs[i].title + '","' + songs[i].album + '",' + songs[i].year + ',"' + songs[i].genre + '","' + songs[i].date + '","' + songs[i].cover + '",' + songs[i].duration + ',' + medialength + ')', cordovaEvents.nullHandler);
              medialength++;
              media.queue.push(songs[i]);
            }

            media.queue[0].path = config.servicerooturl + 'uploads/' + media.queue[0].file + '.mp3';
            $rootScope.$broadcast('loadQueue');
            media.playAudio(media.queue[0]);

            $scope.hideLoading();
          } else {
            $scope.hideLoading();
            $ionicPopup.show({
              template: '<i class="ion-alert-circled" style="color:red;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please check your connection..!',
              title: '<b>Error</b>',
              scope: $scope,
              buttons: [{
                  text: '<b>OK</b>',
                  type: 'button-assertive',
                  onTap: function (e) {
                  }
                }]
            });
          }
        });
      } else {
        $scope.hideLoading();
        $ionicPopup.show({
          template: '<i class="ion-alert-circled" style="color:red;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please check your connection..!',
          title: '<b>Error</b>',
          scope: $scope,
          buttons: [{
              text: '<b>OK</b>',
              type: 'button-assertive',
              onTap: function (e) {
              }
            }]
        });
      }
    };
  }
]);