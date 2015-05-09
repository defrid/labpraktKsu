(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("UploadedFilesTablController", function($scope, $state, $http, Upload) {
		$scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/files/fileUpload',
                    file: file
                }).progress(function (evt) {
                }).success(function (data, status, headers, config) {
                });
            }
        }
    };
    });
})(window, window.angular);
