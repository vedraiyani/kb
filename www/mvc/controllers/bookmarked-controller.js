angular.module('starter.bookmarked-controller', []).controller('BookmarkedCtrl', [
  '$scope',
  '$ionicLoading',
  '$ionicPopup',
  '$ionicNavBarDelegate',
  'SearchSongs',
  function ($scope, $ionicLoading, $ionicPopup, $ionicNavBarDelegate, SearchSongs) {
    $scope.data = { showDelete: false };
    $scope.showLoading = function () {
      $ionicLoading.show({ template: '<i class="ion-loading-c" style="color:rgb(202,74,35); font-size:2em;"></i>' });
    };
    $scope.hideLoading = function () {
      $ionicLoading.hide();
    };
    $scope.showLoading();
    $scope.servicerooturl = config.servicerooturl;
    SearchSongs.getDB('bookmark', function (rows) {
      $scope.songs = new Array();
      for (var i = 0; i < rows.length; i++) {
        $scope.songs.push(rows.item(i));
      }
      $scope.hideLoading();
    });
    $scope.unmark = function (song) {
      
      cordovaEvents.query('delete FROM bookmark where id="' + song.id + '"', cordovaEvents.nullHandler);
      $scope.songs.splice($scope.songs.indexOf(song), 1);  
    };
  }
]);