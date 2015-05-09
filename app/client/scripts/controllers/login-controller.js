(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("LoginController", function($scope, $state, $http, AuthService) {

        $scope.credentials = {
            login: '',
            password: ''
        };
        $scope.errors = '';

        $scope.login = function(LoginForm) {

            var options = {
                method: 'POST',
                url: '/api/session',
                data: $scope.credentials
            };

            $http(options)
                .success(function(data, status, headers) {
                    AuthService.login($scope.credentials).then(function() {
                            $state.go('main.start');
                        },

                        function(res) {
                            if (!res || !res.errors) {
                                $scope.errors = "Something wrong";
                            } else {
                                $scope.errors = res.errors.join(', ');
                            }

                        }
                    );
                })
                .error(function(error, status, headers) {
                    alert(error.errors);
                });


        }
    });
})(window, window.angular);
