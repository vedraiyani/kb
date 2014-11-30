angular.module('starter.bookmarked-controller', [])


        .controller('BookmarkedCtrl', function($scope, $ionicLoading, $ionicPopup, $ionicNavBarDelegate, SearchSongs) {

            $scope.data = {
                showDelete: false
            };
            $scope.showLoading = function() {
                $ionicLoading.show({
                    template: '<i class="ion-loading-c" style="color:rgb(202,74,35); font-size:2em;"></i>'
                });
            };
            $scope.hideLoading = function() {
                $ionicLoading.hide();
            };
            $scope.showLoading();

            $scope.servicerooturl = cordovaEvents.servicerooturl;

            SearchSongs.getDB('bookmark', function(rows) {
                $scope.songs = new Array();
                for (var i = 0; i < rows.length; i++) {
                    $scope.songs.push(rows.item(i));
                }
                $scope.hideLoading();
            });
            $scope.unmark = function(song) {
                var messageDelete=$ionicPopup.show({
                    template: '<i class="ion-alert-circled" style="color:red;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Are you sure want to delete ?',
                    title: '<b>Warning</b>',
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b>Yes</b>',
                            type: 'button-assertive',
                            onTap: function(e) {
                                e.preventDefault();
                                messageDelete.close();
                                cordovaEvents.query('delete FROM bookmark where id="' + song.id + '"', cordovaEvents.nullHandler);
                                $scope.songs.splice($scope.songs.indexOf(song), 1);

                            }
                        },
                        {
                            text: '<b>No</b>',
                            onTap: function(e) {

                            }
                        }

                    ]
                });
            }


        });