import sherpa             from 'style-sherpa';


// STYLE GUIDE
// -----------

// Generate a style guide from the Markdown content and HTML template
module.exports = function(options) {
	return (done)=>{
		sherpa('src/styleguide/index.md', {
			output: options.PATHS.dist + '/styleguide.html',
			template: 'src/styleguide/template.html'
		}, done);
	};
};