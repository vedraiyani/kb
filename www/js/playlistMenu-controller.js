angular.module('starter.playlistMenu-controller', [])


        .controller('PlaylistMenuCtrl', function($scope, $ionicLoading,$ionicPopup) {
            $scope.data = {
                showDelete: false
            };
            cordovaEvents.query('SELECT distinct playlistname FROM playlist;', function(rows) {
                $scope.playlists = [];
                if (rows.length) {
                    for (var i = 0; i < rows.length; i++) {
                        $scope.playlists.push(rows.item(i).playlistname);
                    }
                }
                $scope.$digest();
            });
            $scope.deletePlaylist = function(playlistname) {
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
                                cordovaEvents.query('delete FROM playlist where playlistname="' + playlistname + '"', cordovaEvents.nullHandler);
                                $scope.playlists.splice($scope.playlists.indexOf(playlistname), 1);

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