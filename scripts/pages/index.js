//récupere les données du json, les fetch, et renvoi la data (photographers) via PhotographersApi
async function getPhotographersInfos() {
    const photographersApi = new PhotographersApi("/data/photographers.json");

    const photographersInfos = await photographersApi.getPhotographersInfos();

    return photographersInfos;
}

// pour chaque photographe; on cree une card via createUserCard() de la factory
async function displayData(photographersInfos) {
    const photographersSection = document.querySelector(".photographer_section");

    photographersInfos.forEach(photographer => {
        const photographerModel = photographerFactory(photographer);
        // console.log(photographerModel);
        const userCard = photographerModel.createUserCard();
        photographersSection.innerHTML += userCard;
    });
};

// récupere les données de l'api, et les affiche
async function init() {
    const photographersInfos = await getPhotographersInfos();

    displayData(photographersInfos);

    preventSpace()
};

// on execute la fonction init
init();

// empêche de faire le scroll par default lorsque l'on clique sur la touche
// espace pour les liens (logo et profils)
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