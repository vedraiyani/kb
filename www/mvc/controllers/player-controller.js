angular.module('starter.player-controller', []).controller('PlayerCtrl', [
  '$scope',
  '$ionicModal',
  '$ionicPopup',
  '$ionicGesture',
  '$location',
  function ($scope, $ionicModal, $ionicPopup, $ionicGesture, $location) {
    $scope.data = { showDelete: false };
    $scope.servicerooturl = config.servicerooturl;
    $scope.loadQueue = function () {
      $scope.songs = media.queue;  //$scope.$digest();
    };
    $scope.$on('loadQueue', function () {
      $scope.loadQueue();
    });
    if (!cordovaEvents.isFirstTimeLoad) {
      $scope.loadQueue();
    }
    $ionicModal.fromTemplateUrl('mvc/views/playerModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openPlayerModal = function () {

      $scope.modal.show();

      if (!media.queue.length) {
        $ionicPopup.show({
          template: '<i class="ion-alert-circled" style="color:green;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Queue is empty..!',
          title: '<b>Warning</b>',
          scope: $scope,
          buttons: [{
              text: '<b>OK</b>',
              type: 'button-balanced',
              onTap: function (e) {
              }
            }]
        });
      } else {
      }
      element = angular.element(document.querySelector('#playerModalHead'));

      $ionicGesture.on('dragdown', function (e) {

        $scope.closePlayerModal();  
      }, element);
    };
    $scope.closePlayerModal = function () {
      $scope.modal.hide();
    };
    
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    
    $scope.$on('modal.hidden', function () {
    });
    
    $scope.$on('modal.removed', function () {
    });
    var element = angular.element(document.querySelector('#playerHead'));
    $ionicGesture.on('dragup', function (e) {
    
      $scope.openPlayerModal();  
    }, element);
    $scope.removeFromQueue = function (song) {
      
      cordovaEvents.query('delete FROM queue where id="' + song.id + '"', cordovaEvents.nullHandler);
      $scope.songs.splice($scope.songs.indexOf(song), 1);
      media.queue = $scope.songs;  
    };
    $scope.openSongPage = function (path) {
      $scope.closePlayerModal();
      $location.path(path);
    };
    $scope.play = function (song) {
      song.path = config.servicerooturl + 'uploads/' + song.file + '.mp3';
      media.playAudio(song);
    };
  }
]);