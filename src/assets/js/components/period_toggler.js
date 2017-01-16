// Period toggler
module.exports = ()=>{
	let toggles = document.getElementsByClassName('js_period-toggle'),
			switcher = document.querySelector('.js_period-more');

	for (let i = toggles.length; i--;) {
		let toggle = toggles[i];

		toggle.addEventListener('change', (e)=>{
			if (e.target.value == 'new') {
				switcher.style.visibility = 'visible'
				switcher.style.opacity = '1';
			} else {
				switcher.style.opacity = '0';
				setTimeout(()=>{switcher.style.visibility = 'hidden'}, 500)
			}
		});
	}
};
