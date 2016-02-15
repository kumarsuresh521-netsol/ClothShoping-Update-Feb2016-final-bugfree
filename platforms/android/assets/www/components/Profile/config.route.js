(function() {
    'use strict';

    profileModule
        .config(function($stateProvider) {

            $stateProvider
                .state('app.profile', {
                    url: '/profile',
                    views: {
                        'menuContent' :{
                            templateUrl: 'components/Profile/profile.html'
                         }
                    }
                })

                .state('app.myorder', {
                    url: '/myorder',
                    views: {
                        'menuContent' :{
                            templateUrl: 'components/Profile/myorder.html'
                         }
                    }
                })

                .state('app.wishlist', {
                    url: '/wishlist',
                    views: {
                        'menuContent' :{
                            templateUrl: 'components/Profile/wishlist.html'
                         }
                    }
                })

                .state('app.changepassword', {
                    url: '/changepassword',
                    views: {
                        'menuContent' :{
                            templateUrl: 'components/Profile/changepassword.html'
                         }
                    }
                })

                .state('app.myorderdetail', {
                    url: '/myorderdetail:orderId',
                    views: {
                        'menuContent' :{
                            templateUrl: 'components/Profile/myorderdetail.html'
                         }
                    }
                })
        });
})();