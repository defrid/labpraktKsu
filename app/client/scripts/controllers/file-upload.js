(function() {


    var app = angular.module('labPract');


    app.controller('fileUploadCtrl', function($scope, $http, $timeout, config) {
        $scope.data = {
            pastedText: ""
        }

        $scope.summary = {
            progress: 0,
            ETA: "0",
            Size: "",
            Items: 0,
            status: "Idle"
        }
    });
})();