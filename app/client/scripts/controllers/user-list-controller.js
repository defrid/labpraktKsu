(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("UserListController", function($scope, $state, AuthService) {

        $scope.data = [{
            user_name: "Иванцов",
            user_lastname: "Иван",
            user_surname: "Иванович",
            email: "аврвар@",
            date_create: "",
            date_change: "",
            mode: 1
        }, {
            user_name: "Ровамнов",
            user_lastname: "Роман",
            user_surname: "Рованович",
            email: "пврвр@",
            date_create: "",
            date_change: "",
            mode: 1
        }];

        $scope.buttonClick_chenge = function(element) {
            alert(element.user_name + ", запись изменена");
        }

        $scope.buttonClick_delete = function(element) {
            alert(element.user_name + ", запись удалена");
        }


    });
})(window, window.angular);
