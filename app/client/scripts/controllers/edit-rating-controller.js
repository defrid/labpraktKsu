(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("EditRatingController", function($scope, $stateParams, $state, $http, Upload, localStorageService) {

        $scope.rating_type = [{
            type_id: 1,
            m_name: "Не проверено"
        }, {
            type_id: 2,
            m_name: "Неудовлетворительно"
        }, {
            type_id: 3,
            m_name: "Удовлетворительно"
        }, {
            type_id: 4,
            m_name: "Хорошо"
        }, {
            type_id: 5,
            m_name: "Отлично"
        }, {
            type_id: 6,
            m_name: "Сделать работу над ошибками"
        }];

        // $scope.currentFile = $stateParams.file_id;
        $scope.file_info = {};
        $scope.file_id = $stateParams.file_id;
        $scope.subj_name = {};

        $scope.GetFileIdForRating = function() {
            var options = {
                method: 'POST',
                url: '/api/files/GetFileIdForRating',
                data: {
                    file_id: $scope.file_id
                }

            };



            $http(options)
                .success(function(data, status, headers) {
                    $scope.file_info = data;
                    console.log($scope.file_info);
                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                })
        };

        $scope.GetFileIdForRating();
        
     /*  $scope.GetSubjectById = function() {
            var options = {
                method: 'POST',
                url: '/api/files/GetSubjectById',
                data:   $scope.file_info
            };
            $http(options)
                .success(function(data, status, headers) {

                    $scope.subj_name = data;
                    
                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                })
        };

        $scope.GetSubjectById();*/
        



        //нажали сохранить, а форму не передали
        $scope.buttonClick_save = function() {

            /*if (EditForm.$invalid) {
                return alert("Повторите ввод");
            }*/

            var options = {
                method: 'POST',
                url: '/api/files/EditRatingFile',
                data: $scope.file_info
            };

            $http(options)
                .success(function(data, status, headers) {
                    $state.go('main.files');
                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                })
        }



        $scope.buttonClick_cancel = function() {
            $state.go('main.files');
        }








    });
})(window, window.angular);
