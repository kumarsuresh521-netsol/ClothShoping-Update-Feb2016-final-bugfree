var loginCtrl;
var finalState;

loginCtrl = (function($state, $ionicHistory, $stateParams, $ionicLoading, $rootScope,$timeout,$scope, signupSrvc, $ionicSideMenuDelegate) {

    function loginCtrl($rootScope,loginSrvc,$state,$stateParams,$ionicLoading, $timeout,$scope, signupSrvc, $ionicSideMenuDelegate) {
        //alert(localStorage.getItem("customer_id"));
        if(localStorage.getItem("customer_id") && localStorage.getItem("customer_id") != '' && localStorage.getItem("customer_id") != null && localStorage.getItem("customer_id") != undefined){  
            $state.go("app.banner");
            return;
        } 

        if($stateParams.route && $stateParams.route != 'login'){
          var path = $stateParams.route; 
        } else {
          var path = 'banner';
        }
        
        this.user = {};
        this.fuser = {};
        this.ShowPassword = 'password';
        this.state = $state;
        this.msg = 'new';
        var finalState = 'new'; 

            loginCtrl.prototype.userLogin = function(finalState,$scope) { console.log("Login"); console.log(this.user); console.log(this.password);console.log("Login2"); 

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
              $ionicLoading.show();

              if(localStorage.getItem("cartid") && localStorage.getItem("cartid") != '' && localStorage.getItem("cartid") != 'undefined'){
                    var shoppingCartId = localStorage.getItem("cartid");
                } else {
                    var shoppingCartId = null;
                }

               loginSrvc.chkLogin(this.user.username, this.user.password, shoppingCartId).then(function(response) { console.log("Login Restponse"); console.log(response);
                $ionicLoading.hide();
                   if(response.error == '0'){
                      //alert("Login Successfull.");
                      $rootScope.globals = {};
                      $rootScope.globals = {
                        currentUser: {
                            customer_id: response.entity_id,
                            firstname: response.firstname,
                            lastname: response.lastname,
                            email: response.email,
                        }
                      };

                      if(response.resultMergeCart){
                        localStorage.setItem("cartid", response.resultMergeCart.shopping_cart_id);
                        localStorage.setItem("cartTotal", response.resultMergeCart.shopping_cart_items_total.items_count);
                      }
                    //  console.log("rootsoup"); console.log($rootScope);

                      localStorage.setItem("email", response.email);
                      localStorage.setItem("firstname", response.firstname);
                      localStorage.setItem("lastname", response.lastname);
                      localStorage.setItem("customer_id", response.entity_id); 
                     //alert("Hi"+localStorage.getItem("firstname"));
                      $state.go("app."+path);
                   }else{
                    //alert("Your username or password is wrong.");
                    signupSrvc.showToastBanner("Your username or password is wrong.", "short", "center");
                    return;
                   }

                   
                   
               });
            }

            loginCtrl.prototype.forgotPassword = function() {
              if(!this.fuser.fusername){
                signupSrvc.showToastBanner("Please enter email address.", "short", "center");
                return;
             }

            if(this.fuser.fusername){
                 var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                 if(!re.test(this.fuser.fusername)){
                   signupSrvc.showToastBanner('Please Enter Your Valid Email', "short", "center");
                   return;
                 }
             }

             signupSrvc.showToastBanner('Password reset mail is sent.', "short", "center");
            }
    }

    return loginCtrl;
})();

loginModule.controller('loginCtrl', loginCtrl);
