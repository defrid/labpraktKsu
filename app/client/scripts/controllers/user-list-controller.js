(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("UserListController", function($scope, $state, $http) {

        $scope.userList = []; //полный список

        $scope.displayList = []; //отображаемый список

        $scope.curPage = 0; //текущая страница

        $scope.count = 2; //количество отображаемых элементов

        /*
            request
            {
                curPage: number,
                count: number
            }

            response
            {
                curPage: number,
                count: number,
                lastPage: number,
                list: [массив со списком на текущуцю страницу]
            }
        */

        $scope.getList = function() {
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
                    $scope.lastPage = data.lastPage;

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
            //запрос
            $scope.getList();
        }

        $scope.buttonPrevious_page = function() {
            if ($scope.curPage == 0) {
                return;
            }
            $scope.curPage--;
            //запрос
            $scope.getList();
        }

        $scope.buttonClick_change = function(user) {
            $state.go('main.userEdit', {
                user_id: user.id
            });
        }


        $scope.buttonClick_delete = function(user) {
            alert(user.user_name + ", запись удалена");
        }

        $scope.buttonClick_add = function() {
            $state.go('main.userAdd');
        }



    });
})(window, window.angular);
