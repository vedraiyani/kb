angular.module('starter.main-controller', []).controller('MainCtrl', [
  '$scope',
  '$rootScope',
  '$ionicActionSheet',
  '$state',
  '$ionicPopup',
  function ($scope, $rootScope, $ionicActionSheet, $state, $ionicPopup) {
    $scope.loginCheck = function (loggedIn) {
      if (loggedIn) {
        $scope.button = { text: '<b style="color:rgb(202,74,35) !important;">Logout</b> <i class="ion-log-out" style="float:right;"></i>' };
      } else {
        $scope.button = { text: '<b style="color:rgb(202,74,35) !important;">Login</b> <i class="ion-android-social-user" style="float:right;"></i>' };
      }
      $scope.profilePicture = cordovaEvents.profilePicture;
      $scope.loggedIn = loggedIn;  
    };
    $scope.button = { text: '<b style="color:rgb(202,74,35) !important;">Login</b> <i class="ion-android-social-user" style="float:right;"></i>' };
    $scope.mainscreenLoad = function () {
      var data = {
          'isLoggedIn': cordovaEvents.isLoggedIn,
          'isOnline': cordovaEvents.Online
        };
      
      $scope.loginCheck(cordovaEvents.isLoggedIn);
    };
    if (!cordovaEvents.isFirstTimeLoad) {
      $scope.mainscreenLoad();
    }
    $scope.$on('mainscreenLoad', function (e, data) {
      $scope.loginCheck(data.isLoggedIn);
      
      cordovaEvents.isFirstTimeLoad = false;
    });
    /////////////////logout process
    $scope.logout = function () {
      cordovaEvents.query('delete from users', cordovaEvents.nullHandler);
      
      $scope.loggedIn = false;
      $scope.profilePicture = '';
      $scope.button = { text: '<b style="color:rgb(202,74,35) !important;">Login</b> <i class="ion-log-out" style="float:right;"></i>' };
      
	  cordovaEvents.isLoggedIn = false;
      cordovaEvents.profilePicture = '';
      if (cordovaEvents.logintype == 'fb') {
        cordovaEvents.logintype = '';
        openFB.init({ appId: config.fbAppId });
        openFB.logout();
      } else {
        cordovaEvents.logintype = '';
      }
      $ionicPopup.show({
        template: '<i class="ion-checkmark-circled" style="color:yellow;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout successfully..!',
        title: '<b>Success</b>',
        scope: $scope,
        buttons: [{
            text: '<b>OK</b>',
            type: 'button-energized',
            onTap: function (e) {
            }
          }]
      });
    };
    $scope.showSettings = function () {
      $ionicActionSheet.show({
        buttons: [
          $scope.button,
          { text: '<b style="color:rgb(202,74,35) !important;">Aboutus</b>' }
        ],
        buttonClicked: function (index) {
          switch (index) {
          case 0:
            if (cordovaEvents.isLoggedIn) {
              $scope.logout();
            } else {
              $state.transitionTo('login');
            }
            break;
          case 1:
            $scope.aboutus();
            break;
          }
          return true;
        }
      });
    };
  }
]);