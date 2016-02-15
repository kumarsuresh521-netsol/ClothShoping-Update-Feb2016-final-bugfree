var forgotPasswordCtrl;

forgotPasswordCtrl = (function($state, $ionicHistory, $stateParams, $ionicLoading, $rootScope,$timeout,$scope, signupSrvc, $ionicSideMenuDelegate) {

    function forgotPasswordCtrl($rootScope,loginSrvc,$state,$stateParams,$ionicLoading, $timeout,$scope, signupSrvc, $ionicSideMenuDelegate) {
        
        this.ShowPassword = 'password';
        this.state = $state;

            forgotPasswordCtrl.prototype.forgotPassword = function() {

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

            $ionicLoading.show();
             loginSrvc.forgotPassword(this.fuser.fusername).then(function(response) {
              //alert("forgot"); console.log(response); return; 
              if(response.success == 1){
                  signupSrvc.showToastBanner('Password reset mail is sent to your mail id.', "short", "center");
                  $state.go("app.login");
              } else {
                  signupSrvc.showToastBanner(response.msg, "short", "center");
                  return;
              }
                  
              }).finally(function(){
                  $ionicLoading.hide();;
              });
        }
}

    return forgotPasswordCtrl;
})();

loginModule.controller('forgotPasswordCtrl', forgotPasswordCtrl);
