angular.module('starter', ['ionic']).controller('SplashCtrl', [
  '$scope',
  '$ionicLoading',
  '$timeout',
  '$ionicPopup',
  function ($scope, $ionicLoading, $timeout, $ionicPopup) {
    $scope.show = function () {
      $ionicLoading.show({ template: '<i class="ion-loading-a" style="color:rgb(202,74,35); font-size:2em;"></i><br/>Loading...' });
    };
    $scope.hide = function () {
      $ionicLoading.hide();
    };
    $scope.show();
    cordovaEvents.init();
    $timeout(function () {
      cordovaEvents.initDB();
      cordovaEvents.initTables(); 
    }, 1000);
    $timeout(function () {
      $scope.hide();
      location.href = 'start.html';
    }, 5000);
  }
]);