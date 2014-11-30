angular.module('starter.player-controller', [])



        .controller('PlayerCtrl', function($scope, $ionicModal, $ionicPopup, $ionicGesture, $location) {
            $scope.data = {
                showDelete: false
            };
            $scope.servicerooturl = cordovaEvents.servicerooturl;

            cordovaEvents.query('SELECT * FROM queue order by recenttime;', function(rows) {

                if (!rows.length) {
                    $scope.queue = false;
                } else {

                    $scope.songs = new Array();
                    for (var i = 0; i < rows.length; i++) {
                        $scope.songs.push(rows.item(i));
                    }
                    media.queue = $scope.songs;
                    //alert(JSON.stringify(media.queue));
                    $scope.queue = true;
                }
            });

            $ionicModal.fromTemplateUrl('templates/playerModal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
            });
            
            $scope.openPlayerModal = function() {
                if ($scope.queue) {
                    $scope.modal.show();
                    element = angular.element(document.querySelector('#playerModalHead'));
                    //console.log(element);
                    $ionicGesture.on('dragdown', function(e) {
                        //console.log(e.gesture.center.pageY);
                        $scope.closePlayerModal();
                        //$("#playerModal").css("top",e.gesture.center.pageY);
                    }, element);
                } else {
                    var queueCheck = $ionicPopup.show({
                        template: '<i class="ion-alert-circled" style="color:green;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Queue is empty..!',
                        title: '<b>Warning</b>',
                        scope: $scope,
                        buttons: [
                            {
                                text: '<b>OK</b>',
                                type: 'button-balanced',
                                onTap: function(e) {
                                    //e.preventDefault();
                                    //queueCheck.close();
                                    //$scope.closePlayerModal();
                                }
                            }
                        ]
                    });
                }


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
            $scope.removeFromQueue = function(song) {
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
                                cordovaEvents.query('delete FROM queue where id="' + song.id + '"', cordovaEvents.nullHandler);
                                $scope.songs.splice($scope.songs.indexOf(song), 1);
                                media.queue = $scope.songs;

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
            $scope.openSongPage = function(path) {
                alert(path);
                $location.path(path);
            }
            $scope.play = function(song) {
                song.path = cordovaEvents.servicerooturl + 'uploads/' + song.file + '.mp3';
                media.playAudio(song);
            }
        });

