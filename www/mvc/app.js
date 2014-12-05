angular.module('starter', [
  'ionic',
  'starter.main-controller',
  'starter.startupLoader-controller',
  'starter.top15-controller',
  'starter.surpriseme-controller',
  'starter.login-controller',
  'starter.changePassword-controller',
  'starter.downloaded-controller',
  'starter.bookmarked-controller',
  'starter.playlist-controller',
  'starter.playlistMenu-controller',
  'starter.register-controller',
  'starter.album-controller',
  'starter.albumSong-controller',
  'starter.song-controller',
  'starter.player-controller',
  'starter.search-controller',
  'starter.search-service',
  'ngCordova'
]).run([
  '$ionicPlatform',
  '$rootScope',
  '$location',
  '$window',
  function ($ionicPlatform, $rootScope, $location, $window) {
    'use strict';
    
	$rootScope.go = function (path, pageAnimationClass) {
      if (typeof pageAnimationClass === 'undefined') {
    
        $rootScope.pageAnimationClass = 'crossFade';
      } else {
    
        $rootScope.pageAnimationClass = pageAnimationClass;
      }
      if (path === 'back') {
    
        $window.history.back();
      } else {
    
        $location.path(path);
      }
    };
    $ionicPlatform.ready(function () {
      
	  if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
      url: '/main',
      templateUrl: 'mvc/views/main.html',
      controller: 'MainCtrl'
    }).state('top15', {
      url: '/top15',
      templateUrl: 'mvc/views/top15.html',
      controller: 'Top15Ctrl'
    }).state('loginMenu', {
      url: '/loginMenu',
      templateUrl: 'mvc/views/loginMenu.html'
    }).state('login', {
      url: '/login',
      templateUrl: 'mvc/views/login.html',
      controller: 'LoginCtrl'
    }).state('register', {
      url: '/register',
      templateUrl: 'mvc/views/register.html',
      controller: 'RegisterCtrl'
    }).state('mystore', {
      url: '/mystore',
      templateUrl: 'mvc/views/mystore.html'
    }).state('changePassword', {
      url: '/changePassword',
      templateUrl: 'mvc/views/changePassword.html',
      controller: 'ChangePasswordCtrl'
    }).state('downloaded', {
      url: '/downloaded',
      templateUrl: 'mvc/views/downloaded.html',
      controller: 'DownloadedCtrl'
    }).state('playlistMenu', {
      url: '/playlistMenu',
      templateUrl: 'mvc/views/playlistMenu.html',
      controller: 'PlaylistMenuCtrl'
    }).state('playlist', {
      url: '/playlist/:playlistname',
      templateUrl: 'mvc/views/playlist.html',
      controller: 'PlaylistCtrl'
    }).state('bookmarked', {
      url: '/bookmarked',
      templateUrl: 'mvc/views/bookmarked.html',
      controller: 'BookmarkedCtrl'
    }).state('album', {
      url: '/album/:genre',
      templateUrl: 'mvc/views/album.html',
      controller: 'AlbumCtrl'
    }).state('albumSong', {
      url: '/albumSong/:album',
      templateUrl: 'mvc/views/albumSong.html',
      controller: 'AlbumSongCtrl'
    }).state('radio', {
      url: '/radio',
      templateUrl: 'mvc/views/radio.html',
      controller: 'RadioCtrl'
    }).state('song', {
      url: '/song/:id',
      templateUrl: 'mvc/views/song.html',
      controller: 'SongCtrl'
    });
    
	$urlRouterProvider.otherwise('main');
  }
]);