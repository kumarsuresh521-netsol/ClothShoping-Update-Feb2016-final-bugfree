(function() {
    'use strict';
    cartModule
        .config(function($stateProvider) {
            $stateProvider
                .state('app.cart', {
                    url: '/cart',

                    views: {
                'menuContent' :{
                    templateUrl: 'components/Cart/cart.html'
                         }
            }
                })
        });
})();


                    
           