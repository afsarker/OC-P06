function photographerFactory(data) {
    const { id, city, country, name, portrait, price, tagline } = data; // pas compris
    console.log(data);

    const picture = `assets/photographers/Photographers-ID-Photos/${portrait}`;

    function createUserCard() {
        return article = ` 	<article>
                                <a href="photographer.html?id=${id}">
                                    <img src="${picture}" alt="Photo de ${name}" tabindex="0">
                                    <h2 tabindex="0">${name}</h2>
								</a>
								<p class="localisation" tabindex="0">${city}, ${country}</p>
								<p tabindex="0">${tagline}</p>
								<p class="price" tabindex="0">${price}€/jour</p>
							</article>  
                              `;

        // const article = document.createElement("article");
        // const img = document.createElement("img");
        // img.setAttribute("src", picture);
        // img.setAttribute("alt", `Photo de ${name}`);
        // const h2 = document.createElement("h2");
        // h2.innerHTML = `<a href="photographer.html?id=${id}">${name}</a>`;
        // // const [localisation, tagline, price] = [0,1,2].map(() => document.createElement("p"));
        // const localisation = document.createElement("p");
        // localisation.classList.add('localisation');
        // localisation.textContent = `${city}, ${country}`;
        // const taglineLabel = document.createElement("p");
        // taglineLabel.textContent = tagline;
        // const priceLabel = document.createElement("p");
        // priceLabel.classList.add('price');
        // priceLabel.textContent = `${price}€/jour`;
        // article.appendChild(img);
        // article.appendChild(h2);
        // article.appendChild(localisation);
        // article.appendChild(taglineLabel);
        // article.appendChild(priceLabel);
        // article.insertAdjacentHTML('afterbegin', `<a href="photographer.html?id=${id}">`);
        // article.insertAdjacentHTML('beforeend', '<a href="toto">');

        // return article;
    }
    // return {getUserCardDOM};

    function getUserInfos() {
        return article = `<div class="infos">
							<h2 tabindex="0">${name}</h2>
							<p class="localisation" tabindex="0">${city}, ${country}</p>
							<p tabindex="0">${tagline}</p>
							<p class="price" tabindex="0">${price}€/jour</p> 
						</div>
						<button class="contact_button" id="contact-button" tabindex="0">Contactez-moi</button>
						<img src="${picture}" alt="Photo de ${name}">
						`;
    }
    return { city, country, name, portrait, price, tagline, picture, createUserCard, getUserInfos };
}