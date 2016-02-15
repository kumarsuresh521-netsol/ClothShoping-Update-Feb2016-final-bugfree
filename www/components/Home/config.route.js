(function() {
    'use strict';
    homeModule
        .config(function($stateProvider) {
            $stateProvider
                .state('app.home', {
                    cache:'false',
                    url: '/home:/:category_id/:category_name',

                    views: {
                'menuContent' :{
                    templateUrl: 'components/Home/home.html'
                         }
            }
                })
        });
})();


                    
           