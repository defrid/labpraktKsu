(function(window, angular, _) {
    'use strict';

    var app = angular.module('labPract');

    app.service('SessionService', function($location, localStorageService) {
        var USER          = 'currentUser';

        this.update = function(attributes) {
            localStorageService.set(USER, attributes);
        };

        this.create = this.update;

        this.destroy = function(){
            localStorageService.remove(USER);
        };

        this.currentUser = function() {
            return localStorageService.get(USER);
        };

        this.isLoggedIn = function() {
            return !!this.currentUser();
        };
    });
}(window, window.angular, window._));
