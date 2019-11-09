"use strict";

// required modules
var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var lint = require('gulp-eslint');

// server configuration
var config = {
	port: 9090,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css',
      		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    	],
		dist: './dist', // distribution file
		mainJs: './src/main.js'
	}
}

//Start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

// brackets means to wait for that task
gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html') // open distrtribution file on the url and port
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

// gulp.src read html into gulp destination to be copied into the dist, tell connect to reload for new changes
gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(babelify, {presets: ["es2015", "react"]})// jsx to js native functions
		.bundle()											// put js file together, and minify
		.on('error', console.error.bind(console))			// 
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts')) 	// ok 
		.pipe(connect.reload());							// ok
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))							// putting all css into one file, copy into dist/cdd
		.pipe(gulp.dest(config.paths.dist + '/css'));		// reload
});

gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + "/images"))		// putting all images into dist/images
		.pipe(connect.reload());							// reload
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)						// send all js into lint function
		.pipe(lint())
		.pipe(lint.format());								// prividing formatting from rules
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);				// whenever some changes are gonna happen, i need t know about it and update my server
	gulp.watch(config.paths.js, ['js', 'lint']);			// get new html and copy it into dist/html- effectively updating
															// changes in js also run lint
});

// default task, when u run gulp, this will be run, in this order from left to right
gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);