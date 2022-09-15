function photographerFactory(data) {
	const { id, city, country, name, portrait, price, tagline } = data; // pas compris
	//  console.log(data);

	const picture = `assets/photographers/Photographers-ID-Photos/${portrait}`;

	function createUserCard() {
		return article = ` 	<article  aria-label="profil de ${name}">
							  <a href="photographer.html?id=${id}" aria-label="voir le profil de ${name}" id="profil-link-${id}" class="profil-link">
								  <div class="reflect">
									  <img src="${picture}" alt="Photo de ${name}" aria-label="Photo de ${name}" tabindex="0" />
								  </div>
								  <h2 tabindex="0">${name}</h2>
							  </a>
							  <p class="localisation" tabindex="0">${city}, ${country}</p>
							  <p tabindex="0">${tagline}</p>
							  <p class="price" tabindex="0">${price}€/jour</p>
						  </article> `;
	}

	function getUserInfos() {
		return article = `<div class="infos">
							  <h2 class="title2" role="heading" aria-level="2ar" tabindex="0">${name}</h2>
							  <div class="localisation-tagline">
								  <p class="localisation" tabindex="0">${city}, ${country}</p>
								  <p class="tagline" tabindex="0">${tagline}</p>
							  </div>
						  </div>
						  <button class="contact_button" id="contact-button" role="button" aria-label="Contactez-moi" tabindex="0">Contactez-moi</button>
						  <img src="${picture}" alt="Photo de ${name}" /> `;
	}
	// return {getUserCardDOM};
	return { city, country, name, portrait, price, tagline, picture, createUserCard, getUserInfos };
}