(function (window, angular) {
    'use strict';

    angular.module('labPract')
        .factory('User', function ($resource) {

            var User;

            User = $resource('/users');

            return User;
        });
}(window, window.angular));
