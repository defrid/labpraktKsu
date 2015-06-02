(function(window, angular) {
    'use strict';
    var module;
    module = angular.module("labPract");
    module.controller("UserProfileController", function($scope, $state, $stateParams, $http, localStorageService) {

        $scope.user_info = {};
        $scope.user_id =  {};
        $scope.user = {};

        //вернет {user_id:..}
        $scope.GetUserId = function() {
            return localStorageService.get('currentUser');
        };

       
       //  $scope.GetSesUserId($scope.user_id);
       //  console.log($stateParams); 

      $scope.GetUserInfo = function() {
            var options = {
                method: 'POST',
                url: '/api/admin/GetUser',
                data: $scope.GetUserId()
                
            };


            $http(options)
                .success(function(data, status, headers) {
                    $scope.user_info = angular.copy(data);
                    console.log($scope.user_info);

                    
                })
                .error(function(error, status, headers) {
                    alert("Ошибка");
                })
        };
 
        $scope.GetUserInfo();

        // $scope.GetUserById();
         
       // $scope.GetUserById($scope.user_info);

       

        
    });
})(window, window.angular);
