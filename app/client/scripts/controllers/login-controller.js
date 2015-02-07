(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("LoginController", function($scope, $state, AuthService) {
        $scope.credentials = {
            login: '',
            password: ''
        };
        $scope.errors = '';

        $scope.login = function(LoginForm){
            AuthService.login($scope.credentials).then(function(){
                    $state.go('main.start');
                },
                function(response){
                    if (!response || !response.errors){
                        $scope.errors = "Something wrong";
                    } else {
                        $scope.errors = response.errors.join(', ');
                    }

                }
            );
        }
    });
})(window, window.angular);