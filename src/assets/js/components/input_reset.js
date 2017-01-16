//Reset
module.exports = ()=>{
	let resets = document.getElementsByClassName('js_input-reset');

	for (let i = resets.length; i--;) {
		let reset = resets[i],
				input = reset.parentElement.querySelector('.js_input-reset__target');

		input.addEventListener('keyup', (e)=>{
			if (e.target.value) {
				reset.classList.add('is-active');
			} else {
				reset.classList.remove('is-active');
			}
		});

		reset.addEventListener('click', (e)=>{
			e.preventDefault();
			reset.classList.remove('is-active');
			input.focus();
			input.value = '';
		});
	}
};
