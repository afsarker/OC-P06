// eslint-disable-next-line no-unused-vars
class PhotographersApi {
    /**
     *
     * @param {string} url
     */
    constructor(url) {
        this.url = url;
    }

    async getPhotographersInfos() {
        return fetch(this.url)
            .then(res => res.json())
            .then(res => res.photographers)
            .catch(err => console.log('an error occurs', err));
    }

    async getPhotographersMedias() {
        return fetch(this.url)
            .then(res => res.json())
            .then(res => res.media)
            .catch(err => console.log('an error occurs', err));
    }
}