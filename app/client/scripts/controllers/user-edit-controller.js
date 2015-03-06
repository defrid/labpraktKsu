(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("UserEditController", function($scope, $state, $stateParams) {
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

        $scope.currentUser = null;
        $scope.user_id = $stateParams.user_id;

        $scope.GetUserById = function (id) {
            //здесь идёт обращение к базе за юзером, поиск идёт по id
            for (var i = $scope.users.length - 1; i >= 0; i--) {
                if ($scope.users[i].id == id) {
                    $scope.currentUser = angular.copy($scope.users[i]);
                }
            };
        };

        $scope.GetUserById($scope.user_id);





    });
})(window, window.angular);
