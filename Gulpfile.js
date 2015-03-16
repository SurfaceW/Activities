/**
 * This is the gulp file for automatically make/build the project
 */

var gulp       = require('gulp');
var browserify = require('browserify');
var sass       = require('gulp-sass');
var source     = require('vinyl-source-stream');
var watchify   = require('watchify');
var reactify   = require('reactify'); 
var gulpif     = require('gulp-if');
var uglify     = require('gulp-uglify');
var streamify  = require('gulp-streamify');
var notify     = require('gulp-notify');
var concat     = require('gulp-concat');
var cssmin     = require('gulp-cssmin');
var gutil      = require('gulp-util');
var shell      = require('gulp-shell');
var glob       = require('glob');
var livereload = require('gulp-livereload');

// var jasminePhantomJs = require('gulp-jasmine2-phantomjs');

gulp.task('browserify', function() {

	var appBundler = browserify({
			entries: ['./app/main.js'], // The entry file, normally "main.js"
			transform: [reactify], // Convert JSX style
			cache: {}, 
			packageCache: {}, 
			fullPaths: false, // true: Requirement of watchify
			debug: true
		});

	var start = Date.now();
		console.log('Building APP bundle');
		appBundler.bundle()
		  .on('error', gutil.log)
		  .pipe(source('main.js'))
		  .pipe(gulp.dest('./build/'))
		  .pipe(notify(function () {
			console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
		  }));
});

gulp.task('sass', function () {
	gulp.src('./style/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('default', ['browserify', 'sass']);
