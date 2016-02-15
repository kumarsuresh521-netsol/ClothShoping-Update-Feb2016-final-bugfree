(function() {
    'use strict';

    settingsModule
        .config(function($stateProvider) {

            $stateProvider
                .state('app.settings', {
                    url: '/settings',
                    views: {
                'menuContent' :{
                    templateUrl: 'components/Settings/settings.html'
                         }
            },
                    
                })
        });
})();