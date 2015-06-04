(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("UploadedFilesTablController", function($scope, $stateParams, $state, $http, Upload, localStorageService) {
        $scope.$watch('files', function() {
            $scope.upload($scope.files);
        });


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


        $scope.user_type = [];

        $scope.subj_list = [];

        $scope.file_list = [];

        $scope.curPage = 0; //текущая страница

        $scope.count = 5; //количество отображаемых элементов

        $scope.subj = {};

        $scope.upload = function(files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.upload({
                        url: 'api/files/fileUpload',
                        file: file,
                        fields: {
                            file_name: file.name
                        }
                    }).progress(function(evt) {}).success(function(data, status, headers, config) {
                        console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
                    });
                }
            }
        };


        $scope.GetSubjList = function() {

            var options = {
                method: 'GET',
                url: '/api/subject/GetSubjectList'
            };

            $http(options)
                .success(function(data, status, headers) {
                    $scope.subj_list = data;
                    //console.log($scope.subj_list);

                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                });
        };



        $scope.GetFilePagedList = function() {

            var options = {
                method: 'POST',
                url: '/api/files/GetFilePagedList',
                data: {
                    curPage: $scope.curPage,
                    count: $scope.count
                }

            };

            $http(options)
                .success(function(data, status, headers) {
                    // $scope.file_list = data;
                    $scope.file_list = data.list;
                    console.log('Проверка:', $scope.file_list);
                    $scope.lastPage = data.lastPage < 0 ? 0 : data.lastPage;

                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                });
        };

        /*
                        $scope.tableParams = new ngTableParams({
                            curPage: $scope.curPage,
                            count: $scope.count,
                            filter: {
                                    name: 'M'
                                }
                        }, {
                            total: $scope.file_list.length,
                            getData: function($defer, params) {

                                var orderedData = params.filter() ?
                                    $filter('filter')(data, params.filter()) :
                                    data;

                                $scope.file = orderedData.slice((params.curPage() - 1) * params.count(), params.curPage() * params.count());

                                params.total(orderedData.length);
                                $defer.resolve($scope.file);
                            }
                        });
                    */


        $scope.GetSubjList();

        $scope.GetFilePagedList();

        $scope.buttonClick_download = (function() {
            var a = document.createElement("a");
            document.body.appendChild(a);
            //a.style = "display: none";


            return function(file) {
                var request = {
                    url: '/api/files/GetFileById',
                    method: 'POST',
                    data: {
                        file_id: file.file_id
                    },
                    responseType: 'arraybuffer'
                };
                $http(request)
                    .success(function(data, status, headers) {

                        var blob = new Blob([data], {type: "octet/stream"}),
                        url = window.URL.createObjectURL(blob);
                        a.href = url;
                        a.download = file.file_name;
                        a.click();
                        window.URL.revokeObjectURL(url);

                    })
                    .error(function(error, status, headers) {
                        alert("Ошибка");
                    })
            };
        })();
        //____________________________Кнопки страниц_______________________________________________________

        $scope.buttonNext_page = function() {
            if ($scope.lastPage == $scope.curPage) {
                return;
            }
            $scope.curPage++;
            $scope.GetFilePagedList();
        }

        $scope.buttonPrevious_page = function() {
            if ($scope.curPage == 0) {
                return;
            }
            $scope.curPage--;
            $scope.GetFilePagedList();
        }


        // ________________________________________________________________________________________________________

        $scope.GetUserId = function() {
            return localStorageService.get('currentUser');
        };

        $scope.GetUserById = function(id) {
            var options = {
                method: 'POST',
                url: '/api/admin/GetUser',
                data: $scope.GetUserId()
            };


            $http(options)
                .success(function(data, status, headers) {
                    $scope.user_type = data.user_type;
                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                })
        };
        $scope.GetUserById();

    });
})(window, window.angular);

// /api/files/fileUpload
