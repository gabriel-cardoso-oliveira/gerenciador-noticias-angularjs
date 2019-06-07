function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/noticias/home");

    $stateProvider
        .state('noticias', {
            abstract: true,
            url: "/noticias",
            templateUrl: "./resources/views/comum/content.html"
        })
        .state('noticias.home', {
            url: "/home",
            templateUrl: "./resources/views/home.html",
            controller: noticiasCtrl,
            data: { pageTitle: 'Home' }
        });
}

angular
    .module('noticias')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });