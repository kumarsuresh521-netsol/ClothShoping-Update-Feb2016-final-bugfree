(function() {
    'use strict';
    productModule
        .config(function($stateProvider) {
            $stateProvider
                .state('app.product', {
                    cache: 'false',
                    url: '/product:product_id',
                    views: {
                    'menuContent' :{
                        templateUrl: 'components/Product/product.html'
                             }
                    },
                })
                .state('app.productsCompare', {
                    cache: 'false',
                    url: '/productsCompare',
                    views: {
                    'menuContent' :{
                        templateUrl: 'components/Product/productsCompare.html'
                             }
                    },
                })
        });
})();