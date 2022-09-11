class Api {
    /**
     *
     * @param {string} url
     */
    constructor(url) {
        this.url = url;
    }

    async get() {
        return fetch(this.url)
            .then(res => res.json())
            .then(res => res.photographers)
            .catch(err => console.log("an error occurs", err));
    }
}

class PhotographersApi extends Api {
    /**
     *
     * @param {string} url
     */
    constructor(url) {
        super(url);
    }

    async getPhotographerInfos() {
        return await this.get();
    }
}