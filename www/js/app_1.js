angular.module('starter',
        [
            'ionic',
            'starter.controllers',
            'starter.services',
            'starter.top15-controller',
            'starter.login-controller',
            'starter.register-controller',
            'starter.kirtan-controller',
            'starter.katha-controller',
            'starter.kirtanAlbum-controller',
            'starter.song-controller',
            'starter.search-controller',
            'starter.search-service',
            'ngCordova'
        ])

        .run(['$ionicPlatform', '$rootScope', '$location','$window',function($ionicPlatform, $rootScope, $location, $window) {

            'use strict';

            $rootScope.go = function(path, pageAnimationClass) {

                if (typeof (pageAnimationClass) === 'undefined') { 
                    $rootScope.pageAnimationClass = 'crossFade';
                }

                else { 
                    $rootScope.pageAnimationClass = pageAnimationClass;
                }

                if (path === 'back') { 
                    $window.history.back();
                }

                else { 
                    $location.path(path);
                }
            };
            $ionicPlatform.ready(function() {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });

        }])


        .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
            $stateProvider

                    .state('main', {
                        url: '/main',
                        templateUrl: 'templates/main.html',
                        controller: 'MainCtrl'
                    })

                    .state('top15', {
                        url: '/top15',
                        templateUrl: 'templates/top15.html',
                        controller: 'Top15Ctrl'
                    })

                    .state('surpriseme', {
                        url: '/surpriseme',
                        templateUrl: 'templates/surpriseme.html',
                        controller: 'SurprisemeCtrl'
                    })

                    .state('mystore', {
                        url: '/mystore',
                        templateUrl: 'templates/mystore.html',
                        controller: 'MystoreCtrl'
                    })

                    .state('loginMenu', {
                        url: '/loginMenu',
                        templateUrl: 'templates/loginMenu.html',
                        controller: 'LoginMenuCtrl'
                    })

                    .state('login', {
                        url: '/login',
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    })

                    .state('register', {
                        url: '/register',
                        templateUrl: 'templates/register.html',
                        controller: 'RegisterCtrl'
                    })

                    .state('kirtanAlbum', {
                        url: '/kirtanAlbum',
                        templateUrl: 'templates/kirtanAlbum.html',
                        controller: 'KirtanAlbumCtrl'
                    })

                    .state('kirtan', {
                        url: '/kirtan/:album',
                        templateUrl: 'templates/kirtan.html',
                        controller: 'KirtanCtrl'
                    })

                    .state('katha', {
                        url: '/katha',
                        templateUrl: 'templates/katha.html',
                        controller: 'KathaCtrl'
                    })

                    .state('radio', {
                        url: '/radio',
                        templateUrl: 'templates/radio.html',
                        controller: 'RadioCtrl'
                    })

                    .state('song', {
                        url: '/song/:id',
                        templateUrl: 'templates/song.html',
                        controller: 'SongCtrl'
                    })
$urlRouterProvider.otherwise('main');

        }]);