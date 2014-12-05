angular.module('starter.album-controller', []).controller('AlbumCtrl', [
  '$scope',
  '$stateParams',
  '$ionicLoading',
  'SearchSongs',
  function ($scope, $stateParams, $ionicLoading, SearchSongs) {
    //$stateParams.genre
    $scope.showLoading = function () {
      $ionicLoading.show({ template: '<i class="ion-loading-c" style="color:rgb(202,74,35); font-size:2em;"></i>' });
    };
    $scope.hideLoading = function () {
      $ionicLoading.hide();
    };
    $scope.showLoading();
    $scope.servicerooturl = config.servicerooturl;
    if (cordovaEvents.isOnline) {
      SearchSongs.get('field', 'album as name,genre', 15, '["genre","=","' + $stateParams.genre + '"]', function (albums) {
        $scope.albums = albums;
        $scope.arrange();
        $scope.hideLoading();
        cordovaEvents.query('delete from album where genre="' + $stateParams.genre + '"', cordovaEvents.nullHandler);
        for (var i = 0; i < albums.length; i++) {
          cordovaEvents.query('insert into album(name,genre) values("' + albums[i].name + '","' + albums[i].genre + '");', cordovaEvents.nullHandler);
        }
      });
    } else {
      cordovaEvents.query('SELECT * FROM album where genre="' + $stateParams.genre + '"', function (rows) {
        if (rows.length) {
          $scope.albums = new Array();
          for (var i = 0; i < rows.length; i++) {
            $scope.albums.push(rows.item(i));
          }
          $scope.arrange();
          $scope.hideLoading();
        } else {
          $scope.hideLoading();
          ///show error and redirect
          $ionicPopup.show({
            template: '<i class="ion-alert-circled" style="color:red;font-size:3em;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please check your connection..!',
            title: '<b>Error</b>',
            scope: $scope,
            buttons: [{
                text: '<b>OK</b>',
                type: 'button-assertive',
                onTap: function (e) {
                  e.preventDefault();
                  location.href = 'start.html';
                }
              }]
          });
        }
      });
    }
    $scope.arrange = function () {
      if ($scope.albums) {

        var newArray = [];
        var length = $scope.albums.length;
        for (var i = 0; i < length; i += 2) {
          var temp = [];
          temp.push($scope.albums[i]);
          if (i + 1 < length) {
            temp.push($scope.albums[i + 1]);
          }
          newArray.push(temp);
        }
        $scope.albums = newArray;
      }
    };
  }
]);