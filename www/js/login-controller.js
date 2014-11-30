angular.module('starter.login-controller', [])


        .controller('LoginCtrl', function($scope, $ionicLoading, $location, $ionicPopup) {
            $scope.showLoading = function() {
                $ionicLoading.show({
                    template: '<i class="ion-loading-c" style="color:rgb(202,74,35); font-size:2em;"></i>'
                });
            };
            $scope.hideLoading = function() {
                $ionicLoading.hide();
            };


            $scope.submitForm = function() {
                if (cordovaEvents.isOnline) {
                    $scope.showLoading();
                    $.ajax({
                        url: cordovaEvents.serviceurl(),
                        data: {
                            service: "login",
                            email: $('#email').val(),
                            password: $('#password').val()
                        },
                        type: "POST",
                        success: function(data) {
                            $scope.hideLoading();
                            //alert(data);
                            var data = JSON.parse(data);
                            if (data.success) {

                                var result = JSON.parse(data.extra);
                                //alert('insert into users(id,email,username,gender,dob,accessToken)values(' + result.id + ',"' + result.email + '","' + result.username + '","' + result.gender + '","' + result.dob + '","' + result.accessToken + '")');
                                sql = 'insert into users(id,email,username,gender,dob,accessToken)values(' + result.id + ',"' + result.email + '","' + result.username + '","' + result.gender + '","' + result.dob + '","' + result.accessToken + '")';
                                cordovaEvents.initDB();
                                //cordovaEvents.query("delete FROM users;", cordovaEvents.nullHandler);
                                cordovaEvents.db.transaction(function(transaction) {
                                    transaction.executeSql(sql, [],
                                            function(transaction, result) {
                                                cordovaEvents.isLoggedIn = true;
                                                $ionicPopup.show({
                                                    template: '<i class="ion-checkmark-circled" style="color:yellow;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data.message,
                                                    title: '<b>Success</b>',
                                                    scope: $scope,
                                                    buttons: [
                                                        {
                                                            text: '<b>OK</b>',
                                                            type: 'button-energized',
                                                            onTap: function(e) {
                                                                e.preventDefault();
                                                                location.href = "start.html";
                                                            }
                                                        }
                                                    ]
                                                });
                                                //$state.transitionTo('main');
                                                //$location.path('/main');
                                                /*cordovaEvents.query("SELECT * FROM users;", function(rows) {
                                                 for (var i = 0; i < rows.length; i++) {
                                                 var row = rows.item(i);
                                                 alert(JSON.stringify(rows.item(i)));
                                                 }
                                                 });*/
                                            },
                                            function(transaction, error) {
                                                alert('Error: ' + error.message + ' code: ' + error.code);
                                            });
                                }, function(transaction, error) {
                                    alert('Error: ' + error.message + ' code: ' + error.code);
                                }, cordovaEvents.nullHandler);

                            } else {
                                $ionicPopup.show({
                                    template: '<i class="ion-alert-circled" style="color:red;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data.message,
                                    title: '<b>Error</b>',
                                    scope: $scope,
                                    buttons: [
                                        {
                                            text: '<b>OK</b>',
                                            type: 'button-assertive',
                                            onTap: function(e) {

                                            }
                                        }
                                    ]
                                });
                                //alert();
                            }
                            /*
                             cordovaEvents.query("SELECT * FROM users;", function(rows) {
                             for (var i = 0; i < rows.length; i++) {
                             var row = rows.item(i);
                             alert(JSON.stringify(rows.item(i)));
                             }
                             });*/
                        }
                    }).fail(function() {
                        $scope.hideLoading();
                        $ionicPopup.show({
                            template: '<i class="ion-alert-circled" style="color:red;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please check your connection..!',
                            title: '<b>Error</b>',
                            scope: $scope,
                            buttons: [
                                {
                                    text: '<b>OK</b>',
                                    type: 'button-assertive',
                                    onTap: function(e) {
                                    }
                                }
                            ]
                        });
                    });
                } else {
                    $ionicPopup.show({
                        template: '<i class="ion-alert-circled" style="color:red;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please check your connection..!',
                        title: '<b>Error</b>',
                        scope: $scope,
                        buttons: [
                            {
                                text: '<b>OK</b>',
                                type: 'button-assertive',
                                onTap: function(e) {
                                }
                            }
                        ]
                    });
                }
            }
            // $scope.submitForm();

        });