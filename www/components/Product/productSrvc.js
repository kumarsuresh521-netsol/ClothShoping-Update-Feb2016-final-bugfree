var productSrvc;

productSrvc = (function($log, $http, $q, constants) {

    var pd = this;
    pd.$log = $log;
    pd.$http = $http;
    pd.$q = $q;
var productSrvc ;
    var productSrvc = {
        
        getData: function(prid) {
            var deferred;
            deferred = pd.$q.defer();
            $http.post(constants.API_URL+'products/productDetail', {
                    productId: prid 
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
        addToCart: function(response) {
            var deferred;
             deferred = pd.$q.defer();
            $http.post(constants.API_URL+'cart/addCart', {
                   "products":response["products"],
                   "customer":response["customer"],
                   "shopping_cart_id":response["shopping_cart_id"]
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
        addToWishlist: function(productId, customerId) {
            var deferred;
             deferred = pd.$q.defer();
            $http.post(constants.API_URL+'users/addToWishlist', {
                   productId: productId,
                   customerId:customerId
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
        }
}
    return productSrvc;
});

productModule.factory('productSrvc', productSrvc);