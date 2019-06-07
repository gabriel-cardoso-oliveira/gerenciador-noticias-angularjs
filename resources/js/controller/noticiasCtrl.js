function noticiasCtrl($scope, constants, conect, $filter, $rootScope) {

    let URL;
    $scope.flegNoticia = {
        titulo: 'Adicionar Notícia',
        acao: 1
    }

    init();

    function init() {
        URL = constants.URL_API();

        getNoticias();
    }

    function getNoticias() {
        conect.conectar('GET', URL, null, data => {
            $scope.noticias = data;
        }, error => {
            console.error('ERROR', error);
        });
    }

    $scope.adicionarNoticas = () => {
        let valores = {
            titulo: $scope.titulo,
            texto: $scope.texto
        }
        conect.conectar('POST', URL, valores, data => {
            getNoticias();
            limparVariaveis();
            $('#modalNoticia').modal('hide');
        }, error => {
            console.error('ERROR', error);
        });
    }

    $scope.modalEditar = id => {
        $scope.flegNoticia.titulo = 'Editar Notícia'
        $scope.flegNoticia.acao = 0;
        $scope.idNoticia = id;
        conect.conectar('GET', `${URL}/${id}`, null, data => {
            $scope.titulo = data[0].titulo_noticia;
            $scope.texto = data[0].texto_noticia;
            $('#modalNoticia').modal('show');
        }, error => {
            console.error('ERROR', error);
        })
    }

    $scope.editarNoticia = () => {
        let valores = {
            titulo: $scope.titulo,
            texto: $scope.texto,
            id: $scope.idNoticia
        }

        conect.conectar('PUT', URL, valores, data => {
            getNoticias();
            limparVariaveis();
            $('#modalNoticia').modal('hide');
        }, error => {
            console.error('ERROR', error);
        });
    }

    $scope.modalDeletar = id => {
        $scope.idNoticia = id;
        $('#modalAviso').modal('show');
    }

    $scope.deletarNoticia = () => {
        let id = { id: $scope.idNoticia }

        conect.conectar('DELETE', URL, id, data => {
            getNoticias();
            $('#modalAviso').modal('hide');
        }, error => {
            console.error('ERROR', error);
        });
    }

    function limparVariaveis() {
        $scope.titulo = '';
        $scope.texto = '';
        $scope.flegNoticia.titulo = 'Adicionar Notícia'
        $scope.flegNoticia.acao = 1;
    }

    $rootScope.gerarArquivoXml = () => {

        let data = new Date();
        let dataNoticias = $filter('date')(new Date(data), 'dd-MM-yyyy HH:mm:ss', false);
        let corpo = '';

        $scope.noticias.forEach((value, key) => {
            if (key < 3) {
                corpo += `\t<noticia titulo="${value.titulo_noticia}"\n\ttexto="${value.texto_noticia}"\n\timagem="img.jpg" criado="${value.data}" />\n`;
            }
        })

        let arquivo = [
            `<?xml version="1.0" encoding="iso-8859-1"?>\n<noticias criado="${dataNoticias}">\n${corpo}\n</noticias>`
        ]

        let blob = new Blob(arquivo, { type: "text/plain;charset=utf-8" });
        saveAs(blob, "noticias.xml");
    }

    $rootScope.gerarArquivoJson = () => {

        let corpo = $scope.noticias.filter((value, key) => {
            return key < 3;
        })

        let arquivo = JSON.stringify(corpo);

        let blob = new Blob([arquivo], { type: "application/json" });
        saveAs(blob, "noticias.json");
    }
}

angular
    .module('noticias')
    .controller('noticiasCtrl', noticiasCtrl);