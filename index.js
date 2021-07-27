// Notify open API
const API = 'http://api.open-notify.org/astros.json';
// button select
const button = document.querySelector('button');

// fetch the Notify API
fetch(API).then((e) =>
	e.json().then(function (data) {
		let Astronoids = [];
		Astronoids.push(...data['people']);

		viewAstro(Astronoids);
	})
);

const viewAstro = (Astronoids) => {
	function template() {
		button.innerText = 'loading.....';
		for (let i = 0; i < Astronoids.length; i++) {
			// wikipedia Rest API
			const wikiaAPI = `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${Astronoids[i].name}&limit=1`;

			fetch(wikiaAPI)
				.then((e) =>
					e.json().then(function (data) {
						// console.log(data['pages'][0]['description']);

						const templateHTML = `
						<div class="astro-container">
						<div class="img-astro">
						<img src="${data['pages'][0]['thumbnail']['url']}" alt="" />
						</div>
						<div class="astro-info">
							<div class="name">
								<div class="fullname">
								<span class="fname">${Astronoids[i].name}</span>
								<span class="description">${data['pages'][0]['description']}</span>
								</div>
								<div class="craft">${Astronoids[i].craft}</div>
							</div>
							<div class="text">
							<div class="text">${data.pages[0]['excerpt']}</div></div>
						</div>
					</div>
						`;

						document
							.querySelector('h1')
							.insertAdjacentHTML('afterend', templateHTML);
					})
				)
				.catch((err) => console.log(err))
				.finally(() => button.innerText.remove());
		}
	}
	button.addEventListener('click', template);
};
