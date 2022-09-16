/*global PhotographersApi, photographerFactory, mediaFactory, displayModal, closeModal*/

const id = new URLSearchParams(location.search).get('id');

const main = document.querySelector('main');
const content = document.querySelector('.photograph-content');
const nameTitle = document.getElementById('name');

const popularity = document.querySelector('#customselect-close');
const date = document.querySelector('#customselect-date');
const titre = document.querySelector('#customselect-titre');

let mediaTitles = [];
let allLikes = 0;

async function getPhotographersAllInfos() {
    const photographersApi = new PhotographersApi('./data/photographers.json', 'photographers');

    const photographersInfos = await photographersApi.getPhotographersInfos();
    const photographersMedias = await photographersApi.getPhotographersMedias();
    const photographerMedias = photographersMedias.filter(media => {
        if (id == media.photographerId) {
            return media;
        }
    });
    const allInfos = photographersInfos.concat(photographersMedias);

    return { allInfos, photographerMedias };
}

async function displayData(photographer) {
    const photographersSection = document.querySelector('.photograph-header');
    const content = document.querySelector('.photograph-content');

    for (let i = 0; i < photographer.length; i++) {
        // affiche les infos du photographe demandé seulement
        if (photographer[i].id == id) {
            const photographerModel = photographerFactory(photographer[i]);
            const userCard = photographerModel.getUserInfos();
            photographersSection.innerHTML += userCard;
            nameTitle.innerText += photographer[i].name;
            const price = photographerModel.price;
            const priceElement = document.getElementById('price');
            priceElement.innerText = `${price}€ / jour`;
        }
        // affiche ses medias
        if (photographer[i].photographerId == id) {
            const photographerMedia = mediaFactory(photographer[i]);
            const projectCard = photographerMedia.createProjectsCard();
            content.innerHTML += projectCard;
            mediaTitles.push(photographerMedia.video || photographerMedia.image);
            allLikes += photographerMedia.likes;
        }
    }
    // affichage des likes
    const likeElements = document.querySelectorAll('p.likes');
    const TotalikesElement = document.getElementById('likes');
    TotalikesElement.innerHTML = `${allLikes} <i class="fa-solid fa-heart full-heart">`;
    likeElements.forEach(element => {
        let count = 0;
        element.addEventListener('click', () => {
            count++;
            if (count === 1) {// permet d'incrementer le like une seule fois par media
                element.querySelector('span').innerText++;
                allLikes++;
                TotalikesElement.innerHTML = `${allLikes} <i class="fa-solid fa-heart full-heart">`;
            }
        });
    });
}

async function init() {
    const allInfos = await (await getPhotographersAllInfos()).allInfos;
    const photographerMedias = await (await getPhotographersAllInfos()).photographerMedias;

    displayData(allInfos);

    // ouvre et ferme le formulaire
    const contactForm = document.getElementById('contact-button');
    const closeForm = document.getElementById('close-form');
    const modal = document.getElementById('modal');

    contactForm.addEventListener('click', () => {
        main.setAttribute('aria-hidden', true);
        modal.setAttribute('aria-hidden', false);
        displayModal();
        modal.focus();
    });
    closeForm.addEventListener('click', () => {
        main.setAttribute('aria-hidden', false);
        modal.setAttribute('aria-hidden', true);
        closeModal();
    });
    modal.addEventListener('keyup', (e) => {
        if (e.keyCode === 27) {
            // la touche echape sur le formulaire ferme la modale
            closeModal();
        }
    });
    lightbox.addEventListener('keyup', (e) => {
        if (e.keyCode === 27) {
            // la touche echape sur le formulaire ferme la modale
            hide(lightbox);
            show(main);
        }
    });
    closeForm.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            // la touche entree sur l'icone ferme la modale
            closeModal();
        }
    });

    // Gestion de la lightbox
    displayLightboxImage();
    displayLightboxVideo();
    lightbox.focus();
    closeLightbox.focus();


    // Gestion des filtres
    popularity.addEventListener('click', () => {
        removeAllChildNodes(content);
        displayData(photographerMedias.sort(byPopularity));
        displayLightboxImage();
        displayLightboxVideo();
    });
    date.addEventListener('click', () => {
        removeAllChildNodes(content);
        displayData(photographerMedias.sort(byDate));
        displayLightboxImage();
        displayLightboxVideo();
    });
    titre.addEventListener('click', () => {
        removeAllChildNodes(content);
        displayData(photographerMedias.sort(byTitle));
        displayLightboxImage();
        displayLightboxVideo();
    });
}

init();

// Lightbox
const lightbox = document.getElementById('lightbox');
const closeLightbox = document.querySelector('#lightbox .close');
const previousMedia = document.getElementById('previous-media');
const nextMedia = document.getElementById('next-media');
const lightboxImage = document.querySelector('#img');
const lightboxVideo = document.querySelector('#video');
// icone X
closeLightbox.addEventListener('click', () => {
    hide(lightbox);
    show(main);
});
// chevrons du slider
previousMedia.addEventListener('click', () => {
    slider(-1);
});
nextMedia.addEventListener('click', () => {
    slider(1);
});

function displayLightboxImage() {

    const images = document.querySelectorAll('.photograph-content img');
    const lightbox = document.getElementById('lightbox');
    images.forEach(image => {
        image.addEventListener('click', () => {
            hide(main);
            hide(lightboxVideo);
            show(lightbox);
            show(lightboxImage);
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            const imgpath = image.src.split('/');
            const imgName = imgpath[imgpath.length - 1];
            index = mediaTitles.indexOf(imgName);
            closeLightbox.focus();
            // preventSpace();
        });
    });
    preventSpace();
}

function displayLightboxVideo() {
    const videos = document.querySelectorAll('.photograph-content video');
    videos.forEach((video) => {
        video.addEventListener('click', () => {
            hide(main);
            hide(lightboxImage);
            show(lightbox);
            show(lightboxVideo);
            const LightboxVideoSrc = document.querySelector('video source');
            lightboxVideo.appendChild(LightboxVideoSrc);
            const videopath = LightboxVideoSrc.src.split('/');
            const videoname = videopath[videopath.length - 1];
            index = mediaTitles.indexOf(videoname);
            closeLightbox.focus();
        });
    });
}

// slider
let index = 0;
function slider(sens) {
    index += sens;
    if (index < 0) {
        index = mediaTitles.length - 1;
    }
    if (index > mediaTitles.length - 1) {
        index = 0;
    }
    if (mediaTitles[index].includes('jpg')) {
        hide(lightboxVideo);
        show(lightboxImage);
        lightboxImage.src = `./assets/photographers/${id}/${mediaTitles[index]}`;
    } else {
        hide(lightboxImage);
        show(lightboxVideo);
        const LightboxVideoSrc = document.querySelector('video source');
        lightboxVideo.appendChild(LightboxVideoSrc);
        LightboxVideoSrc.src = `./assets/photographers/${id}/${mediaTitles[index]}`;
    }
}

function hide(element) {
    element.style.display = 'none';
}
function show(element) {
    element.style.display = 'block';
}

// Gestion des touches entrée et espace lors de la navigation au clavier

function preventSpace() {
    const links = document.querySelectorAll('a');
    const likes = document.querySelectorAll('p.likes');
    const medias = document.querySelectorAll('.photograph-content img, .photograph-content video');
    const tabindex = document.querySelectorAll('[tabindex]');

    const clickableElements = [...links, ...likes, ...medias, ...tabindex];

    clickableElements.forEach((clickableElement) => {
        clickableElement.addEventListener('keypress', e => {
            console.log(clickableElement);
            if (e.keyCode === 32 || e.keyCode === 13) {
                // les touches espace (32) et entrée (13) renvoient l'utilisateur vers la page demandée
                e.preventDefault();
                e.target.click();
                // index = mediaTitles.indexOf(clickableElement);
                console.log(lightbox.getElementsByTagName('img')[0].src);
                console.log(mediaTitles);
            }
        });
    });
}


// Fonctions de tri

function byPopularity(a, b) {
    if (a.likes > b.likes) {
        return 1;
    } else if (a.likes < b.likes) {
        return -1;
    } else {
        return 0;
    }
}
function byDate(a, b) {
    if (a.date > b.date) {
        return 1;
    } else if (a.date < b.date) {
        return -1;
    } else {
        return 0;
    }
}
function byTitle(a, b) {
    if (a.title > b.title) {
        return 1;
    } else if (a.title < b.title) {
        return -1;
    } else {
        return 0;
    }
}

// efface les medias avant le tri

function removeAllChildNodes(parent) {
    mediaTitles = [];
    allLikes = 0;
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}