import fs       from 'fs';
import gulp     from 'gulp';
import plugins  from 'gulp-load-plugins';
import browser  from 'browser-sync';
import yargs    from 'yargs';
import yaml     from 'js-yaml';


// PRESETS
//--------

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for "--production" flag
const PRODUCTION = !!(yargs.argv.production);
// Check for "--stop" flag
const STOP = !!(yargs.argv.stop);

// Load settings from settings.yml
const { PORT, PATHS, POSTCSS, UNCSS_OPTIONS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

// Tasks lazy load function
function task(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;
	gulp.task(taskName, (done)=>{
		let task = require(path).call(this, options);
		
		return task(done);
	});
}


// TASKS
//------

// Combine JavaScript into file with Webpack and ES6 support
// In production files are minified
task('script', './gulp-tasks/scripts', {
	PRODUCTION,  PATHS,
	STOP
});

// Make JavaScript libraries
task('jsLibs', './gulp-tasks/js-libs', {
	PRODUCTION,  PATHS
});

// Compile Sass into CSS throw PostCSS
// In production, the CSS is compressed, media-queries - sorted
task('styles', './gulp-tasks/styles', {
	PRODUCTION,  PATHS,
	POSTCSS,     UNCSS_OPTIONS
});

// Copy images to the "dist" folder and compress for production
task('images', './gulp-tasks/images', {
	PRODUCTION,  PATHS
});

// Copy files out of the assets folder
// This task skips "img", "js", and "scss" folders
task('copy', './gulp-tasks/copy',   { PATHS });

// Delete the "dist" folder
task('clean', './gulp-tasks/clean', { PATHS });

// Copy page templates into finished HTML files
task('pages', './gulp-tasks/pages', { PATHS });

// Load updated HTML templates and partials into Panini
task('resetPages', './gulp-tasks/reset-pages');

// Recombine SCSS properties in certain order
task('csssort', './gulp-tasks/styles-sort');

// Generate a style guide from the Markdown content and HTML template
task('styleGuide', './gulp-tasks/style-guide', { PATHS });


// MAIN TASKS
// ----------

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
	gulp.series('clean', gulp.parallel('pages', 'styles', /*'jsLibs',*/ 'script', 'images', 'copy')/*, 'styleGuide'*/));

// Build the site, run the server, and watch for file changes
gulp.task('default',
	gulp.series('build', server, watch));


// SERVER FUNCTIONS
//-----------------

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: PATHS.dist, port: PORT
  });
  done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
	gulp.watch(PATHS.assets, gulp.series('copy'));
	gulp.watch('src/assets/img/**/*', gulp.series('images'));
	gulp.watch('src/pages/**/*.html', gulp.series('pages'));
	gulp.watch('src/{layouts,partials}/**/*.html', gulp.series('resetPages', 'pages'));
	gulp.watch('src/assets/scss/**/*.scss', gulp.series('styles'));
	gulp.watch('src/styleguide/**', gulp.series('styleGuide'));
  gulp.watch(`${PATHS.dist}/**/*`).on('change', browser.reload);
}
