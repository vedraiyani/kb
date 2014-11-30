angular.module('starter.kirtan-controller', [])

        .controller('KirtanCtrl', function($scope, $stateParams, $ionicLoading, $ionicPopup, $state, $ionicActionSheet, SearchSongs) {
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
            if (cordovaEvents.isOnline) {
                SearchSongs.get('album', $stateParams.album, 15, '', function(songs) {
                    $scope.songs = songs;
                    $scope.hideLoading();
                });
            } else {
                $ionicLoading.hide();
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
                $state.transitionTo('kirtanAlbum');
            }

            $scope.showActionSheet = function() {
                $ionicActionSheet.show({
                    buttons: [
                        {text: '<b style="color:rgb(202,74,35) !important;">Load Album to Queue</b>'}
                    ],
                    /*destructiveText: 'Delete',*/
                    cancelText: '<b>Close</b>',
                    cancel: function() {
                        // add cancel code..
                    },
                    buttonClicked: function(index) {
                        switch (index) {
                            case 0:
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

        })