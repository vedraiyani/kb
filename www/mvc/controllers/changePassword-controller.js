angular.module('starter.changePassword-controller', []).controller('ChangePasswordCtrl', [
  '$scope',
  '$ionicLoading',
  '$state',
  '$ionicPopup',
  function ($scope, $ionicLoading, $state, $ionicPopup) {
    var tempDate = new Date(2014, 11, 24);
    $scope.dob = tempDate.getFullYear() + '-' + tempDate.getMonth() + '-' + tempDate.getDate();
    $scope.showLoading = function () {
      $ionicLoading.show({ template: '<i class="ion-loading-c" style="color:rgb(202,74,35); font-size:2em;"></i>' });
    };
    $scope.hideLoading = function () {
      $ionicLoading.hide();
    };
    if (cordovaEvents.logintype == 'fb') {
      var fbpassword = $ionicPopup.show({
          template: '<i class="ion-alert-circled" style="color:red;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Facebook password can\'t be changed..!',
          title: '<b>Error</b>',
          scope: $scope,
          buttons: [{
              text: '<b>OK</b>',
              type: 'button-assertive',
              onTap: function (e) {
                e.preventDefault();
                fbpassword.close();
                $state.transitionTo('mystore');
              }
            }]
        });
    }
    $scope.submitForm = function () {
      $scope.showLoading();
      if (cordovaEvents.isOnline) {
        cordovaEvents.query('SELECT * FROM users', function (rows) {
          if (rows.length) {
            $.ajax({
              url: cordovaEvents.serviceurl(),
              data: {
                service: 'changePassword',
                userid: rows.item(0).id,
                oldpassword: $('#oldpassword').val(),
                newpassword: $('#newpassword').val()
              },
              type: 'POST',
              success: function (data) {
                var data = JSON.parse(data);
                $scope.hideLoading();
                if (data.success) {
                  $ionicPopup.show({
                    template: '<i class="ion-checkmark-circled" style="color:yellow;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data.message,
                    title: '<b>Success</b>',
                    scope: $scope,
                    buttons: [{
                        text: '<b>OK</b>',
                        type: 'button-energized',
                        onTap: function (e) {
                          e.preventDefault();
                          location.href = 'start.html';
                        }
                      }]
                  });
                } else {
                  $ionicPopup.show({
                    template: '<i class="ion-alert-circled" style="color:red;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data.message,
                    title: '<b>Error</b>',
                    scope: $scope,
                    buttons: [{
                        text: '<b>OK</b>',
                        type: 'button-assertive',
                        onTap: function (e) {
                        }
                      }]
                  });  //alert();
                }
              }
            }).fail(function () {
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
            });
          }
        });
      } else {
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