angular.module('starter.login-controller', []).controller('LoginCtrl', [
  '$scope',
  '$ionicLoading',
  '$location',
  '$ionicPopup',
  function ($scope, $ionicLoading, $location, $ionicPopup) {
    $scope.showLoading = function () {
      $ionicLoading.show({ template: '<i class="ion-loading-c" style="color:rgb(202,74,35); font-size:2em;"></i>' });
    };
    $scope.hideLoading = function () {
      $ionicLoading.hide();
    };
    $scope.submitForm = function () {
      console.log('trying to login with kirtanbhakti server');
      $scope.showLoading();
      if (cordovaEvents.isOnline) {
        $.ajax({
          url: cordovaEvents.serviceurl(),
          data: {
            service: 'login',
            email: $('#email').val(),
            password: $('#password').val()
          },
          type: 'POST',
          success: function (data) {
            $scope.hideLoading();

            var data = JSON.parse(data);
            if (data.success) {
              var result = JSON.parse(data.extra);

              sql = 'insert into users(id,email,username,gender,dob,accessToken,logintype)values(' + result.id + ',"' + result.email + '","' + result.username + '","' + result.gender + '","' + result.dob + '","' + result.accessToken + '","kb")';
              cordovaEvents.initDB();

              cordovaEvents.db.transaction(function (transaction) {
                transaction.executeSql(sql, [], function (transaction, result) {
                  cordovaEvents.isLoggedIn = true;
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
                }, function (transaction, error) {
                  alert('Error: ' + error.message + ' code: ' + error.code);
                });
              }, function (transaction, error) {
                alert('Error: ' + error.message + ' code: ' + error.code);
              }, cordovaEvents.nullHandler);
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
              });  
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
    $scope.fblogin = function () {
      console.log('trying to login with facebook');
      $scope.showLoading();
      if (cordovaEvents.isOnline) {
        openFB.init({ appId: config.fbAppId });
        openFB.login(function (response) {
          if (response.status === 'connected') {
            openFB.api({
              path: '/me',
              success: function (data) {
                $scope.hideLoading();
                sql = 'insert into users(id,email,username,gender,dob,accessToken,logintype)values(' + data.id + ',"' + data.email + '","' + data.name + '","' + data.gender + '","","' + response.authResponse.token + '","fb")';
                cordovaEvents.initDB();
                
                cordovaEvents.db.transaction(function (transaction) {
                  transaction.executeSql(sql, [], function (transaction, result) {
                    
                    cordovaEvents.isLoggedIn = true;
                    $ionicPopup.show({
                      template: '<i class="ion-checkmark-circled" style="color:yellow;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login Successfully',
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
                    });  /////
                  }, function (transaction, error) {
                    alert('Error: ' + error.message + ' code: ' + error.code);
                  });
                }, function (transaction, error) {
                  alert('Error: ' + error.message + ' code: ' + error.code);
                }, cordovaEvents.nullHandler);  
              },
              error: openFB.errorHandler
            });
          } else {
            $scope.hideLoading();
            $ionicPopup.show({
              template: '<i class="ion-alert-circled" style="color:red;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Facebook login failed: ' + response.error,
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
        }, { scope: 'email,read_stream,publish_stream,publish_actions' });
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