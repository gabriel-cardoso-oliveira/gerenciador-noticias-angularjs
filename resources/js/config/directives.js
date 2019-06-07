function pageTitle($rootScope, $timeout) {
    return {
        link: (scope, element) => {
            let listener = (event, toState, toParams, fromState, fromParams) => {
                let title = 'API BC';
                if (toState.data && toState.data.pageTitle) title = 'Gerenciador Notícias | ' + toState.data.pageTitle;
                $timeout(() => {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};


angular
    .module('noticias')
    .directive('pageTitle', pageTitle);