import gulp               from 'gulp';


// FILES COPY
// ----------

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
module.exports = function(options) {
	return function(callback) {
		return gulp.src( options.PATHS.assets, {since: gulp.lastRun(options.taskName)})
			.pipe(gulp.dest(options.PATHS.dist + '/assets'));
	};
};