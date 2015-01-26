var $              = require('gulp-load-plugins')(),
    gulp           = require('gulp'),
    appConfig      = require('../config/pivotal-config.json'),
    applicationName = appConfig.name,
    runSequence = require('run-sequence');

function onError(err) {
    $.util.beep();
    console.log(err);
}




gulp.task('images', function () {
    return gulp.src('app/client/images/**/*')
        .pipe(gulp.dest('public/images'))
        .pipe($.size());
});

gulp.task('clean-styles', function () {
    return gulp.src('app/.tmp/styles', {read: false})
        .pipe($.rimraf());
});
gulp.task('clean-views', function () {
    return gulp.src('app/.tmp/views', {read: false})
        .pipe($.rimraf());
});

var jade = require("gulp-jade");
gulp.task('jade', function() {
    return gulp.src('./app/client/views/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('app/.tmp/views'))
        .pipe($.size());
});

gulp.task('config',  function () {
    return gulp.src('config/config.json')
        .pipe($.ngConstant())
        .pipe(gulp.dest('app/client/scripts'));
});


gulp.task('componentsfontawesome', function () {
    return gulp.src('app/client/bower_components/components-font-awesome/fonts/*.{otf,eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('public/fonts'))
        .pipe($.size());
});
var mainBowerFiles = require('main-bower-files');
gulp.task('fonts', ['componentsfontawesome'], function () {
    return gulp.src(mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest('public/fonts'))
        .pipe($.size());
});

// Inject bower components.
gulp.task('bower', function () {
    return $.bower('app/client/bower_components');
});

gulp.task('clean', function () {
    return gulp.src(['app/.tmp', 'public'], { read : false }).pipe($.rimraf());
});

gulp.task('wiredep', ['bower'], function () {
    var wiredep = require('wiredep').stream;

    return gulp.src('app/client/*.html')
        .pipe(wiredep({
            directory : 'app/client/bower_components',
            exclude   : ['bootstrap-sass-official']
        }))
        .pipe(gulp.dest('app/client'));
});


gulp.task('views-to-js', function () {
    return gulp.src('app/.tmp/views/**/*.html')
        .pipe($.minifyHtml({
            empty  : true,
            spare  : true,
            quotes : true
        }))
        .pipe($.ngHtml2js({
            moduleName : applicationName,
            prefix     : 'views/'
        }))
        .pipe($.concat('views.min.js'))
        .pipe(gulp.dest('app/.tmp'))
        .pipe($.size());
});

gulp.task('script-deps', function(cb){
    runSequence('config', cb);
});

gulp.task('scripts', ['script-deps'], function () {
    return gulp.src(['app/client/scripts/**/*.js'])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.size());
});

gulp.task('views', function (cb) {
    runSequence('clean-views', 'jade', cb);
});

var sass = require('gulp-sass');
gulp.task('styles', ['clean-styles'], function () {
    return gulp.src('app/client/styles/main.scss')
        .pipe($.plumber({
            errorHandler : onError
        }))
        .pipe($.sass({ style : 'expanded' }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('app/.tmp/styles'))
        .pipe($.size());
});

gulp.task('inject', ['scripts'], function () {
    return gulp.src('app/client/*.html')
        .pipe($.using())
        .pipe($.inject(gulp.src(['app/client/scripts/**/*.js', '!app/client/scripts/vendors/**/*.js']).pipe($.angularFilesort()),
            {
                ignorePath   : 'app/client',
                addRootSlash : false
            }
        ))
        .pipe(gulp.dest('app/client'))
        .pipe($.size());
});

gulp.task('favicon', function () {
    return gulp.src('app/client/favicon.ico')
        .pipe(gulp.dest('public'))
        .pipe($.size());
});