var changePasswordCtrl;

changePasswordCtrl = (function($state, $stateParams,$rootScope, $scope, profileSrvc, bannerSrvc, signupSrvc, $ionicPopover) {

    function changePasswordCtrl($state, $stateParams,$rootScope, $scope, profileSrvc, bannerSrvc, signupSrvc, $ionicPopover) {
        
       this.showMe = true;
       this.state = $state;
       this.rootScope = $rootScope;
        
        var self = this;

        var customer_id = localStorage.getItem('customer_id');
        
        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartid")){
            self.cartTotal = localStorage.getItem("cartTotal");    
        } else {
            self.cartTotal = 0;
        }

        changePasswordCtrl.prototype.ChangePassword = function(){
            var username = self.username;
            var old_password = self.old_password;
            var password = self.password;
            var confirm_password = self.confirm_password;

            if(!username){
                signupSrvc.showToastBanner("Please enter email address.", "short", "center");
                return;
            }

            if(username){
                 var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                 if(!re.test(username)){
                   signupSrvc.showToastBanner('Please Enter Your Valid Email', "short", "center");
                   return;
                 }
             }

            if(!old_password){
                signupSrvc.showToastBanner("Please enter old password.", "short", "center");
                return;
            }

            if(!password){
                signupSrvc.showToastBanner("Please enter password.", "short", "center");
                return;
            }

            if(password.length <5 || password.length >10){
                signupSrvc.showToastBanner("Password length must be in 5-10", "short", "center");
                return;
            }

            if(!confirm_password){
                signupSrvc.showToastBanner("Please enter confirm password.", "short", "center");
                return;
            }

            if(password != confirm_password){
                signupSrvc.showToastBanner("Both passwords are not match.", "short", "center");
                return;
            }

            profileSrvc.changePassword(customer_id, old_password, password).then(function(response) { //console.log("change password response"); //console.log(response);
                if(response){
                    if(resposne.success){
                        this.state.go("app.profile");
                        signupSrvc.showToastBanner("Your Password changed successfully.", "short", "center");
                        return;
                    } else if(response.errorMsg){
                        signupSrvc.showToastBanner(response.errorMsg, "short", "center");
                        return;
                    }
                }
                
            });
            
        }

        //User Popover
          $ionicPopover.fromTemplateUrl('components/Banner/userpopover.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });
        
    }

    return changePasswordCtrl;
})();

profileModule.controller('changePasswordCtrl', changePasswordCtrl);
