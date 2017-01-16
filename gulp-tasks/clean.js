import del  from 'del';


// DIRECTORY CLEAN
// ---------------

// Delete the "dist" folder
// This happens every time a build starts
module.exports = function(options) {
	return function(done) {
		return del([ options.PATHS.dist ]);
	};
};
