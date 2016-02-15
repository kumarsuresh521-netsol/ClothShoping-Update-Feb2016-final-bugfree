(function() {
    'use strict';
    menuModule
        .config(function($stateProvider) {
            $stateProvider
                 .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'components/Menu/menu.html'
        //controller: 'AppCtrl'
      });
        });
})();