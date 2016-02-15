var shippingCtrl;

shippingCtrl = (function($scope,$ionicSideMenuDelegate,$state, cartSrvc, checkoutSrvc, $ionicLoading, $ionicPopover) {

    function shippingCtrl($scope,$state,cartSrvc, checkoutSrvc, $ionicLoading, $ionicPopover) { //console.log("$scope"); console.log($scope);
        $ionicLoading.show();
        this.state = $state;
        var self = this;
        self.paymentm = {};  
        self.shippingm = {}; 
        
        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartid")){
            self.cartTotal = localStorage.getItem("cartTotal");    
        } else {
            self.cartTotal = 0;
        }
         
         if(localStorage.getItem("cartid") && localStorage.getItem("cartid") != '' && localStorage.getItem("cartid") != 'undefined'){
            var cartid = localStorage.getItem("cartid");
        } else {
            alert("cart id not found");
            return;
        }

        var customerId = localStorage.getItem("customer_id");

             
            checkoutSrvc.getUserShippingData(customerId, cartid).then(function(response) { console.log(" shipping....");console.log(response);  
                if(response.success == 1){
                    self.shipping = response.data;
                    self.shipping.shipping.telephone = parseInt(response.data.shipping.telephone);
                }
                
            }).finally(function(){
                $ionicLoading.hide();
            });

//Shipping.html Shipping Infomation
         shippingCtrl.prototype.ShippingInfo = function(){// alert("Shipping");
            var firstname = self.shipping.shipping.firstname;
            var lastname = self.shipping.shipping.lastname;
            var street1 = self.shipping.shipping.street1;
            var street2 = self.shipping.shipping.street2;
            var city = self.shipping.shipping.city;
            var region = self.shipping.shipping.region;
            var country_id = self.shipping.shipping.country_id;
            var country_name = self.shipping.shipping.country_name;
            var postcode = self.shipping.shipping.postcode;
            var telephone = self.shipping.shipping.telephone;

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
            shippingDetails = {
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
            
            $ionicLoading.show(); //console.log("shipping d");console.log(shippingDetails);
            checkoutSrvc.updateUserShippingData(customerId, shippingDetails).then(function(response) {
               console.log("shipping update"); //console.log(response);
            }).finally(function(){
                $ionicLoading.hide();
                $state.go("app.payment");
            });
            
         }
                  //User Popover
          $ionicPopover.fromTemplateUrl('components/Banner/userpopover.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });
     }
    
    return shippingCtrl;
})();

checkoutModule.controller('shippingCtrl', shippingCtrl);

