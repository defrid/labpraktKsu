(function(window, angular) {
    'use strict';
    return angular.module('labPract')
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('main', {
                    abstract: true,
                    templateUrl: 'views/layout.html',
                    controller: 'MainController'
                })
                .state('main.start', {
                    url: '/'
                })
                .state('main.files', {
                    url: '/files',
                    templateUrl: 'views/partials/uploaded-files-tabl.html',
                    controller: "UploadedFilesTablController"
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/partials/login.html',
                    controller: "LoginController"
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'views/partials/register.html',
                    controller: "RegisterController"
                })
                .state('main.userEdit', {
                    url: '/user-edit/:user_id',
                    templateUrl: 'views/partials/user-edit.html',
                    controller: "UserEditController"
                })
                 
                .state('main.userList', {
                    url: '/user-list',
                    templateUrl: 'views/partials/user-list.html',
                    controller: "UserListController"
                })

                .state('main.userProfile', {
                    url: '/user-profile',
                    templateUrl: 'views/partials/user-profile.html',
                    controller: "UserProfileController"
                })

                .state('main.editRating', {
                    url: '/edit-rating/:file_id',
                    templateUrl: 'views/partials/edit-rating.html',
                    controller: "EditRatingController"
                })

                .state('main.userAdd', {
                    url: '/user-add',
                    templateUrl: 'views/partials/user-add.html',
                    controller: "UserAddController"
                });

              /*  .state('main.modalWinUploadedFiles', {
                    url: '/modal-win-uploaded-files',
                    templateUrl: 'views/partials/modal-win-uploaded-files.html',
                    controller: "ModalWinUploadedFilesController"
                });
                */



                
        });
})(window, window.angular);
