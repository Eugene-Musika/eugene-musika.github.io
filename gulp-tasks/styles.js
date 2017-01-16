import gulp               from 'gulp';
import plugins            from 'gulp-load-plugins';
import {obj as combine}   from 'stream-combiner2';
// PostCSS processors ---------------------------------
// --BEM/SUIT
import bem                from 'postcss-bem';
// --mods
import cssAlias           from 'postcss-alias';
import cssTriangle        from 'postcss-triangle';
import cssCircle          from 'postcss-circle';
import cssCenter          from 'postcss-center';
import cssClearfix        from 'postcss-clearfix';
import cssUtils           from 'postcss-utilities';
import cssShort           from 'postcss-short';
import cssEasings         from 'postcss-easings';
// --manual grid
import cssGrid            from 'lost';
// --fallbacks
import postcssWillChange  from 'postcss-will-change';
import postcssVmin        from 'postcss-vmin';
// --optimizers
import svgo               from 'postcss-svgo';
import fontMagic          from 'postcss-font-magician';
import cssnext            from 'postcss-cssnext';
import cssPxToRem         from 'postcss-pxtorem';
import mqpacker           from 'css-mqpacker';

const $ = plugins();


// STYLES
// ------

module.exports = function(options) {
	// PostCSS processors/plugins assing
	const POSTPROCESSORS = [
		bem(options.POSTCSS.bem), //NOTE: BEM nesting &-selectors don't work
		cssAlias,     // "@alias {cl: color; l: left; ...}"
		cssTriangle,  // "triangle: pointing-<up|down|left|right>;"
		// "width:  [length];"
		// "height: [length];"
		// "background-color: [color];" (optional)
		cssCircle,    // "circle: [diameter] [color]"
		cssCenter,    // "top: center; left: center;"
		// don't forget "position: relative" for parent
		cssClearfix,  // "clear: fix"
		cssUtils,   //GOTO: ismamz.github.io/postcss-utilities/docs
		cssShort,   //GOTO: github.com/jonathantneal/postcss-short
		cssEasings, //GOTO: easings.net
		cssGrid,    //GOTO: github.com/corysimmons/lost
		cssPxToRem(options.POSTCSS.pxtorem),
		postcssWillChange,
		postcssVmin,
		svgo,
//		fontMagic(options.POSTCSS.fonts),   //NOTE: not support Cyrrilic
		cssnext(options.POSTCSS.autoprefix) //NOTE: CSSnext includes autoprefixer
	];


	// Compile Sass into CSS throw PostCSS
	// In production, the CSS is compressed, media-queries - sorted
	return function(callback) {
		return gulp.src('src/assets/scss/app.scss')
			.pipe($.plumber({
				errorHandler: $.notify.onError(err => ({
					title:   'Styles',
					message: err.message
				}))
			}))
			.pipe($.sourcemaps.init())
			.pipe($.sass({ includePaths: options.PATHS.sass }))
			.pipe($.postcss( POSTPROCESSORS ))
			.pipe($.if(options.PRODUCTION, combine(
				// Uncomment the pipe below to run UnCSS in production
				//$.uncss(options.UNCSS_OPTIONS),
				$.postcss([ mqpacker ]),
				$.cssnano()
			), $.sourcemaps.write()))
			.pipe(gulp.dest(options.PATHS.dist + '/assets/css'));
	};
};