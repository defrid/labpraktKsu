(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("UserAddController", function($scope, $state) {

        $scope.currentUser = {};

        $scope.buttonClick_save = function(form) {
            //а отпарвляем currentUser
            $state.go('main.userList');
        }

        $scope.buttonClick_cancel = function(form) {
            $state.go('main.userList');
        }




    });
})(window, window.angular);
