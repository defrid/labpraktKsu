(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("UserListController", function($scope, $state, $http) {

        $scope.userList = [];

        $scope.getList = function() {
            $http.get('/api/admin/GetUserList')
                .success(function(data, status, headers) {
                    $scope.userList = angular.copy(data);
                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                })
        }

        $scope.getList();

        $scope.buttonClick_change = function(user) {
            $state.go('main.userEdit', {
                user_id: user.id
            });
        }


        $scope.buttonClick_delete = function(user) {
            alert(user.user_name + ", запись удалена");
        }

        $scope.buttonClick_add = function() {
            $state.go('main.userAdd');
        }



    });
})(window, window.angular);
