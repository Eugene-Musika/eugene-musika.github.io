// Navigation toggle
module.exports = () => {
	document.getElementById('nav-menu-mobile-button').addEventListener('change', (e)=>{
		if (e.target.checked) {
			document.querySelector('.js_top-menu').classList.add('is-active');
		} else {
			document.querySelector('.js_top-menu').classList.remove('is-active');
		}
	});
};
