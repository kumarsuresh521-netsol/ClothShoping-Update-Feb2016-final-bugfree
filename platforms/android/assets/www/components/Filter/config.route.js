(function() {
    'use strict';

    filterModule
        .config(function($stateProvider) {

            $stateProvider
                .state('app.filter_old', {
                    url: '/filter',
                    views: {
                'menuContent' :{
                    templateUrl: 'components/Filter/filter.html'
                }
            }
                })
        });
})();