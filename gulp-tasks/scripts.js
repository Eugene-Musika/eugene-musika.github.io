import gulp           from 'gulp';
import plugins        from 'gulp-load-plugins';
import webpackStream  from 'webpack-stream';
import { webpack }    from 'webpack-stream';
import named          from 'vinyl-named';
import path           from 'path';
import gulplog        from 'gulplog';

const $ = plugins();


// WEBPACK
// -------

module.exports = function(options) {
	return function(callback) {
		let firstBuildReady = false;

		function done(err, stats) {
			firstBuildReady = true;

			if (err) { // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
				return;  // emit('error', err) in webpack-stream
			}

			gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
				colors: true
			}));

		}

		let config = {
			// Comment lines unrequired for Gulp
//		context: path.resolve('src/assets/js'),

//		entry: {
//			home: './home', // Could be an array. Last chunk goes to library
//			about: './about',
//			common: './common' // General JS file
//		},
			output: {
//			path: __dirname + '/build',
				publicPath: '/assets/js/',
//			filename: '[name].js'
//			library: "[name]" // Global variables of js chunks
			},
			
			watch: !options.STOP,
			watchOptions: {
				aggregateTimeout: 100, // time before packing will be started after any changes
			},
			
			// Method of creating source maps
			devtool: options.PRODUCTION ? null : 'cheap-inline-config-source-map',
			
			plugins: [
				// Setting global script variables
				new webpack.DefinePlugin({
					__DEV__: !options.PRODUCTION 
				}),
				new webpack.NoErrorsPlugin(),
				// Collect repeating chunks to separate chunk
				new webpack.optimize.CommonsChunkPlugin({
					name: 'common',
					minChunks: 3
				})
			],
			
			// Search paths for required plugins
			resolve: {
				root: path.resolve('src/assets/js/vendor'),
				modulesDirectories: ['node_modules'],
				extensions: ['', '.js']
			},
			
			// Search paths for required plugins in loaders
			resolveLoaders: {
				modulesDirectories: [__dirname + 'node_modules'],
				moduleTemplates: ['*-loader'], // name aliases
				extensions: ['', '.js']
			},
			
			module:  {
				loaders: [{
					loader: 'babel',
					test: /\.js$/,
					include: [ path.resolve('src/assets/js') ],
					exclude: /(node_modules|bower_components)/
				}]
			}
		};

		// For production
		if (options.PRODUCTION) {
			// Production plugins
			config.plugins.push(
				new webpack.optimize.DedupePlugin()
			);
		}


		return gulp.src(options.PATHS.webpack)
			.pipe($.plumber({
				errorHandler: $.notify.onError(err => ({
					title:   'Webpack',
					message: err.message
				}))
			}))
			.pipe(named())
			.pipe(webpackStream(config, null, done))
			.pipe($.if(options.PRODUCTION, $.uglify({
				compress: {
					warnings: false,
					unsafe: true,
					drop_console: true
				}
			})))
			.pipe(gulp.dest(options.PATHS.dist + '/assets/js'))
			.on('data', function() {
			if (firstBuildReady) { callback(); }
		});
	};
};
