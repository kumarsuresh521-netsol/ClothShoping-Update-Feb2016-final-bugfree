       var cartSrvc;

cartSrvc = (function($log, $http, $q, constants) {

    
    var pd = this;
    pd.$log = $log;
    pd.$http = $http;
    pd.$q = $q;
    
    var cartSrvc ;
    
    //$log.debug("constructing cartSrvc");

    var cartSrvc = {
        showToastBanner: function(message, duration, position) {
            window.plugins.toast.showWithOptions(
            {
              message: message,
              duration: duration,
              position: position,
              addPixelsY: -40  // added a negative value to move it up a bit (default 0)
            }//,
            //onSuccess, // optional
            //onError    // optional
          );
        },
        
        getCartProducts: function(quoteId) {
            var deferred;
            //$log.debug("get globalCompanyFields service");
            ////console.log(username);
            deferred = pd.$q.defer();
            $http.post(constants.API_URL+'cart/getCartProducts', {
                    quoteId: quoteId 
                })
                .success((function(_this) {
                    return function(data, status) {
                        //$log.debug("globalCompanyFields " + (angular.toJson(data, true)));
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        //$log.error("Failed to product" + status);
                        //$log.error("Failed to product Service");
                        return deferred.reject(data);
                    };
                })(this));
           return deferred.promise;
        },
        
        getCartTotal: function(quoteId) {
            var deferred;
            //$log.debug("get globalCompanyFields service");
            ////console.log(username);
            deferred = pd.$q.defer();
            $http.post(constants.API_URL+'cart/getCartTotal', {
                    quoteId: quoteId 
                })
                .success((function(_this) {
                    return function(data, status) {
                        //$log.debug("globalCompanyFields " + (angular.toJson(data, true)));
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to product" + status);
                        $log.error("Failed to product Service");
                        return deferred.reject(data);
                    };
                })(this));
           return deferred.promise;
        },
//Update Cart..
        updateCartProducts: function(products, quoteId, customer_id) { //alert("hello");
            var deferred;
            deferred = pd.$q.defer();
            $http.post(constants.API_URL+'cart/updateProduct', {
                    products: products,
                    quoteId: quoteId, 
                    customerId: customer_id
                })
                .success((function(_this) {
                    return function(data, status) {
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to product" + status);
                        $log.error("Failed to product Service");
                        return deferred.reject(data);
                    };
                })(this));
           return deferred.promise;
        },
//Apply Coupan Code..
        applyCoupanCode: function(quoteId, couponCode) {
            var deferred;
            deferred = pd.$q.defer();
            $http.post(constants.API_URL+'checkout/addCoupon', {
                    quoteId: quoteId, 
                    couponCode: couponCode
                })
                .success((function(_this) {
                    return function(data, status) {
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to product" + status);
                        $log.error("Failed to product Service");
                        return deferred.reject(data);
                    };
                })(this));
           return deferred.promise;
        },
//Delete Products from cart..
        deleteCartProduct: function(quoteId, products) {
            var deferred;
            deferred = pd.$q.defer();
            $http.post(constants.API_URL+'cart/RemoveProduct', {
                    quoteId: quoteId, 
                    products: products
                })
                .success((function(_this) {
                    return function(data, status) {
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        return deferred.reject(data);
                    };
                })(this));
           return deferred.promise;
        }
}

    return cartSrvc;
});

homeModule.factory('cartSrvc', cartSrvc);