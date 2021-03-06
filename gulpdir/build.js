
var $              = require('gulp-load-plugins')(),
    gulp           = require('gulp'),
    paths          = {
        html    : ['app/client/*.html'],
        scripts : ['app/client/scripts/**/*.js'],
        out     : 'app/client/',
        ignore  : 'app/client'
    },
    runSequence = require('run-sequence');

function onError(err) {
    $.util.beep();
    console.log(err);
}

gulp.task('html-deps', function(cb){
    runSequence('sprite', 'wiredep', 'scripts', 'inject', 'views', 'styles', 'views-to-js', cb);
});

gulp.task('html', ['html-deps'], function () {
    var jsFilter  = $.filter('**/*.js'),
        cssFilter = $.filter('**/*.css'),
        assets = $.useref.assets();

    return gulp.src(['app/client/*.html'])
        .pipe($.plumber({ errorHandler : onError }))

        .pipe($.inject(gulp.src('app/.tmp/views.min.js', { read : false }),
            {
                addRootSlash : false,
                name         : 'views'
            }
        ))

        .pipe(assets)

        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        //.pipe($.uglify())
        .pipe(jsFilter.restore())

        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())

        .pipe($.rev())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())

        .pipe(gulp.dest('public'))
        .pipe($.size());
});

gulp.task('build', [ 'html', 'fonts', 'images', 'favicon' ]);