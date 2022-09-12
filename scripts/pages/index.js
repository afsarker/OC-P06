//récupere les données du json, les fetch, et renvoi la data (photographers) via PhotographersApi
async function getPhotographersFromApi() {
    const photographersApi =  new PhotographersApi("/data/photographers.json");
    
    const photographers = await photographersApi.getPhotographerInfos();

    return photographers;
}

// pour chaque photographe; on cree une card via createUserCard() de la factory
async function displayPhotographers(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    
    photographers.forEach(photographer => {
        const photographerModel = photographerFactory(photographer);
        console.log(photographerModel);
        const userCard = photographerModel.createUserCard();
        photographersSection.innerHTML += userCard;
    });
};

// récupere les données de l'api, et les affiche
async function init() {
    const photographers = await getPhotographersFromApi();
    displayPhotographers(photographers);
};

// on execute la fonction
init();