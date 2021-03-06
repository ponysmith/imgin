'use strict';

/**
 * Imports
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

/**
 * Build task for minified JS
 */
gulp.task('build', function() {
  gulp.src('src/imgin.js')
    .pipe(uglify())
    .pipe(rename('imgin.min.js'))
    .pipe(gulp.dest('src'));
});

/**
 * Default task (watch for changes and rebuild dev assets)
 */
gulp.task('watch', ['build'], function() {
	gulp.watch('src/imgin.js', ['build']);
});
