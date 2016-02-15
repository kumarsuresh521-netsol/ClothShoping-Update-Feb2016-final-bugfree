var prodListingSrvc;

prodListingSrvc = (function($log, $http, $q, constants) {
    
    var pc = this;
    pc.$log = $log;
    pc.$http = $http;
    pc.$q = $q;
//pc.rdata = [];
     
     var prodListingSrvc = {
        
        getCdata: function(category_id) {
        
            var deferred;
            //$log.debug("get globalCompanyFields service");
            ////console.log(username);
            deferred = pc.$q.defer();
           // $http.post('http://localhost:8025/magento_1.9/index.php/phonegapapp/categories/categoryDetail/', {
                $http.post(constants.API_URL+'categories/getAllProducts', {
                  catId: category_id
                })
                .success((function(_this) {
                    return function(data, status) {
                        //$log.debug("globalCompanyFields " + (angular.toJson(data, true)));
                        return deferred.resolve(data);
                       // pc.rdata = deferred.resolve(data);

                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to fetch products" + status);
                        $log.error("Failed to fetch mens products");
                        return deferred.reject(data);
                    };
               })(this));
            return deferred.promise;
            },
            getFilterData: function(category_id, color, manufacturer, price) {
        
            var deferred;
            //$log.debug("get globalCompanyFields service");
            ////console.log(username);
            deferred = pc.$q.defer();
           // $http.post('http://localhost:8025/magento_1.9/index.php/phonegapapp/categories/categoryDetail/', {
                $http.post(constants.API_URL+'categories/getAllProducts', {
                  catId: category_id,
                  color: color,
                  manufacturer: manufacturer,
                  price: price
                })
                .success((function(_this) {
                    return function(data, status) {
                        //$log.debug("globalCompanyFields " + (angular.toJson(data, true)));
                        return deferred.resolve(data);
                       // pc.rdata = deferred.resolve(data);

                    };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to fetch products" + status);
                        $log.error("Failed to fetch mens products");
                        return deferred.reject(data);
                    };
               })(this));
            return deferred.promise;
            },
            getFilterOptions: function(category_id) {
        
            var deferred;
            deferred = pc.$q.defer();
                $http.post(constants.API_URL+'categories/getActiveFilters', {
                  catId: category_id
                }).success((function(_this) { 
                    $log.error("success to filters" + status);
                        return function(data, status) {
                            return deferred.resolve(data);
                        };
                })(this)).error((function(_this) {
                    return function(data, status, headers) {
                        $log.error("Failed to filters" + status);
                        return deferred.reject(data);
                    };
               })(this));
            return deferred.promise;
            }
        
    
}


  return prodListingSrvc;
});  

prodListingModule.factory('prodListingSrvc', prodListingSrvc);