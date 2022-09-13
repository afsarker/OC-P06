const id = new URLSearchParams(location.search).get('id');
const nameTitle = document.getElementById('name');
const medias = [];


async function getPhotographersAllInfos() {
    const photographersApi = new PhotographersApi("/data/photographers.json", 'photographers');

    const photographersInfos = await photographersApi.getPhotographersInfos();
    const photographersMedias = await photographersApi.getPhotographersMedias();
    let allInfos = photographersInfos.concat(photographersMedias);

    return allInfos;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");
    const content = document.querySelector('.photograph-content');

    for (let i = 0; i < photographers.length; i++) {
        //affiche les infos du photographe demandé seulement
        if (photographers[i].id == id) {

            const photographerModel = photographerFactory(photographers[i]);
            const userCard = photographerModel.getUserInfos();
            photographersSection.innerHTML += userCard;
            nameTitle.innerText += (photographers[i].name);

        }
        if (photographers[i].photographerId == id) {
            const photographerMedia = mediaFactory(photographers[i]);
            const projectCard = photographerMedia.createProjectsCard();
            content.innerHTML += projectCard;
            medias.push(photographerMedia.video || photographerMedia.image)
        }
    };
}

async function init() {
    const allInfos = await getPhotographersAllInfos();
    displayData(allInfos);
    // displayData(allInfos.photographersMedias);
    console.log(allInfos);

    // ouvre et ferme le formulaire 
    const contactForm = document.getElementById('contact-button');
    const closeForm = document.getElementById('close-form');
    const modal = document.getElementById('modal');

    contactForm.addEventListener('click', () => {
        displayModal();
    });
    closeForm.addEventListener('click', () => {
        closeModal();
    });
    modal.addEventListener('keyup', (e) => {
        if (e.keyCode == 27) { //la touche echape sur le formulaire ferme la modale
            closeModal();
        }
    });
    closeForm.addEventListener('keyup', (e) => {
        if (e.keyCode == 13) { //la touche entree sur l'icone ferme la modale
            closeModal();
        }
    });
    preventSpace();

    // Gestion de la lightbox
    const images = document.querySelectorAll('main img');
    const videos = document.querySelectorAll('main video');

    images.forEach(image => {
        image.addEventListener('click', () => {
            lightboxVideo.style.display = "none";
            lightboxImage.style.display = "block";
            lightbox.style.display = "block";
            // lightbox.insertAdjacentElement("afterbegin" ,image)
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
        })
    })
    videos.forEach(video => {
        video.addEventListener('click', () => {
            lightboxImage.style.display = "none";
            lightboxVideo.style.display = "block";
            lightbox.style.display = "block";
            const LightboxVideoSrc = document.querySelector('video source');
            console.log(video);
            console.log(LightboxVideoSrc);
            lightboxVideo.appendChild(LightboxVideoSrc)
        })
    })

    //slider 
    previousMedia.addEventListener('click', () => {
        if (medias[index].includes('jpg')) {
            slider(-1, lightboxImage);
        } else {
            slider(-1, LightboxVideoSrc);
        }
    })
    nextMedia.addEventListener('click', () => {
        if (medias[index].includes('jpg')) {
            slider(1, lightboxImage);
        } else {
            slider(1, LightboxVideoSrc);
        }
    })

    console.log(medias);

};

init();

// Gestion du submit
const form = document.getElementById('form');
form.addEventListener('submit', e => {
    const firstnameValue = document.getElementById('prenom').value;
    const lastnameValue = document.getElementById('nom').value;
    const emailValue = document.getElementById('email').value;
    const messageValue = document.getElementById('message').value;
    console.log({ firstnameValue, lastnameValue, emailValue, messageValue });
    e.preventDefault();
})

function preventSpace() {
    const links = document.querySelectorAll('a');
    links.forEach(profil => {
        profil.addEventListener('keypress', e => {
            if (e.keyCode == 32) { //la touche espace renvoi l'utilisateur vers la page demandée
                e.preventDefault();
                e.target.click();
            }
        });
    });
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const closeLightbox = document.querySelector('#lightbox .close');
const previousMedia = document.getElementById('previous-media')
const nextMedia = document.getElementById('next-media')
const lightboxImage = document.querySelector('#img');
const lightboxVideo = document.querySelector('#video');
closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
})
//slider 
let index = 0;
function slider(sens, media) {
    index += sens;
    if (index < 0) {
        index = medias.length - 1;
    }
    if (index > medias.length - 1) index = 0;
    media.src = `/assets/photographers/${id}/${medias[index]}`;
}