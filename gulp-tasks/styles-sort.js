import gulp               from 'gulp';
import plugins            from 'gulp-load-plugins';
// PostCSS processors ---------------------------------
// --syntax
import postscss           from 'postcss-scss';
// --optimizers
import sorter             from 'postcss-sorting';

const $ = plugins();


// SORTING STYLES ORDER
// --------------------

// Recombine SCSS properties in certain order
module.exports = function(options) {
	return (callback) =>
		gulp.src('src/assets/scss/**/*.scss')
			.pipe($.postcss([ sorter ], { syntax: postscss }))
			.pipe(gulp.dest('src/assets/scss'));
};