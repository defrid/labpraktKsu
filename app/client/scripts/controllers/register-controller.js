(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("RegisterController", function($scope, $state, $http, AuthService) {

        $scope.user_type_list = [{
            type_id: 1,
            m_name: "Студент"
        }, {
            user_type: 2,
            m_name: "Преподаватель"
        }];

        $scope.user = {};
        $scope.group_list = [];

        $scope.GetGroupList = function() {

            var options = {
                method: 'GET',
                url: '/api/registration/GetGroup'
            };

            $http(options)
                .success(function(data, status, headers) {
                    $scope.group_list = data;
                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                });
        };

        $scope.GetGroupList();

        $scope.register = function(RegisterForm) {

            if (RegisterForm.$invalid) {
                alert("Проверьте правильность ввода формы");
                return;
            }

            if ($scope.user.password != $scope.user.password2) {
                alert("пароли не совпадают");
                return;
            }

            //здесь будет отправка нашей модели на сервер, для последующей добавки в базу
            var options = {
                method: 'POST',
                url: '/api/registration/registerUser',
                data: $scope.user
            };

            $http(options)
                .success(function(data, status, headers) {
                    $state.go('main.userList');
                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                })
        }


    });
})(window, window.angular);
