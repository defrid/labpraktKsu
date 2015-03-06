(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("UserListController", function($scope, $state) {

        $scope.users = [{
            id: 1,
            user_name: "Иванцов",
            user_lastname: "Иван",
            user_surname: "Иванович",
            email: "аврвар@",
            date_create: "",
            date_change: "",
            mode: 1
        }, {
            id: 2,
            user_name: "Ровамнов",
            user_lastname: "Роман",
            user_surname: "Рованович",
            email: "пврвр@",
            date_create: "",
            date_change: "",
            mode: 1
        }];

        $scope.buttonClick_change = function(user) {
            $state.go('main.userEdit', {
                user_id: user.id
            });
        }

        $scope.buttonClick_delete = function(user) {
            alert(user.user_name + ", запись удалена");
        }


    });
})(window, window.angular);
