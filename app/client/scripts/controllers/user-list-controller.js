(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("UserListController", function($scope, $state) {

        $scope.user = [{
            id: 1,
            user_lastname: "Иванцов",
            user_name: "Иван",
            user_surname: "Иванович",
            email: "аврвар@",
            date_create: "",
            date_change: "",
            mode: 1
        }, {
            id: 2,
            user_lastname: "Ровамнов",
            user_name: "Роман",
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

        $scope.buttonClick_add = function(user) {
            $state.go('main.userAdd');
        }
        


    });
})(window, window.angular);
