(function() {
    'use strict';

    passwordModule
        .config(function($stateProvider) {

            $stateProvider
                .state('app.password', {
                    url: '/password',
                    views: {
                'menuContent' :{
                    templateUrl: 'components/Password/password.html'
                         }
            },
                    
                })
        });
})();