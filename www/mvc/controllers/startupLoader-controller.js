angular.module('starter.startupLoader-controller', []).controller('StartupLoaderCtrl', [
  '$scope',
  '$rootScope',
  '$ionicPopup',
  function ($scope, $rootScope, $ionicPopup) {
    var internetCheck = $ionicPopup.show({ template: '<i class="ion-loading-c" style="color:red;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Waiting for connection..!' });
    cordovaEvents.init();
    cordovaEvents.serviceCheck(function (isOnline) {
      internetCheck.close();
      if (isOnline) {
        cordovaEvents.updateTableData();
      } else {
        $ionicPopup.show({
          template: '<i class="ion-alert-circled" style="color:green;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please check your connection..!',
          title: '<b>Warning</b>',
          scope: $scope,
          buttons: [{
              text: '<b>OK</b>',
              type: 'button-balanced',
              onTap: function (e) {
              }
            }]
        });
      }
      cordovaEvents.checkLogin(function (isLoggedIn) {
        var data = {
            'isLoggedIn': isLoggedIn,
            'isOnline': isOnline
          };
        $rootScope.$broadcast('mainscreenLoad', data);
      });
      cordovaEvents.query('SELECT * FROM queue order by priority', function (rows) {
        if (rows.length) {
          media.queue = [];
          for (var i = 0; i < rows.length; i++) {
            media.queue.push(rows.item(i));
          }
          $rootScope.$broadcast('loadQueue');
        }
      });
    });
  }
]);