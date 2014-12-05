angular.module('starter.radio-controller', []).controller('RadioCtrl', [
  '$scope',
  '$rootScope',
  '$stateParams',
  'Albums',
  function ($scope, $rootScope, $stateParams, Albums) {
    $scope.album = Albums.get($stateParams.albumId);
  }
]);