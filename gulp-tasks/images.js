import gulp       from 'gulp';
import plugins    from 'gulp-load-plugins';
import pngquant   from 'imagemin-pngquant';
import jpegoptim  from 'imagemin-jpegoptim';

const $ = plugins();


// IMAGES HANDLING	
// ---------------

// Copy images to the "dist" folder
// In production, the images are compressed
module.exports = function(options) {
	return (callback) =>
		gulp.src('src/assets/img/**/*', {since: gulp.lastRun(options.taskName)})
			.pipe($.if(options.PRODUCTION, $.imagemin({
				progressive: true,
				interlaced: true,
				optimizationLevel: 3,
				multipass: true,
				use: [pngquant(), jpegoptim({
					progressive: true,
					max: 90
				})]
			})))
			.pipe(gulp.dest(options.PATHS.dist + '/assets/img'));
};