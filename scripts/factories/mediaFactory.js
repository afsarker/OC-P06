/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data; // pas compris

    const picture = `assets/photographers/${photographerId}/${image}`;
    const vid = `assets/photographers/${photographerId}/${video}`;

    function createProjectsCard() {
        if (data.image) {
            return article = ` 	<article aria-label="${title}">
									<img src="${picture}" alt="${title}" aria-label="${title}" tabindex="0" />
									<div class="content-infos">
										<h2 class="title">${title}</h2>
										<p class="likes" tabindex="0"><span>${likes}</span> <i class="fa-solid fa-heart full-heart"></i></p>
									</div>
								</article>`;
        } else {
            return article = `  <article aria-label="${title}">
									<video controls tabindex="0" />
										<source src="${vid}" type="video/mp4">
										Sorry, your browser doesn't support embedded videos.
									</video>
									<div class="content-infos">
										<h2 class="title" tabindex="0">${title}</h2>
										<p class="likes" tabindex="0"><span>${likes}</span> <i class="fa-solid fa-heart full-heart"></i></p>
									</div>
								</article>`;
        }
    }
    return { id, photographerId, title, image, video, likes, date, price, createProjectsCard };
}