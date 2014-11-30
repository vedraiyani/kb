angular.module('starter.kirtanAlbum-controller', [])

        .controller('KirtanAlbumCtrl', function($scope, $ionicLoading, SearchSongs) {
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
                SearchSongs.get('field', 'album as name', 15, '["genre","=","kirtan"]', function(albums) {
                    $scope.albums = albums;
                    $scope.arrange();
                    $scope.hideLoading();
                });
            } else {
                SearchSongs.getDB('album', function(rows) {
                    $scope.albums = new Array();
                    for (var i = 0; i < rows.length; i++) {
                        $scope.albums.push(rows.item(i));
                    }
                    $scope.arrange();
                    $scope.hideLoading();
                });
            }
            $scope.arrange = function() {
                if ($scope.albums) {
                    //console.log($scope.albums);
                    var newArray = [];
                    var length = $scope.albums.length
                    for (var i = 0; i < length; i += 2) {
                        var temp = []
                        temp.push($scope.albums[i]);
                        if ((i + 1) < length) {
                            temp.push($scope.albums[i + 1]);
                        }
                        newArray.push(temp);
                    }
                    $scope.albums = newArray;
                    // console.log($scope.albums);
                }
            }

        });