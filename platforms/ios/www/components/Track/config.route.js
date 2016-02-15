(function() {
    'use strict';

    trackModule
        .config(function($stateProvider) {

            $stateProvider
                .state('app.track', {
                    url: '/track',
                    views: {
                'menuContent' :{
                    templateUrl: 'components/Track/track.html'
                         }
            },
                    
                })
        });
})();