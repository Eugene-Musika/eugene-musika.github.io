import panini             from 'panini';


// HTML TEMPLATE COMPILER (pages update)
// -------------------------------------

// Load updated HTML templates and partials into Panini
module.exports = function(options) {
	return (done)=>{
		panini.refresh();
		done();
	};
};