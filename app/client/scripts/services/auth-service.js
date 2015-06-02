(function(window, angular, _) {
    'use strict';

    angular.module('labPract')
        .service('AuthService',
            function($http, $q, $rootScope, $state, config, SessionService, User) {
                var self = this;
                $rootScope.currentUser = null;

                // Оформляет атрибуты пользователя в новый объект User
                this._changeUser = function(userAttributes) {
                    $rootScope.currentUser = new User(userAttributes);
                }

                this._createSession = function(credentials) {
                    return $http.post(config.appRootPath + '/session', credentials);
                };

                this.isLoggedIn = function() {
                    return SessionService.isLoggedIn();
                };

                this.login = function(credentials) {
                    var defer = $q.defer();
                    function success (data) {
                        var userAttributes = data.user;
                        self._changeUser(userAttributes);
                        SessionService.create(userAttributes);
                        defer.resolve(userAttributes);
                    }
                    self._createSession(credentials).success(success).error(function(data){
                        defer.reject(data);
                    });

                    return defer.promise;
                };

                this._logoutClent = function() {
                    $rootScope.currentUser = null;
                    SessionService.destroy();
                };

                this.logout = function(){
                    this._logoutClent();
                    return $http.delete(config.appRootPath +'/session');
                };

                this.currentUser = function() {
                    return $rootScope.currentUser;
                };

                this.checkAuth = function(){
                    function failAuth(){
                        self._logoutClent();
                        $state.go('login');
                    };
                    if (!SessionService.isLoggedIn()){
                        return failAuth();
                    } else if (SessionService.isLoggedIn() && !$rootScope.currentUser){
                        self._changeUser(SessionService.currentUser());
                    }
                    return $http.get(config.appRootPath +'/session').then(function(data) {
                        SessionService.update(data.data);
                        self._changeUser(data.data);
                    }, failAuth);
                };
            }
        );
}(window, window.angular, window._));
