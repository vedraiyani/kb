// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter',
        [
            'ionic',
            'starter.controllers',
            'starter.services',
            'starter.top15-controller',
            'starter.surpriseme-controller',
            'starter.login-controller',
            'starter.changePassword-controller',
            'starter.downloaded-controller',
            'starter.bookmarked-controller',
            'starter.playlist-controller',
            'starter.playlistMenu-controller',
            'starter.register-controller',
            'starter.kirtan-controller',
            'starter.katha-controller',
            'starter.kirtanAlbum-controller',
            'starter.song-controller',
            'starter.player-controller',
            'starter.search-controller',
            'starter.search-service',
            'ngCordova'
        ])

        .run(function($ionicPlatform, $rootScope, $location, $window) {

            'use strict';

            /**
             * Helper method for main page transitions. Useful for specifying a new page partial and an arbitrary transition.
             * @param  {String} path               The root-relative url for the new route
             * @param  {String} pageAnimationClass A classname defining the desired page transition
             */
            $rootScope.go = function(path, pageAnimationClass) {

                if (typeof (pageAnimationClass) === 'undefined') { // Use a default, your choice
                    $rootScope.pageAnimationClass = 'crossFade';
                }

                else { // Use the specified animation
                    $rootScope.pageAnimationClass = pageAnimationClass;
                }

                if (path === 'back') { // Allow a 'back' keyword to go to previous page
                    $window.history.back();
                }

                else { // Go to the specified path
                    $location.path(path);
                }
            };
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });

        })


        .config(function($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider

                    // Each tab has its own nav history stack:
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

                    .state('loginMenu', {
                        url: '/loginMenu',
                        templateUrl: 'templates/loginMenu.html'
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

                    .state('mystore', {
                        url: '/mystore',
                        templateUrl: 'templates/mystore.html'
                    })

                    .state('changePassword', {
                        url: '/changePassword',
                        templateUrl: 'templates/changePassword.html',
                        controller: 'ChangePasswordCtrl'
                    })

                    .state('downloaded', {
                        url: '/downloaded',
                        templateUrl: 'templates/downloaded.html',
                        controller: 'DownloadedCtrl'
                    })

                    .state('playlistMenu', {
                        url: '/playlistMenu',
                        templateUrl: 'templates/playlistMenu.html',
                        controller: 'PlaylistMenuCtrl'
                    })
                    
                    .state('playlist', {
                        url: '/playlist/:playlistname',
                        templateUrl: 'templates/playlist.html',
                        controller: 'PlaylistCtrl'
                    })

                    .state('bookmarked', {
                        url: '/bookmarked',
                        templateUrl: 'templates/bookmarked.html',
                        controller: 'BookmarkedCtrl'
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

            /*.state('search', {
             url: '/search',
             templateUrl: 'templates/search.html',
             controller: 'SearchCtrl'
             })*/

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('main');

        })
/*
 .directive('searchBar', [function() {
 return {
 scope: {
 ngModel: '='
 },
 require: ['^ionNavBar', '?ngModel'],
 restrict: 'E',
 replace: true,
 template: '<ion-nav-buttons side="right">' +
 '<div class="searchBar">' +
 '<div class="searchTxt" ng-show="ngModel.show">' +
 '<div class="bgdiv"></div>' +
 '<div class="bgtxt">' +
 '<input type="text" placeholder="Search..." ng-model="ngModel.txt">' +
 '</div>' +
 '</div>' +
 '</div>' +
 '<button class="button icon ion-ios7-search-strong" style="background:transparent;border:0px;" ng-click="ngModel.txt=\'\';ngModel.show=!ngModel.show"></button>' +
 '<button class="button icon ion-android-settings" style="background:transparent;border:0px;" ng-click="showSettings()"></button>' +
 '</ion-nav-buttons>',
 compile: function(element, attrs) {
 var icon = attrs.icon
 || (ionic.Platform.isAndroid() && 'ion-android-search')
 || (ionic.Platform.isIOS() && 'ion-ios7-search')
 || 'ion-search';
 angular.element(element[0].querySelector('.icon')).addClass(icon);
 
 return function($scope, $element, $attrs, ctrls) {
 var navBarCtrl = ctrls[0];
 $scope.navElement = $attrs.side === 'right' ? navBarCtrl.rightButtonsElement : navBarCtrl.leftButtonsElement;
 
 };
 },
 controller: ['$scope', '$ionicNavBarDelegate', '$ionicActionSheet', function($scope, $ionicNavBarDelegate, $ionicActionSheet) {
 var title, definedClass;
 $scope.$watch('ngModel.show', function(showing, oldVal, scope) {
 if (showing !== oldVal) {
 if (showing) {
 if (!definedClass) {
 var numicons = $scope.navElement.children().length;
 angular.element($scope.navElement[0].querySelector('.searchBar')).addClass('numicons' + numicons);
 }
 
 title = $ionicNavBarDelegate.getTitle();
 $ionicNavBarDelegate.setTitle('');
 } else {
 $ionicNavBarDelegate.setTitle(title);
 }
 } else if (!title) {
 title = $ionicNavBarDelegate.getTitle();
 }
 });
 $scope.showSettings = function() {
 
 // Show the action sheet
 $ionicActionSheet.show({
 buttons: [
 {text: '<b>Share</b> This'},
 {text: 'Move'}
 ],
 destructiveText: 'Delete',
 cancelText: 'Cancel',
 cancel: function() {
 // add cancel code..
 },
 buttonClicked: function(index) {
 return true;
 }
 });
 }
 }]
 };
 }])
 */