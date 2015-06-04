(function(window, angular) {
    'use strict';
    return angular.module('labPract', [
        'labPract.config',
        'ui.router',
        'LocalStorageModule',
        'ngResource',
        'ui.bootstrap',
		'ngFileUpload',
        'angular-md5'
       // 'ngTable'
    ]);
})(window, window.angular);
