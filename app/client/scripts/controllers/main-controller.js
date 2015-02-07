(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("MainController", function($scope, $state, AuthService) {
        AuthService.checkAuth();

        $scope.logout = function(){
            AuthService.logout().then(function(){
                $state.go('login');
            });
        };
    });
})(window, window.angular);