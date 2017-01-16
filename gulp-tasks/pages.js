import gulp               from 'gulp';
import panini             from 'panini';


// HTML TEMPLATE COMPILER
// ----------------------

// Copy page templates into finished HTML files
module.exports = function(options) {
	return (callback) =>
		gulp.src('src/pages/**/*.{html,hbs,handlebars}')
			.pipe(panini( options.PATHS.panini ))
			.pipe(gulp.dest( options.PATHS.dist ));
};