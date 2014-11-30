angular.module('starter.top15-controller', [])

        .controller('Top15Ctrl', function($scope, $ionicLoading, SearchSongs) {
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
            //var thisMedia;

            /*$ionicPlatform.ready(function() {
             var src = 'http://192.168.173.1/songs/aarti.mp3';
             //playAudio(src);
             var mediaSource = $cordovaMedia.newMedia(src);
             var promise = mediaSource.promise;
             var mediaStatus = mediaSource.mediaStatus;
             var media = mediaSource.media;
             console.log(media);
             $cordovaMedia.play(media);
             
             });*/
            /*cordovaEvents.query("SELECT * FROM top15;", function(rows) {
             for (var i = 0; i < rows.length; i++) {
             var row = rows.item(i);
             alert(JSON.stringify(rows.item(i)));
             }
             });*/
            if (cordovaEvents.isOnline) {
                SearchSongs.get('top15', '', 15 ,'', function(songs) {
                    $scope.songs = songs;
                    $scope.hideLoading();
                });
            } else {
                SearchSongs.getDB('top15', function(rows) {
                    $scope.songs = new Array();
                    for (var i = 0; i < rows.length; i++) {
                        $scope.songs.push(rows.item(i));
                    }
                    $scope.hideLoading();
                });
            }


        });