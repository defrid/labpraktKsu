(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("UserEditController", function($scope, $state, $stateParams, $http) {

        $scope.currentUser = null;
        $scope.user_id = $stateParams.user_id;

        $scope.GetUserById = function(id) {
            var options = {
                method: 'POST',
                url: '/api/admin/GetUser',
                data: {
                    user_id: id
                }
            };


            $http(options)
                .success(function(data, status, headers) {
                    $scope.currentUser = angular.copy(data);
                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                })
        };

        $scope.GetUserById($scope.user_id);

        $scope.buttonClick_save = function(EditForm) {

            var options = {
                method: 'POST',
                url: '/api/admin/EditUser',
                data: $scope.currentUser
            };

            $http(options)
                .success(function(data, status, headers) {
                    $state.go('main.userList');
                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                })
        }

        $scope.buttonClick_cancel = function() {
            $state.go('main.userList');
        }

    });
})(window, window.angular);