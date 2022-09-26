/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function photographerFactory(data) {

	const { id, city, country, name, portrait, price, tagline } = data;

	const picture = `assets/photographers/Photographers-ID-Photos/${portrait}`;

	function createUserCard() {
		return article = ` 	<article  aria-label="profil de ${name}">
								<a href="photographer.html?id=${id}" aria-label="voir le profil de ${name}" id="profil-link-${id}" class="profil-link">
									<div class="reflect">
										<img src="${picture}" alt="Photo de ${name}" aria-label="Photo de ${name}"/>
									</div>
									<h2>${name}</h2>
								</a>
								<p class="localisation">${city}, ${country}</p>
								<p class="tagline">${tagline}</p>
								<p class="price">${price}€/jour</p>
							</article> `;
	}

	function getUserInfos() {
		return article = `<div class="infos">
								<h2 class="title2" role="heading" aria-level="2">${name}</h2>
								<div class="localisation-tagline">
									<p class="localisation">${city}, ${country}</p>
									<p class="tagline">${tagline}</p>
								</div>
							</div>
							<button class="contact_button" id="contact-button" role="button" aria-label="Formulaire de contact de ${name}" tabindex="0">Contactez-moi</button>
							<img src="${picture}" alt="Photo de ${name}" /> `;
	}

	return { city, country, name, portrait, price, tagline, picture, createUserCard, getUserInfos };
}