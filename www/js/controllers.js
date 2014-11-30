angular.module('starter.controllers', [])

        .controller('MainCtrl', function($scope, $ionicActionSheet, $ionicModal, $ionicGesture, $state, $ionicPopup) {
            $scope.button = {text: '<b style="color:rgb(202,74,35) !important;">Login</b> <i class="ion-android-social-user" style="float:right;"></i>'};
            cordovaEvents.init();
            cordovaEvents.checkLogin(function(loggedIn) {
                //$scope.$apply(function() {
                if (loggedIn) {
                    $scope.button = {text: '<b style="color:rgb(202,74,35) !important;">Logout</b> <i class="ion-log-out" style="float:right;"></i>'};
                } else {
                    $scope.button = {text: '<b style="color:rgb(202,74,35) !important;">Login</b> <i class="ion-android-social-user" style="float:right;"></i>'};
                }
                $scope.loggedIn = loggedIn;
                //});
                $scope.$digest();

            });
            /*$ionicPopup.alert({
             title: '<b>Error</b>',
             template: '<i class="ion-alert-circled" style="color:red;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please check your connection..!'
             });*/
            $scope.logout = function() {
                cordovaEvents.query('delete from users', cordovaEvents.nullHandler);
                //$scope.$apply(function() {
                $scope.loggedIn = false;
                $scope.button = {text: '<b style="color:rgb(202,74,35) !important;">Login</b> <i class="ion-log-out" style="float:right;"></i>'};
                //});
                //$scope.$digest();
                $ionicPopup.show({
                    template: '<i class="ion-checkmark-circled" style="color:yellow;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout successfully..!',
                    title: '<b>Success</b>',
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>OK</b>',
                            type: 'button-energized',
                            onTap: function(e) {
                            }
                        }
                    ]
                });
            }

            $scope.showSettings = function() {
                $ionicActionSheet.show({
                    buttons: [
                        $scope.button,
                        {text: '<b style="color:rgb(202,74,35) !important;">Aboutus</b>'}
                    ],
                    /*destructiveText: 'Delete',
                     cancelText: 'Cancel',
                     cancel: function() {
                     // add cancel code..
                     },*/
                    buttonClicked: function(index) {
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
            }


            /*   $ionicModal.fromTemplateUrl('templates/playerModal.html', {
             scope: $scope,
             animation: 'slide-in-up'
             }).then(function(modal) {
             $scope.modal = modal;
             });
             $scope.openPlayerModal = function() {
             $scope.modal.show();
             element = angular.element(document.querySelector('#playerModalHead'));
             //console.log(element);
             $ionicGesture.on('dragdown', function(e) {
             //console.log(e.gesture.center.pageY);
             $scope.closePlayerModal();
             //$("#playerModal").css("top",e.gesture.center.pageY);
             }, element);
             
             
             };
             $scope.closePlayerModal = function() {
             $scope.modal.hide();
             };
             //Cleanup the modal when we're done with it!
             $scope.$on('$destroy', function() {
             $scope.modal.remove();
             });
             // Execute action on hide modal
             $scope.$on('modal.hidden', function() {
             // Execute action
             });
             // Execute action on remove modal
             $scope.$on('modal.removed', function() {
             // Execute action
             });
             
             var element = angular.element(document.querySelector('#playerHead'));
             $ionicGesture.on('dragup', function(e) {
             //console.log(e.gesture.center.pageY);
             $scope.openPlayerModal();
             //$("#playerModal").css("top",e.gesture.center.pageY);
             }, element);
             /*
             element = angular.element(document.querySelector('#playerModalHead'));
             //console.log(element);
             $ionicGesture.on('dragdown', function(e) {
             //console.log(e.gesture.center.pageY);
             //$scope.openModal();
             //$("#playerModal").css("top",e.gesture.center.pageY);
             }, element);*/



        })
        /*
         .controller('Top15Ctrl', function($scope, $ionicPlatform, $cordovaMedia,$ionicNavBarDelegate) {
         
         
         $scope.goBack=function(){
         
         $ionicNavBarDelegate.back();
         }
         
         
         var thisMedia;
         
         $ionicPlatform.ready(function () {
         var src='http://192.168.173.1/songs/aarti.mp3';
         //playAudio(src);
         var mediaSource = $cordovaMedia.newMedia(src);
         var promise = mediaSource.promise;
         var mediaStatus = mediaSource.mediaStatus;
         var media = mediaSource.media;
         console.log(media);
         $cordovaMedia.play(media);
         
         });
         
         
         })
         */
        .controller('AlbumsCtrl', function($scope, Albums) {
            $scope.albums = Albums.all();
            //   Platform.ready(function() {
            //   // Hide the status bar
            //   StatusBar.hide();
            // });


            //   $scope.doRefresh = function() {

            //   console.log('Refreshing!');
            //   $timeout( function() {
            //     //simulate async 
            //     $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

            //     //Stop the ion-refresher from spinning
            //     $scope.$broadcast('scroll.refreshComplete');

            //   }, 1000);

            // };
        })

        .controller('AlbumDetailCtrl', function($scope, $stateParams, Albums) {
            response
            $scope.album = Albums.get($stateParams.albumId);
        })
        .controller('RadioCtrl', function($scope, $stateParams, Albums) {

            $scope.album = Albums.get($stateParams.albumId);
        })