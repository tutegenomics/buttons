var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var wrap = require("gulp-wrap");
var watch = require('gulp-watch');


gulp.task('build', function() {
	return gulp.src('./src/*.js')
		.pipe(babel())
		//first, pipe each one to the dist folder
		.pipe(gulp.dest('./dist'))
		//now concat them all into one
		.pipe(concat('tute-buttons-all.js'))
		.pipe(wrap('(function(){ ' + '<%= contents %>' + ' })();'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
	watch('./src/**/*', function() {
		gulp.start('build');
	});
});


gulp.task('default', ['build', 'watch']);