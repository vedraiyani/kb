angular.module('starter.playlistMenu-controller', []).controller('PlaylistMenuCtrl', [
  '$scope',
  '$ionicLoading',
  '$ionicPopup',
  function ($scope, $ionicLoading, $ionicPopup) {
    $scope.data = { showDelete: false };
    cordovaEvents.query('SELECT distinct playlistname FROM playlist;', function (rows) {
      $scope.playlists = [];
      if (rows.length) {
        for (var i = 0; i < rows.length; i++) {
          $scope.playlists.push(rows.item(i).playlistname);
        }
      }
      $scope.$digest();
    });
    $scope.deletePlaylist = function (playlistname) {
      cordovaEvents.query('delete FROM playlist where playlistname="' + playlistname + '"', cordovaEvents.nullHandler);
      $scope.playlists.splice($scope.playlists.indexOf(playlistname), 1);  
    };
  }
]);