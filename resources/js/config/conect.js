function conect($http) {
    return {
        conectar: function(method, url, dados, callback_success, callback_error) {
            console.log(method + " " + url);
            $http({
                    url: url,
                    method: method,
                    data: dados
                })
                .success(callback_success)
                .error(callback_error);
        }
    }
}

angular
    .module('noticias')
    .factory('conect', conect);