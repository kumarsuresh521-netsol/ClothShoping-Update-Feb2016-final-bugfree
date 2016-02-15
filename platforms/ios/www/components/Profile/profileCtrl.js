var profileCtrl;

profileCtrl = (function($state, $stateParams,$rootScope, $scope, profileSrvc, cartSrvc, $ionicLoading, $ionicPopup, $ionicPopover) {

    function profileCtrl($state, $stateParams,$rootScope, $scope, profileSrvc, cartSrvc, $ionicLoading, $ionicPopup, $ionicPopover) {
    
        $ionicLoading.show();
       this.showMe = true;
       this.state = $state;
       this.rootScope = $rootScope;
        
        var self = this;

        var customer_id = localStorage.getItem('customer_id');
        
        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartTotal") != 'NaN' && localStorage.getItem("cartid") && localStorage.getItem("cartid") != 'NaN' ){
                self.cartTotal = localStorage.getItem("cartTotal");    
            } else {
                self.cartTotal = '0';
            }
        
        profileSrvc.getProfile(customer_id).then(function(response) { console.log("profile response"); console.log(response);
            if(response.success == 1){
                self.profileInfo = response.data;
            } else {
                cartSrvc.showToastBanner("Server Error occcurs.", "short", "center");
                return;
            }
            
        }).finally(function(){
            $ionicLoading.hide();
        });
//Update Account Information....
        profileCtrl.prototype.showUserPopup = function() { //alert("Hi");
          // An elaborate, custom popup
          var myPopup = $ionicPopup.show({
            template: '<div class="list"> <label class="item item-input item-floating-label"> <span class="input-label">First Name</span> <input type="text" placeholder="First Name" ng-model="pl.profileInfo.customer_profile_info.firstname"> </label>  <label class="item item-input item-floating-label"> <span class="input-label">Last Name</span> <input type="text" placeholder="Last Name" ng-model="pl.profileInfo.customer_profile_info.lastname"></label> <label class="item item-input item-floating-label"> <span class="input-label">Email</span> <input type="text" placeholder="Email" ng-model="pl.profileInfo.customer_profile_info.email"> </label></div>',
            title: 'Edit Account Information',
           
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) { console.log($scope);
                 
                    var firstname = self.profileInfo.customer_profile_info.firstname;
                    var lastname = self.profileInfo.customer_profile_info.lastname;
                    var email = self.profileInfo.customer_profile_info.email;

                    if(!firstname){
                        cartSrvc.showToastBanner("Please enter firstname.", "short", "center");
                        e.preventDefault();
                        return;
                    }
                    if(!lastname){
                        cartSrvc.showToastBanner("Please enter lastname.", "short", "center");
                        e.preventDefault();
                        return;
                    }
                    if(!email){
                        cartSrvc.showToastBanner("Please enter email.", "short", "center");
                        e.preventDefault();
                        return;
                    }
                    if(email){
                         var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                         if(!re.test(email)){
                           cartSrvc.showToastBanner('Please Enter Your Valid Email', "short", "center");
                           e.preventDefault();
                           return;
                         }
                     }

                     profileSrvc.updateProfile(customer_id, firstname, lastname, email).then(function(response) {
                        if(response.success == 1){
                            cartSrvc.showToastBanner("Form submitted successfully.", "short", "center");
                            return;
                        } else {
                            cartSrvc.showToastBanner(response.msg, "short", "center");
                            return;
                        }
                        
                    });
                    
                }
              }
            ]
          });
        }

        // Go To Cart
        profileCtrl.prototype.goToCart = function(){
            if(self.cartTotal > 0){
                this.state.go("app.cart");
            } else {
                cartSrvc.showToastBanner("Cart is empty.", "short", "center");
            }
        }

        profileCtrl.prototype.showBillingPopup = function(index) { //alert(index);
            //console.log(x); console.log(x.city);
            self.index = index;
//console.log(self.profileInfo.addresses[index].firstname);
            var myPopupBilling = $ionicPopup.show({
            template: '<div class="list"> <label class="item item-input item-floating-label"> <span class="input-label">First Name</span><input type="text" ng-model="pl.profileInfo.addresses[pl.index].firstname" name="firstname" placeholder="First Name" ng-minlength="3" ng-maxlength="15" required/>  </label> <label class="item item-input item-floating-label"> <span class="input-label">Last Name</span> <input type="text" ng-model="pl.profileInfo.addresses[pl.index].lastname" name="lastname" placeholder="Last Name" ng-minlength="3" ng-maxlength="15" required /> </label><label class="item item-input item-floating-label"><span class="input-label">City/Town</span> <input type="text" ng-model="pl.profileInfo.addresses[pl.index].city" name="city"  placeholder="City/Town"/></label><label class="item item-input item-floating-label"> <span class="input-label">State</span><input type="text" ng-model="pl.profileInfo.addresses[pl.index].region" name="region"  placeholder="State"/></label><input type="hidden" ng-model="pl.profileInfo.addresses[pl.index].country_id" name="country_id"/><!--  <label class="item item-input item-select"> <div class="input-label"> Country </div><select name="countary_name" ng-init="pl.profileInfo.addresses[pl.index].country_id = pl.profileInfo.addresses[pl.index].country_id" ng-model="pl.profileInfo.addresses[pl.index].country_id" style="right:5px;" ng-options="pl.profileInfo.addresses[pl.index].country_id as pl.profileInfo.addresses[pl.index].name for x in pl.profileInfo.addresses[pl.index].country_list"></select></label> --> <label class="item item-input item-floating-label"> <span class="input-label">Pin Code</span> <input type="text" ng-model="pl.profileInfo.addresses[pl.index].postcode" name="postcode" placeholder="Pin Code"/>  </label> <label class="item item-input item-floating-label"> <span class="input-label">Phone Number</span><input type="text" ng-model="pl.profileInfo.addresses[pl.index].telephone" name="telephone"  placeholder="Phone Number"/> </label> </div>',
            title: 'Edit Information',
           
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Save</b>',
                type: 'button-positive',
                onTap: function(e) { console.log($scope);
                 
                    var firstname = self.profileInfo.addresses[index].firstname;
                    var lastname = self.profileInfo.addresses[index].lastname;
                    var street1 = "test";
                    var street2 = "test";
                    var city = self.profileInfo.addresses[index].city;
                    var region = self.profileInfo.addresses[index].region;
                    var country_id = self.profileInfo.addresses[index].country_id;
                    var country_name = "test";
                    var postcode = self.profileInfo.addresses[index].postcode;
                    var telephone = self.profileInfo.addresses[index].telephone;

                    if(!firstname){
                        cartSrvc.showToastBanner("First Name is required.", "short", "center");
                        e.preventDefault();
                        return;
                    }

                    if(firstname.length < 3){
                        cartSrvc.showToastBanner("First Name is too short.", "short", "center");
                        e.preventDefault();
                        return;
                    }

                    if(firstname > 16){
                        cartSrvc.showToastBanner("First Name too long.", "short", "center");
                        e.preventDefault();
                        return;
                    }

                    if(lastname > 16){
                        cartSrvc.showToastBanner("Last Name is required.", "short", "center");
                        e.preventDefault();
                        return;
                    }
                    
                    if(!street1){
                        cartSrvc.showToastBanner("Address is required.", "short", "center");
                        e.preventDefault();
                        return;
                    }

                    if(!street2){
                        cartSrvc.showToastBanner("Address 2 is required.", "short", "center");
                        e.preventDefault();
                        return;
                    }

                    if(!city){
                        cartSrvc.showToastBanner("City is required.", "short", "center");
                        e.preventDefault();
                        return;
                    }

                    if(!region){
                        cartSrvc.showToastBanner("State is required.", "short", "center");
                        e.preventDefault();
                        return;
                    }
                    
                    if(!country_name){
                        cartSrvc.showToastBanner("Country is required.", "short", "center");
                        e.preventDefault();
                        return;
                    }

                    if(!postcode){
                        cartSrvc.showToastBanner("Pincode is required.", "short", "center");
                        e.preventDefault();
                        return;
                    }

                    if(!telephone){
                        cartSrvc.showToastBanner("Phone Number is required.", "short", "center");
                        e.preventDefault();
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

                     profileSrvc.updateBillingAddress(customer_id, self.profileInfo.addresses[index].customer_address_id, self.profileInfo.addresses[index]).then(function(response) { console.log(response);
                        if(response.success == 1){
                            cartSrvc.showToastBanner("Form submitted successfully.", "short", "center");
                            return;
                        } else {
                            cartSrvc.showToastBanner(response.msg, "short", "center");
                            return;
                        }
                        
                    });
                    
                }
              }
            ]
          });

            for(i=0; i<self.profileInfo.addresses; i++){
                if(self.profileInfo.addresses[i].customer_address_id == x.customer_address_id){
                    $scope.billingData = x;
                }
            }
        }

        //User Popover
          $ionicPopover.fromTemplateUrl('components/Banner/userpopover.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });
    }

    return profileCtrl;
})();

profileModule.controller('profileCtrl', profileCtrl);
