var signupCtrl;

signupCtrl = (function($rootScope,$scope,signupSrvc, $state, $ionicSideMenuDelegate, $ionicLoading) {
    
    function signupCtrl($rootScope,$scope,signupSrvc, $state, $ionicSideMenuDelegate, $ionicLoading) {
        
        if(localStorage.getItem("customer_id") && localStorage.getItem("customer_id") != ''){
           // $state.go("app.banner");
           // return;
        }
        //this.signupSrvc = signupSrvc;
        this.user = {};
        this.ShowPassword = 'password';


        signupCtrl.prototype.userSignUp = function() { 
            if(!this.user.firstname){
                signupSrvc.showToastBanner("Please enter first name.", "short", "center");
                return;
            }

            if(this.user.firstname.length <3 || this.user.firstname.length > 10){
                signupSrvc.showToastBanner("Firstname length must be in 3-10.", "short", "center");
                return;
            }

            if(!this.user.lastname){
                signupSrvc.showToastBanner("Please enter last name.", "short", "center");
                return;
            }

            if(this.user.lastname.length <3 || this.user.lastname.length > 10){
                signupSrvc.showToastBanner("Lastname length must be in 3-10.", "short", "center");
                return;
            }

            if(!this.user.username){
                signupSrvc.showToastBanner("Please enter email address.", "short", "center");
                return;
            }

            if(this.user.username){
                 var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                 if(!re.test(this.user.username)){
                   signupSrvc.showToastBanner('Please Enter Your Valid Email', "short", "center");
                   return;
                 }
             }

            if(!this.user.password){
                signupSrvc.showToastBanner("Please enter password.", "short", "center");
                return;
            }

            if(this.user.password.length <5 || this.user.password.length >10){
                signupSrvc.showToastBanner("Password length must be in 5-10", "short", "center");
                return;
            }

            if(!this.user.cpassword){
                signupSrvc.showToastBanner("Please enter confirm password.", "short", "center");
                return;
            }

            if(this.user.password != this.user.cpassword){
                signupSrvc.showToastBanner("Both passwords are not match.", "short", "center");
                return;
            }
            $ionicLoading.show();
            var signup = signupSrvc.chkLogin(this.user.username, this.user.password, this.user.firstname, this.user.lastname).then(function(response){ console.log(response);
               if(response.error == 0 && response.entity_id){
                    $rootScope.globals = {};
                      $rootScope.globals = {
                        currentUser: {
                            customer_id: response.entity_id,
                            firstname: response.firstname,
                            lastname: response.lastname,
                            email: response.email,
                        }
                       };
                            localStorage.setItem("email", response.email);
                          localStorage.setItem("firstname", response.firstname);
                          localStorage.setItem("lastname", response.lastname);
                          localStorage.setItem("customer_id", response.entity_id); 
                       
                      signupSrvc.showToastBanner("You signup process is successfully completed.", "short", "center");
                      $state.go("app.banner");
                } else {
                    signupSrvc.showToastBanner("Email is already exist.","short", "center");
                return;
                }
            }).finally(function(){
                $ionicLoading.hide();
            });
            
        }
    }

    
    return signupCtrl;

})();
signupModule.controller('signupCtrl', signupCtrl);