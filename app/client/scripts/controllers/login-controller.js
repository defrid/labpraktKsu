(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("LoginController", function($scope, $state, $http, md5, AuthService) {

        $scope.credentials = {
            login: '',
            password: ''
        };
        $scope.errors = '';

        $scope.login = function(LoginForm) {
            var credentials = angular.copy($scope.credentials);
            credentials.password = md5.createHash($scope.credentials.password || '');

            var options = {
                method: 'POST',
                url: '/api/session',
                data: credentials
            };

            $http(options)
                .success(function(data, status, headers) {
                    AuthService.login(credentials).then(function() {
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

    $scope.buttonRegister = function() {
            $state.go('register');
        }
    });
})(window, window.angular);
