const id = new URLSearchParams(location.search).get('id');
const nameTitle = document.getElementById('name');
const medias = [];
let allLikes = 0;

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
            const price = photographerModel.price;
            const priceElement = document.getElementById('price');
            priceElement.innerText = `${price}€ / jour`;
        }
        //affiche ses medias
        if (photographers[i].photographerId == id) {
            const photographerMedia = mediaFactory(photographers[i]);
            const projectCard = photographerMedia.createProjectsCard();
            content.innerHTML += projectCard;
            medias.push(photographerMedia.video || photographerMedia.image)
            allLikes += photographerMedia.likes;
        }
    };

    //affichage des likes
    const likeElements = document.querySelectorAll(`p.likes`);
    const TotalikesElement = document.getElementById('likes');
    TotalikesElement.innerHTML = `${allLikes} <i class="fa-solid fa-heart full-heart">`;
    likeElements.forEach(element => {
        let count = 0;
        element.addEventListener('click', () => {
            count++
            if (count == 1) { //permet d'incrementer le like une seule fois par media
                element.querySelector('span').innerText++
                allLikes++
                TotalikesElement.innerHTML = `${allLikes} <i class="fa-solid fa-heart full-heart">`;
            }
        })
    })
}

async function init() {
    const allInfos = await getPhotographersAllInfos();
    displayData(allInfos);

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
            hide(lightboxVideo);
            show(lightbox);
            show(lightboxImage);
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            const imgpath = image.src.split('/');
            const imgName = imgpath[imgpath.length - 1];
            index = medias.indexOf(imgName);
        })
    })
    videos.forEach(video => {
        video.addEventListener('click', () => {
            hide(lightboxImage);
            show(lightboxVideo);
            lightbox.style.display = "block";
            const LightboxVideoSrc = document.querySelector('video source');
            lightboxVideo.appendChild(LightboxVideoSrc);
        })
    })

    //slider 
    previousMedia.addEventListener('click', () => {
        slider(-1);
    })
    nextMedia.addEventListener('click', () => {
        slider(1);
    })
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
const LightboxVideoSrc = document.querySelector('video source');
closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
})

//slider 
let index = 0;
function slider(sens) {
    index += sens;
    if ((index) < 0) {
        index = medias.length - 1;
    }
    if (index > medias.length - 1) {
        index = 0;
    }
    if (medias[index].includes('jpg')) {
        hide(lightboxVideo);
        show(lightboxImage);
        lightboxImage.src = `/assets/photographers/${id}/${medias[index]}`;
    } else {
        hide(lightboxImage);
        show(lightboxVideo);
        const LightboxVideoSrc = document.querySelector('video source');
        lightboxVideo.appendChild(LightboxVideoSrc);
        LightboxVideoSrc.src = `/assets/photographers/${id}/${medias[index]}`;
    }

}

function hide(element) {
    element.style.display = "none";
}
function show(element) {
    element.style.display = "block";
}