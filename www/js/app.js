// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function ($ionicPlatform,$rootScope) {
        $ionicPlatform.ready(function () {
            if (typeof (FCMPlugin) !== "undefined") {
                FCMPlugin.onTokenRefresh(function (t) {
                    console.log("Use this token for sending device specific messages\nToken: " + t);
//                    alert("t " + t);
                    console.log("token:: " + t);
                }, function (e) {
                    console.log("Uh-Oh!\n" + e);
                });
                FCMPlugin.getToken(function (AndroidToken) {
                    console.log("Use this token for sending device specific messages\nToken: " + AndroidToken);
//                    alert(AndroidToken);
                    FCMPlugin.subscribeToTopic('topicExample',function (SubsScribeAndroidToken) {
                    console.log("Use this token for sending device specific messages\nToken: " + AndroidToken);
//                    alert(SubsScribeAndroidToken);
                }, function (SubsScribeErrorInToken) {
                    console.log("Uh-Oh!\n" + SubsScribeErrorInToken);
                });
                }, function (AndroidErrorInToken) {
                    console.log("Uh-Oh!\n" + AndroidErrorInToken);
                });

                FCMPlugin.onNotification(function (data) {
                    if (data.wasTapped) {
//                        alert(JSON.stringify(data));
                        $rootScope.live_update(data);
//                        $rootScope.MessadeData=data;
//                        $scopeJSON.stringify.datas=data;
                    } else {
//                        alert(JSON.stringify(data));
                        $rootScope.live_update(data);
//                        $rootScope.MessadeData=data;
//                        $scope.datas=data;
                    }
                }, function (msg) {
                    // No problemo, registered callback
                    // alert("msg:"+msg);
                }, function (err) {
                    console.log("Arf, no good mate... " + err);
                });

            } else {
                console.log("Not a Real Device");
            }
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html'
                    }
                }
            })

            .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                }
            })
            .state('app.messgingPage', {
                url: '/messgingPage',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/messgingPage.html',
                        controller: 'messgingPageCtrl'
                    }
                }
            })

            .state('introduce', {
                url: '/introduce',
//                views: {
//                    'menuContent': {
                        templateUrl: 'templates/introduce.html',
                        controller: 'introduceCtrl'
            , onEnter: function ($state) {
                    if (localStorage.getItem("InstaMessageUserName")) {
                        $state.go('app.messgingPage');
                    }
                }
//                    }
//                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/introduce');
    });
