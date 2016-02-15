var userPopOverCtrl;

userPopOverCtrl = (function($rootScope, $scope, $state, cartSrvc){
    function userPopOverCtrl($rootScope,$scope, $state, cartSrvc){
        
        this.state = $state;
       this.scope = $scope;
       this.rootScope = $rootScope;
       var self = this;
        
            if(localStorage.getItem('customer_id')){
                self.isRegisterd = true;
            }else {
                self.isRegisterd = false;
            }

       // alert(localStorage.getItem("customer_id"));

        userPopOverCtrl.prototype.userNav = function(nav) {
            $scope.popover.hide();
            if(nav == 'logout'){
                
                localStorage.removeItem("email");
                localStorage.removeItem("firstname");
                localStorage.removeItem("lastname");
                localStorage.removeItem("customer_id");
                localStorage.removeItem("cartTotal");
                localStorage.removeItem("cartid");

                cartSrvc.showToastBanner("You Logout Successfully.", "short", "center");
                this.state.go("app.login");
                return;
            } else if(nav == 'compare'){
                    var product_one = window.localStorage.getItem('compare_product_one_id');
                    var product_two = window.localStorage.getItem('compare_product_two_id');
                    if(product_one || product_two){
                        this.state.go("app.productsCompare");
                    } else {
                        cartSrvc.showToastBanner("Please add product for compare.", "short", "center");
                    }
            } else {
                if(localStorage.getItem("customer_id") && localStorage.getItem("customer_id") != ''){
                    this.state.go("app."+nav);
                } else {
                    this.state.go("app.login",{ 'route': nav });
                }
            }
            
        }
    }
    return userPopOverCtrl;
})();

bannerModule.controller('userPopOverCtrl', userPopOverCtrl);

