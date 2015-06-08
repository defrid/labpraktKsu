(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("UploadedFilesTablController", function($scope, $stateParams, $filter, $state, $http, ngTableParams, Upload, localStorageService) {
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


        $scope.user = [];

        $scope.subj_list = [];

        $scope.file_list = [];

        $scope.curPage = 0; //текущая страница

        $scope.count = 5; //количество отображаемых элементов

        $scope.subject = [];


        $scope.displaySubject = function(subject_id) {
            for (var i = $scope.subj_list.length - 1; i >= 0; i--) {
                if ($scope.subj_list[i].subject_id == subject_id) {
                    return $scope.subj_list[i].subject_name;
                }
            };
            return 'Нет';
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


        $scope.GetFileList = function() {

            var options = {
                method: 'POST',
                url: '/api/files/GetFileList'

            };

            $http(options)
                .success(function(data, status, headers) {
                    // $scope.file_list = data;
                    $scope.file_list = data.list;
					$scope.tableParams = new ngTableParams({
						page: 1,            // show first page
						count: 5,          // count per page
						sorting: {
							user_lastname: 'asc'     // initial sorting
						}
					}, {
						total: $scope.file_list.length, // length of data
						getData: function($defer, params) {
							// use build-in angular filter
							var orderedData = params.sorting() ?
                                $filter('filter')($scope.file_list, params.filter()) :
                                $scope.file_list;

							params.total(orderedData.length);
							$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
						}
					});
                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                });
        };


        $scope.GetSubjList();

        $scope.GetFileList();

        //передаем subj_list, а используем subject. ВОТ ЭТО ПОВОРОТ
        $scope.upload = function(files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (/.exe/.test(file.name))
                        return alert("Не грузи такую гадость");
                    Upload.upload({
                        url: 'api/files/fileUpload',
                        file: file,
                        fields: {
                            file_name: file.name,
                            subj_id: $scope.subject_id,
                            user_id: $scope.GetUserId().user_id
                        }

                    }).progress(function(evt) {}).success(function(data, status, headers, config) {
                        console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
						alert("Добавлено");
                    });
                }
            }
        };


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

                        var blob = new Blob([data], {
                                type: "octet/stream"
                            }),
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
        //____________________________Кнопки_______________________________________________________

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

        $scope.buttonEdit_rating = function(file_id) {
            $state.go('main.editRating', {
                file_id: file_id
            });
        }

        // ________________________________________________________________________________________________________
        $scope.GetUserId = function() {
            return localStorageService.get('currentUser');
        };

		$scope.curUser = $scope.GetUserId();

    });
})(window, window.angular);

// /api/files/fileUpload
