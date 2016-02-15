var profileSrvc;

profileSrvc = (function($log, $http, $q, $state, constants) {

    var pro = this;
    pro.$log = $log;
    pro.$http = $http;
    pro.$q = $q;

    $log.debug("constructing profileSrvc");

    var profileSrvc = {
        getProfile: function(customer_id) {
           
            var deferred;
            $log.debug("get profile service");
            deferred = pro.$q.defer();
            $http.post(constants.API_URL+'users/getUserDetail', {
                    customerId: customer_id
                })
                .success((function(_this) {
                    return function(data, status) {
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to Login" + status);
                        $log.error("Failed to Login Service");
                        return deferred.reject(data);
                    };
                })(this));
            return deferred.promise;
        },
        getWishlist: function(customer_id) {
           
            var deferred;
            $log.debug("get profile service");
            deferred = pro.$q.defer();
            $http.post(constants.API_URL+'users/getCustomerWishlist', {
                    customerId: customer_id
                })
                .success((function(_this) {
                    return function(data, status) {
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to Login" + status);
                        $log.error("Failed to Login Service");
                        return deferred.reject(data);
                    };
                })(this));
            return deferred.promise;
        },
        removeWishlistItem: function(wishlist_item_id) {
           
            var deferred;
            deferred = pro.$q.defer();
            $http.post(constants.API_URL+'users/removeProductFromWishlist', {
                    wishlistItemId: wishlist_item_id
                })
                .success((function(_this) {
                    return function(data, status) {
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to Login" + status);
                        $log.error("Failed to Login Service");
                        return deferred.reject(data);
                    };
                })(this));
            return deferred.promise;
        },
        getMyOrder: function(customer_id) {
           
            var deferred;
            $log.debug("get profile service");
            deferred = pro.$q.defer();
            $http.post(constants.API_URL+'users/getOrderListing', {
                    customerId: customer_id
                })
                .success((function(_this) {
                    return function(data, status) {
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to Login" + status);
                        $log.error("Failed to Login Service");
                        return deferred.reject(data);
                    };
                })(this));
            return deferred.promise;
        },
        getMyOrderDetail: function(orderIncrementId) {
           
            var deferred;
            $log.debug("get profile service");
            deferred = pro.$q.defer();
            $http.post(constants.API_URL+'users/getOrderDetails', {
                    orderIncrementId: orderIncrementId
                })
                .success((function(_this) {
                    return function(data, status) {
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to Login" + status);
                        $log.error("Failed to Login Service");
                        return deferred.reject(data);
                    };
                })(this));
            return deferred.promise;
        },
        changePassword: function(customerId, current_password, password){
           
            var deferred;
            deferred = pro.$q.defer();
            $http.post(constants.API_URL+'users/changePassword', {
                    customerId: customerId,
                    current_password: current_password,
                    password: password
                })
                .success((function(_this) {
                    return function(data, status) {
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to Login" + status);
                        $log.error("Failed to Login Service");
                        return deferred.reject(data);
                    };
                })(this));
            return deferred.promise;
        },
        updateProfile: function(customerId, firstname, lastname, email) {
           
            var deferred;
            deferred = pro.$q.defer();
            $http.post(constants.API_URL+'users/editProfile', {
                    customerId: customerId,
                    firstname: firstname,
                    lastname: lastname,
                    email: email
                })
                .success((function(_this) {
                    return function(data, status) {
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to Login" + status);
                        $log.error("Failed to Login Service");
                        return deferred.reject(data);
                    };
                })(this));
            return deferred.promise;
        },
        updateBillingAddress: function(customerId, addressId, billingAddress) {
           
            var deferred;
            deferred = pro.$q.defer();
            $http.post(constants.API_URL+'users/updateAddress', {
                    customerId: customerId,
                    addressId: addressId,
                    address: billingAddress
                })
                .success((function(_this) {
                    return function(data, status) {
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to Login" + status);
                        $log.error("Failed to Login Service");
                        return deferred.reject(data);
                    };
                })(this));
            return deferred.promise;
        }
    }

    return profileSrvc;
});

profileModule.factory('profileSrvc', profileSrvc);