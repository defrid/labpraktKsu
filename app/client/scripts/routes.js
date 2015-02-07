(function(window, angular) {
    'use strict';
    return angular.module('labPract')
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('main', {
                    abstract: true,
                    templateUrl: 'views/layout.html',
                    controller: 'MainController'
                })
                .state('main.start', {
                    url: '/'
                })
                .state('main.files', {
                    url: '/files',
                    templateUrl: 'views/partials/files.html',
                    controller: 'fileUploadCtrl'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/partials/login.html',
                    controller: "LoginController"
                })
            ;
        });
})(window, window.angular);

