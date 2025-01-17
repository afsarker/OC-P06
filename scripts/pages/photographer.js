/*global PhotographersApi, photographerFactory, mediaFactory, displayModal, closeModal*/

const id = new URLSearchParams(location.search).get('id');

const main = document.querySelector('main');
const content = document.querySelector('.photograph-content');
const nameTitle = document.getElementById('name');

const popularity = document.querySelector('#customselect-close');
const date = document.querySelector('#customselect-date');
const titre = document.querySelector('#customselect-titre');

let mediaTitles = [];
let imgNames = [];
let allLikes = 0;

/*****************************************************************************************/
// getPhotographersAllInfos fetch les donnees puis retourne allInfos et photographerMedias
/*****************************************************************************************/
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

    photographerMedias.forEach(media => {
        imgNames.push(media.title);
    });

    return { allInfos, photographerMedias };
}


/*****************************************************************************************/
// displayData va afficher la data (en parametre) et la formater selon les factories
/*****************************************************************************************/
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
            if (count === 2) {// permet de décrementer le like une seule fois par media
                element.querySelector('span').innerText--;
                allLikes--;
                TotalikesElement.innerHTML = `${allLikes} <i class="fa-solid fa-heart full-heart">`;
                count = 0;
            }
        });
    });
    // ouvre et ferme le formulaire
    const contactForm = document.getElementById('contact-button');
    const closeForm = document.getElementById('close-form');
    const modal = document.getElementById('modal');

    contactForm.addEventListener('click', () => {
        displayModal();
        modal.focus();
    });
    closeForm.addEventListener('click', () => {
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
            // la touche echape sur le formulaire ferme la lightbox
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

}

/*****************************************************************************************/
// init exectute displayData lors du chargement de la page et aussi en lors du tri 
/*****************************************************************************************/
async function init() {

    const { allInfos } = await getPhotographersAllInfos();

    displayData(allInfos);

    applyFilter();

}

init();


//------------------------//------------------------//------------------------//------------------------//
//----------------- --------------------------    Lightbox    ------------------------------------------//
//------------------------//------------------------//------------------------//------------------------//

const lightbox = document.getElementById('lightbox');
const closeLightbox = document.querySelector('#lightbox .close');
const previousMedia = document.getElementById('previous-media');
const nextMedia = document.getElementById('next-media');
const lightboxImage = document.querySelector('#img');
const lightboxVideo = document.querySelector('#video');
const mediaTitle = document.getElementById('media-lightbox-title');

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
// changement de media au clavier dans la lightbox 
lightbox.addEventListener('keydown', (e) => {
    if (e.keyCode === 39) { // Fleche droite clavier
        slider(1);
    } else if (e.keyCode === 37) { // gauche
        slider(-1);
    }
});


function displayLightboxImage() {

    const images = document.querySelectorAll('.photograph-content img');
    images.forEach(image => {
        image.addEventListener('click', () => {
            hide(main);
            hide(lightboxVideo);
            show(lightbox);
            show(lightboxImage);
            mediaTitle.innerText = image.alt;
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            const imgpath = image.src.split('/');
            const imgName = imgpath[imgpath.length - 1];
            index = mediaTitles.indexOf(imgName);
            closeLightbox.focus();
        });
    });
    preventSpace();
}

async function displayLightboxVideo() {

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
            mediaTitle.innerText = imgNames[index];
            closeLightbox.focus();
        });
    });
}

//------------------------//------------------------//------------------------//------------------------//
//----------------- ----------------------------    Slider    ------------------------------------------//
//------------------------//------------------------//------------------------//------------------------//

let index = 0;
async function slider(sens) {

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
        mediaTitle.innerText = imgNames[index];
    } else {
        hide(lightboxImage);
        show(lightboxVideo);
        const LightboxVideoSrc = document.querySelector('video source');
        lightboxVideo.appendChild(LightboxVideoSrc);
        LightboxVideoSrc.src = `./assets/photographers/${id}/${mediaTitles[index]}`;
        mediaTitle.innerText = imgNames[index];
    }
}

function hide(element) {
    element.style.display = 'none';
}
function show(element) {
    element.style.display = 'block';
}

//------------------------//------------------------//------------------------//------------------------//
//----------------- Gestion des touches entrée et espace lors de la navigation au clavier --------------//
//------------------------//------------------------//------------------------//------------------------//

function preventSpace() {
    const links = document.querySelectorAll('a');
    const medias = document.querySelectorAll('.photograph-content img, .photograph-content video');
    const tabindex = document.querySelectorAll('[tabindex]');

    const clickableElements = [...links, ...medias, ...tabindex];

    clickableElements.forEach((clickableElement) => {
        clickableElement.addEventListener('keypress', e => {
            if (e.keyCode === 32 || e.keyCode === 13) {   // 32=>espace ; 13=> entrée 
                e.preventDefault();
                e.target.click();
            }
        });
    });
}


//------------------------//------------------------//------------------------//------------------------//
//----------------- -----------------------    Fonctions de tri   --------------------------------------//
//------------------------//------------------------//------------------------//------------------------//

async function applyFilter() {

    const { photographerMedias } = await getPhotographersAllInfos();
    popularity.addEventListener('click', () => {
        removeAllChildNodes(content);
        mediaTitles.sort(byPopularity);
        photographerMedias.sort(byPopularity);
        pushMediaNamesSorted(photographerMedias);
        displayData(photographerMedias);
        displayLightboxImage();
        displayLightboxVideo();
        preventSpace();
    });
    date.addEventListener('click', () => {
        removeAllChildNodes(content);
        mediaTitles.sort(byDate);
        photographerMedias.sort(byDate);
        pushMediaNamesSorted(photographerMedias);
        displayData(photographerMedias);
        displayLightboxImage();
        displayLightboxVideo();
        preventSpace();
    });
    titre.addEventListener('click', () => {
        removeAllChildNodes(content);
        mediaTitles.sort(byTitle);
        photographerMedias.sort(byTitle);
        pushMediaNamesSorted(photographerMedias);
        displayData(photographerMedias);
        displayLightboxImage();
        displayLightboxVideo();
        preventSpace();
    });
}

function byPopularity(a, b) {
    if (a.likes < b.likes) {
        return 1;
    } else if (a.likes > b.likes) {
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

function pushMediaNamesSorted(photographerMedias) {
    imgNames = [];
    photographerMedias.forEach(media => {
        imgNames.push(media.title);
    });
}

function removeAllChildNodes(parent) {
    mediaTitles = [];
    allLikes = 0;
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//combobox tri
const opener = document.getElementById('opener');
const poplabel = document.getElementById('pop');
const datelabel = document.getElementById('date');
const titrelabel = document.getElementById('titre');
opener.addEventListener('click', () => {
    poplabel.setAttribute('tabindex', 0);
    datelabel.setAttribute('tabindex', 0);
    titrelabel.setAttribute('tabindex', 0);
    preventSpace();
});
const labels = [poplabel, datelabel, titrelabel];
labels.forEach(label => {
    label.addEventListener('click', () => {
        poplabel.setAttribute('tabindex', -1);
        datelabel.setAttribute('tabindex', -1);
        titrelabel.setAttribute('tabindex', -1);
    });
});