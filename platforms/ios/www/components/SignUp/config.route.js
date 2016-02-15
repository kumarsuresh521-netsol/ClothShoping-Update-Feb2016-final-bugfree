(function() {
    'use strict';

    signupModule
        .config(function($stateProvider) {

            $stateProvider
                .state('app.signup', {
                    url: '/signup',
                    views: {
                'menuContent' :{
                    templateUrl: 'components/SignUp/signup.html'
                }
            }
                })
        });
})();