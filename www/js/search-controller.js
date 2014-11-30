angular.module('starter.search-controller', [])


        .controller('SearchCtrl', function($scope, $ionicModal, $ionicPopup, SearchSongs) {

            $ionicModal.fromTemplateUrl('templates/searchModal.html', {
                scope: $scope,
                animation: 'slide-in-right'
            }).then(function(modal) {
                $scope.modal = modal;
            });
            $scope.openSearchModal = function() {
                if (cordovaEvents.isOnline) {
                    SearchSongs.all(function(songs) {
                        $scope.songs = songs;
                    });
                    $scope.modal.show();
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
            $scope.closeSearchModal = function() {
                $scope.modal.hide();
            }

            $scope.servicerooturl = cordovaEvents.servicerooturl;
            //$ionicNavBarDelegate.setTitle('');
            // $ionicNavBarDelegate.showBackButton(false);

            /* $scope.doRefresh = function() {
             // alert();
             /*
             SearchSongs.all(function(songs){
             console.log(songs);
             });
             */
            // console.log('Refreshing!');
            /* $timeout(function() {
             //simulate async response
             $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);
             
             //Stop the ion-refresher from spinning
             $scope.$broadcast('scroll.refreshComplete');
             
             }, 1000);*/

            // };

        });