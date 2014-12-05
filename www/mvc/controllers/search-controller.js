angular.module('starter.search-controller', []).controller('SearchCtrl', [
  '$scope',
  '$ionicModal',
  '$ionicPopup',
  'SearchSongs',
  '$location',
  function ($scope, $ionicModal, $ionicPopup, SearchSongs, $location) {
    $ionicModal.fromTemplateUrl('mvc/views/searchModal.html', {
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openSearchModal = function () {
      if (cordovaEvents.isOnline) {
        SearchSongs.all(function (songs) {
          $scope.songs = songs;
        });
        $scope.modal.show();
      } else {
        $ionicPopup.show({
          template: '<i class="ion-alert-circled" style="color:red;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please check your connection..!',
          title: '<b>Error</b>',
          scope: $scope,
          buttons: [{
              text: '<b>OK</b>',
              type: 'button-assertive',
              onTap: function (e) {
              }
            }]
        });
      }
    };
    $scope.closeSearchModal = function () {
      $scope.modal.hide();
    };
    $scope.servicerooturl = config.servicerooturl;
    $scope.gotoSong = function (id) {
      $scope.closeSearchModal();
      $location.path('song/' + id);
    }
;
  }
]);