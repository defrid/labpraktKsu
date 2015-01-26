(function () {
    var app = angular.module('edm');

    app.directive('resize', function ($window) {
        return function (scope, element) {
            var w = angular.element($window);

            topOffset = 50;
            height = w.innerHeight - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                element.css("min-height", (height) + "px");
            }

            w.resize();
        }
    })
})();