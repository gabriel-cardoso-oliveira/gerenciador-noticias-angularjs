function constants() {

    let URL_API = "api/noticias";

    return {
        URL_API: () => {
            return URL_API;
        }
    }
}

angular
    .module('noticias')
    .factory('constants', constants);