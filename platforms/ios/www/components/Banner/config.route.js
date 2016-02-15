(function() {
    'use strict';
    bannerModule
        .config(function($stateProvider) {
            $stateProvider
                .state('app.banner', {
                    url: '/banner',

                    views: {
                'menuContent' :{
                    templateUrl: 'components/Banner/banner.html'
                         }
            }
                })
        });
})();


                    
           