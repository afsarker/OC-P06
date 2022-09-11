let id = new URLSearchParams(location.search).get('id');
console.log(id);

async function getPhotographersFromApi() {
    const photographersApi = new PhotographersApi("/Projet-6/data/photographers.json");

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
        }
    }

    // ouvre et ferme le formulaire 
    const contactForm = document.getElementById('contact-form');
    const closeForm = document.getElementById('close-form');

    contactForm.addEventListener('click', () => {
        displayModal();
    });
    closeForm.addEventListener('click', () => {
        closeModal();
    });
};

async function init() {
    const photographers = await getPhotographersFromApi();
    displayData(photographers);
};

init();