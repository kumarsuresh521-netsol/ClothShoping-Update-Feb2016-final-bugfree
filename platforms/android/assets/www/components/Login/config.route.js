(function() {
    'use strict';
    loginModule
        .config(function($stateProvider) {
            $stateProvider
                .state('app.login', {
                    url: '/login:route',
                    views: {
                        'menuContent' :{
                            templateUrl: 'components/Login/login.html'
                                 }
                        }
                })
                .state('app.forgotPassword', {
                    url: '/forgotPassword',
                    views: {
                        'menuContent' :{
                            templateUrl: 'components/Login/forgotPassword.html'
                                 }
                        }
                })
        });
})();