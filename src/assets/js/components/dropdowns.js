// Dropdowns
module.exports = ()=>{
	let dropdowns = document.getElementsByClassName('js_dropdown');

	for (let i = dropdowns.length; i--;) {
		let dropdown = dropdowns[i],
				droplist = dropdown.querySelector('.js_dropdown-list');

		droplist.setAttribute('data-initial-height', droplist.offsetHeight);
		droplist.style.height = '0';


		dropdown.addEventListener('click', (e)=>{
			let elem = e.currentTarget,
					elemlist = elem.querySelector('.js_dropdown-list');

			if (elem.classList.contains('is-active')) {
				elem.classList.remove('is-active');
				elemlist.style.height = '0';

			} else {
				elem.classList.add('is-active');
				elemlist.style.height = elemlist.getAttribute('data-initial-height') + 'px';
			}
		});

		droplist.addEventListener('click', (e)=>{
			let elem = e.currentTarget,
					dropdown = elem.parentElement;

			if (e.target.classList.contains('js_dropdown-link')) {
				dropdown.querySelector('.js_dropdown-text').textContent = e.target.textContent;
				dropdown.classList.remove('is-active');
				elem.style.height = '0';
			}
		});
	}
};
