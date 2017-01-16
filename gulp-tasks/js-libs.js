import gulp               from 'gulp';
import plugins            from 'gulp-load-plugins';

const $ = plugins();


// JS MODULES LIBRARY
// ------------------

// Make JavaScript libraries
module.exports = function(options) {
	return function(callback) {
		return gulp.src( options.PATHS.jslibs )
			.pipe($.plumber({
				errorHandler: $.notify.onError(err => ({
					title:   'JS libraries',
					message: err.message
				}))
			}))
			.pipe($.concat( 'libs.js' ))
			.pipe($.if(options.PRODUCTION, $.uglify()))
			.pipe(gulp.dest(options.PATHS.dist + '/assets/js'));
	};
};