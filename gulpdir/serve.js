var browserSync    = require('browser-sync'),
    gulp           = require('gulp'),

    httpProxy      = require('http-proxy'),
    modRewrite     = require('connect-modrewrite'),
    $ = require('gulp-load-plugins')(),
    proxyApi = httpProxy.createProxyServer({
        target : 'http://localhost:9000'
    }),
    runSequence = require('run-sequence');

function onError(err) {
    $.util.beep();
    console.log(err);
}

function proxy(req, res, next) {
    if (req.url.indexOf('/api/') !== -1) {
        console.log(req.url, 'proxy redirect');
        proxyApi.web(req, res);
    } else {
        next();
    }
}

proxyApi.on('error', onError);

gulp.task('serve-deps', function(cb){
    runSequence('sprite', 'wiredep', 'scripts', 'inject', 'views', 'styles', 'watch', cb);
});
gulp.task('serve', ['serve-deps'], function () {
    browserSync({
        files: [
            'app/client/*.html',
            'app/client/images/**/*'
        ],
        startPath : '/',
        server    : {
            baseDir    : [ 'app/client', 'app/.tmp' ],
            middleware : [proxy, modRewrite([
                '^/?[^\\.]*$ /index.html [L]',
                '^/\.tmp(.*)$ /$1 [L]', //Папка .tmp
                '^/(.*)$ /$1 [L]'  // Иначе отдаем статичный файл
            ])]
        },
        browser: "default",
        injectChanges: false,
        exclude   : ['app/client/scripts/vendors']
    });
});

gulp.task('watch', function () {
    gulp.watch('app/client/styles/**/*.scss', ['styles-reload']);
    gulp.watch('app/client/views/**/*.jade', ['views-reload']);
    gulp.watch('app/client/scripts/**/*.js', ['scripts-reload']);
    gulp.watch('app/client/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task('styles-reload', function (cb) {
    runSequence('styles', 'browsersync-reload', cb);
});

gulp.task('views-reload', function (cb) {
    runSequence('views', 'browsersync-reload', cb);
});

gulp.task('scripts-reload', function (cb) {
    runSequence('scripts', 'browsersync-reload', cb);
});

gulp.task('browsersync-reload', function(cb){
    browserSync.reload();
    cb();
})