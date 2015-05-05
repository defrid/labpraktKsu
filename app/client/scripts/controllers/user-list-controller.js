(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("UserListController", function($scope, $state, $http) {

        $scope.userList = []; //полный список

        $scope.displayList = []; //отображаемый список

        $scope.curPage = 0; //текущая страница

        $scope.count = 5; //количество отображаемых элементов

        $scope.getList = function(tableForm) {
            var request = {
                url: '/api/admin/getPagedList',
                method: 'POST',
                data: {
                    curPage: $scope.curPage,
                    count: $scope.count
                }
            }
            $http(request)
                .success(function(data, status, headers) {
                    $scope.displayList = data.list;
                    $scope.lastPage = data.lastPage < 0 ? 0 : data.lastPage;
                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                })
        }
        $scope.getList();

        $scope.buttonNext_page = function() {
            if ($scope.lastPage == $scope.curPage) {
                return;
            }
            $scope.curPage++;
            $scope.getList();
        }

        $scope.buttonPrevious_page = function() {
            if ($scope.curPage == 0) {
                return;
            }
            $scope.curPage--;
            $scope.getList();
        }

        $scope.buttonClick_change = function(user) {
            $state.go('main.userEdit', {
                user_id: user.id
            });
        }


        $scope.buttonClick_delete = function(user) {
            var request = {
                url: '/api/admin/RemoveUser',
                method: 'POST',
                data: {
                    user_id: user.id
                }
            }

            $http(request)
                .success(function(data, status, headers) {
                    if (data.success) {
                        if ($scope.lastPage == $scope.curPage && $scope.displayList.length == 1 && $scope.curPage > 0) {
                            $scope.curPage--;
                        }
                        $scope.getList();
                    }
                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                })
        }
        
        $scope.buttonClick_add = function() {
            $state.go('main.userAdd');
        }

    });
})(window, window.angular);
