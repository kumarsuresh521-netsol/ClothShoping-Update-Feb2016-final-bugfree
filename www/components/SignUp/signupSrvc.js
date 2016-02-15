var signupSrvc;

signupSrvc = (function($log, $http, $q, $state, constants) {

    var sp = this;
    sp.$log = $log;
    sp.$http = $http;
    sp.$q = $q;

    $log.debug("constructing signupSrvc");
//{"email":"ss@smail.com","firstname":"ss","lastname":"sd","password":"123456","website_id":"1","store_id":"1","group_id":"1"}
    var signupSrvc = {
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
        chkLogin: function(username, password, firstname, lastname) {
            var deferred;
            $log.debug("get globalCompanyFields service");
            deferred = sp.$q.defer();
            $http.post(constants.API_URL+'users/register', {
                    email: username,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    website_id: 1,
                    store_id: 1,
                    group_id:1
                })
                .success((function(_this) {
                   
                    return function(data, status) {
                        $log.debug("globalCompanyFields " + (angular.toJson(data, true))['error']);
                        return deferred.resolve(data);
                    };
                })(this)).error((function(_this) {

                    return function(data, status, headers) {
                        $log.error("Failed to Signup" + status);
                        $log.error("Failed to Signup Service");
                        return deferred.reject(data);
                        
                    };
                })(this));
            return deferred.promise;
        }
    }
    return signupSrvc;
});

signupModule.factory('signupSrvc', signupSrvc);