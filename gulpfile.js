'use strict';

var gulp = require('gulp');

require('require-dir')('./gulpdir');

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});