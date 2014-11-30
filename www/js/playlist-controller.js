angular.module('starter.playlist-controller', [])


        .controller('PlaylistCtrl', function($scope, $stateParams, $ionicLoading, $ionicPopup, $ionicActionSheet) {
            //$stateParams.playlistname
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

            cordovaEvents.query('SELECT * FROM playlist where playlistname="' + $stateParams.playlistname + '"', function(rows) {
                $scope.songs = new Array();
                for (var i = 0; i < rows.length; i++) {
                    $scope.songs.push(rows.item(i));
                }
                $scope.hideLoading();
            });

            $scope.removeFromPlaylist = function(song) {
                var messageDelete = $ionicPopup.show({
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
                                cordovaEvents.query('delete FROM playlist where playlistname="' + song.playlistname + '" and songid=' + song.songid + ';', cordovaEvents.nullHandler);
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

            $scope.showActionSheet = function() {
                $ionicActionSheet.show({
                    buttons: [
                        {text: '<b style="color:rgb(202,74,35) !important;">Remove Playlist</b>'},
                        {text: '<b style="color:rgb(202,74,35) !important;">Load Playlist to Queue</b>'}
                    ],
                    /*destructiveText: 'Delete',*/
                    cancelText: '<b>Close</b>',
                    cancel: function() {
                        // add cancel code..
                    },
                    buttonClicked: function(index) {
                        switch (index) {
                            case 0:
                                cordovaEvents.query('delete FROM playlist where playlistname="' + $stateParams.playlistname + '"', cordovaEvents.nullHandler);

                                $ionicPopup.show({
                                    template: '<i class="ion-checkmark-circled" style="color:yellow;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Removed successfully..!',
                                    title: '<b>Success</b>',
                                    scope: $scope,
                                    buttons: [
                                        {
                                            text: '<b>OK</b>',
                                            type: 'button-energized',
                                            onTap: function(e) {
                                                e.preventDefault();
                                                location.href = 'start.html';
                                            }
                                        }
                                    ]
                                });
                                break;
                            case 1:
                                cordovaEvents.query('delete FROM queue', cordovaEvents.nullHandler);
                                media.queue = [];
                                for (var i = 0; i < $scope.songs.length; i++) {
                                    var d = new Date();
                                    var recenttime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                                    cordovaEvents.query('insert into queue(id,name,file,title,album,year,genre,date,cover,duration,recenttime)values(' + $scope.songs[i].id + ',"' + $scope.songs[i].name + '","' + $scope.songs[i].file + '","' + $scope.songs[i].title + '","' + $scope.songs[i].album + '",' + $scope.songs[i].year + ',"' + $scope.songs[i].genre + '","' + $scope.songs[i].date + '","' + $scope.songs[i].cover + '",' + $scope.songs[i].duration + ',"' + recenttime + '")', cordovaEvents.nullHandler);
                                    $scope.songs[i].recenttime = recenttime;
                                    media.queue.push($scope.songs[i]);
                                }

                                $ionicPopup.show({
                                    template: '<i class="ion-checkmark-circled" style="color:yellow;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Added successfully..!',
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
                                break;
                        }
                        return true;
                    }
                });
            }

        });