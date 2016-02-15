var loginSrvc;

loginSrvc = (function($log, $http, $q, $state, constants) {

    var ls = this;
    ls.$log = $log;
    ls.$http = $http;
    ls.$q = $q;

    $log.debug("constructing loginSrvc");

    var loginSrvc = {

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
        chkLogin: function(username, password, shoppingCartId) { //alert("fu");
        
            var deferred;
            $log.debug("get globalCompanyFields service");
            //console.log(username);
            deferred = ls.$q.defer();
            $http.post(constants.API_URL+'users/logins', {
                    email: username,
                    password: password,
                    shoppingCartId:shoppingCartId
                })
                .success((function(_this) {
                    return function(data, status) { //console.log(data); alert("success");
                        $log.debug("Login info " + (angular.toJson(data, true)));
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
        forgotPassword: function(username) {
        
            var deferred;
            deferred = ls.$q.defer();
            $http.post(constants.API_URL+'users/forgotPassword', {
                    email: username
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

    return loginSrvc;
});

loginModule.factory('loginSrvc', loginSrvc);