var checkoutCtrl;

checkoutCtrl = (function($scope,$ionicSideMenuDelegate,$state, cartSrvc, checkoutSrvc, $ionicLoading, $ionicPopover) {

    function checkoutCtrl($scope,$state,cartSrvc, checkoutSrvc, $ionicLoading, $ionicPopover) { //console.log("$scope"); console.log($scope);
        
        this.state = $state;
        var self = this;
        
        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartid")){
            self.cartTotal = localStorage.getItem("cartTotal");    
        } else {
            self.cartTotal = 0;
        }
         
        var cartid = localStorage.getItem("cartid");
        var customerId = localStorage.getItem("customer_id");
        
            $ionicLoading.show();
            checkoutSrvc.getUserBillingData(customerId, cartid).then(function(response) {//console.log(" billing123...."); console.log(response);
                if(response.success == 1){
                    self.billing = response.data; //console.log(self.billing);
                    self.billing.shipping.telephone = parseInt(response.data.shipping.telephone);
                }
                
            }).finally(function(){
                $ionicLoading.hide();
            });
        
//Checkout.html Billing Infomation
         checkoutCtrl.prototype.BillingInfo = function(){ console.log("billing countinue button on click");console.log(self.billing.shipping);
            var firstname = self.billing.shipping.firstname;
            var lastname = self.billing.shipping.lastname;
            var street1 = self.billing.shipping.street1;
            var street2 = self.billing.shipping.street2;
            var city = self.billing.shipping.city;
            var region = self.billing.shipping.region;
            var country_id = self.billing.shipping.country_id;
            var country_name = self.billing.shipping.country_name;
            var postcode = self.billing.shipping.postcode;
            var telephone = self.billing.shipping.telephone;

            if(!firstname){
                cartSrvc.showToastBanner("First Name is required.", "short", "center");
                return;
            }

            if(firstname.length < 3){
                cartSrvc.showToastBanner("First Name is too short.", "short", "center");
                return;
            }

            if(firstname > 16){
                cartSrvc.showToastBanner("First Name too long.", "short", "center");
                return;
            }

            if(lastname > 16){
                cartSrvc.showToastBanner("Last Name is required.", "short", "center");
                return;
            }
            
            if(!street1){
                cartSrvc.showToastBanner("Address is required.", "short", "center");
                return;
            }

            if(!street2){
                cartSrvc.showToastBanner("Address 2 is required.", "short", "center");
                return;
            }

            if(!city){
                cartSrvc.showToastBanner("City is required.", "short", "center");
                return;
            }

            if(!region){
                cartSrvc.showToastBanner("State is required.", "short", "center");
                return;
            }
            
            if(!country_name){
                cartSrvc.showToastBanner("Country is required.", "short", "center");
                return;
            }

            if(!postcode){
                cartSrvc.showToastBanner("Pincode is required.", "short", "center");
                return;
            }

            if(!telephone){
                cartSrvc.showToastBanner("Phone Number is required.", "short", "center");
                return;
            }
            billingDetails = {
                'firstname': firstname,
                'lastname': lastname,
                'street1': street1,
                'street2': street2,
                'city': city,
                'region_id':'0',
                'region': region,
                "country_id":country_id,
                "country_name":country_name,
                'postcode': postcode,
                'telephone': telephone
            }
            
            $ionicLoading.show(); //console.log("billing d");console.log(billingDetails);
            checkoutSrvc.updateUserBillingData(customerId, cartid, billingDetails).then(function(response) {
               console.log("billing update"); console.log(response); console.log("billing update"); 
            }).finally(function(){
                $ionicLoading.hide();
                $state.go("app.shipping");
            });
         }
         //User Popover
          $ionicPopover.fromTemplateUrl('components/Banner/userpopover.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });
        }

    return checkoutCtrl;
})();

checkoutModule.controller('checkoutCtrl', checkoutCtrl);

