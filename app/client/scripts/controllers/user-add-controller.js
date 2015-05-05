(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("UserAddController", function($scope, $state, $http) {

        $scope.currentUser = {};//и больше вообще ничего не надо

        $scope.buttonClick_save = function(addForm) {

            if(addForm.$invalid) {
                return alert("Повторите ввод");
            }

            var options = {
                method: 'POST',
                url: '/api/admin/SaveUser',
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
