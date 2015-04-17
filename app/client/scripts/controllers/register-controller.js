(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("RegisterController", function($scope, $state, AuthService) {

        $scope.studyMode = [{
            id: 1,
            m_name: "Очная"
        }, {
            id: 2,
            m_name: "Заочная"
        }];

        $scope.registerModel = {
            user_name: "",
            user_lastname: "",
            user_surname: "",
            password: "",
            password2: "",
            email: "",
            mode: 1
        }

        $scope.register = function(RegisterForm) {

            if (RegisterForm.$invalid) {
                alert("Проверьте правильность ввода формы");
                return;
            }

            if ($scope.registerModel.password != $scope.registerModel.password2) {
                alert("пароли не совпадают");
                return;
            }

            //здесь будет отправка нашей модели на сервер, для последующей добавки в базу

            console.log($scope.registerModel)
        }


        $scope.buttonClick = function(element) {
            alert(element.odin + ", " + element.dva);
        }

        /*  во что разворачивается ng-repeat(ну тип того)
                for (var i = 0 ; i < studyMode.legnth; i++) {
                    var mode = studyMode[i];

                    value = mode.id;

                    чевыводится = mode.m_name;
                }
        */


    });
})(window, window.angular);
