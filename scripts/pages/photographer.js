const id = new URLSearchParams(location.search).get('id');
const nameTitle = document.getElementById('name');

console.log(id);

async function getPhotographersFromApi() {
    const photographersApi = new PhotographersApi("/data/photographers.json");

    const photographers = await photographersApi.getPhotographerInfos();

    return photographers;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");
    for (let i = 0; i < photographers.length; i++) {
        //affiche les infos du photographe demandé seulement
        if (photographers[i].id == id) {
            console.log(photographers[i])

            const photographerModel = photographerFactory(photographers[i]);
            const userCardDOM = photographerModel.getUserInfos();
            photographersSection.innerHTML += userCardDOM;
            nameTitle.innerText += (photographers[i].name)
        }
    }

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
};

async function init() {
    const photographers = await getPhotographersFromApi();
    displayData(photographers);
};

init();

const form = document.getElementById('form');
form.addEventListener('submit', e => {
    e.preventDefault();
})