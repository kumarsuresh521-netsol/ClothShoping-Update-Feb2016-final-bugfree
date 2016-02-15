var cartCtrl;

cartCtrl = (function($rootScope,$scope,$ionicLoading, $ionicSideMenuDelegate,$state, cartSrvc, $ionicPopover, productSrvc, $ionicPopup) {   
        function cartCtrl($rootScope, $scope,$ionicSideMenuDelegate,$state, cartSrvc, $ionicLoading, $ionicPopover, productSrvc, $ionicPopup) {
        
        this.state = $state;
        var self = this;

        $scope.$on('$stateChangeSuccess', function () { 
            $ionicLoading.show();
            if(localStorage.getItem("cartid") && localStorage.getItem("cartid") != '' && localStorage.getItem("cartid") != 'undefined'){
                
                getCartProducts();

            } else {
                $ionicLoading.hide();
                cartSrvc.showToastBanner("Your Cart Is Empty.", "long", "center");
            }
        });

        $scope.$on('$ionicView.beforeLeave', function () {
            updateCart();
        });

        var cartid = localStorage.getItem("cartid");

        function getCartProducts(){
            var cartid = localStorage.getItem("cartid");

            cartSrvc.getCartProducts(cartid).then(function(response) { ////console.log("cart Products..");////console.log(response);
                        self.cartProducts = response;

                        for(i=0; i<4; i++){
                            if(self.cartProducts[i] && self.cartProducts[i].title == "Grand Total"){
                                self.cartProducts.GrandTotal = self.cartProducts[i].amount;
                            }
                        }

                        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartTotal") != 'NaN' && localStorage.getItem("cartid") && localStorage.getItem("cartid") != 'NaN' ){
                            if(self.cartProducts.products){
                                self.cartTotal = response.products.length;
                            }else {
                                self.cartTotal = 0; 
                            }
                            localStorage.setItem("cartTotal", self.cartTotal);
                        }
                        
                 }).finally(function(){

                    $ionicLoading.hide();
                });
        }


            function updateCart(){ //alert(product_id);
                
                var customer_id = localStorage.getItem("customer_id"); 
             //    ////console.log("before"); ////console.log(self.cartProducts.products);
                cartSrvc.updateCartProducts(self.cartProducts.products, cartid, customer_id).then(function(response) { //////console.log(self.cartProducts.products);
                    //////console.log(" update CartResponse");////console.log(response); 
                    //var grandTotal2 = 0;
                   /* if(response.success == 1){
                        for(i=0; i<=self.cartProducts.products.length; i++ ){
                            if(self.cartProducts.products[i]){
                                self.cartProducts.products.total = '';
                                if(self.cartProducts.products[i].subTotal){ ////console.log(self.cartProducts.products[i]);
                                    grandTotal2 += parseInt(self.cartProducts.products[i].subTotal); //alert(grandTotal2);
                                }
                            } 
                        }
                    }
                     
                    self.cartProducts.products.grandTotal = grandTotal2;
                    return;
                    */
                }).finally(function(){
                    //////console.log("after"); ////console.log(self.cartProducts.products);
                    var cartTotal = self.cartProducts.products.length;
                    localStorage.setItem("cartTotal", cartTotal);
                    self.cartTotal = cartTotal;            
                });
             }
             
             
             cartCtrl.prototype.myquantity = function(product_id, type){ //////console.log(product_id+"-"+type); ////console.log(self.cartProducts.products);
                 for(i=0; i<self.cartProducts.products.length; i++){
                    if(self.cartProducts.products[i]){
                        if(self.cartProducts.products[i].product_id  && self.cartProducts.products[i].product_id == product_id){
                            var quantity = self.cartProducts.products[i].qty;  
                            var quantityStock = self.cartProducts.products[i].inventory[0].qty; //////console.log("quantityStock"+quantityStock);

                             var maxQuantity = self.cartProducts.products[i].maxAllowedQty; //////console.log("first maxQuantity"+maxQuantity);
                             
                             if(quantityStock <= maxQuantity){
                                var maxQuantity = quantityStock;
                             }
                             //////console.log("maxQuantity"+maxQuantity);
                             var minQuantity = self.cartProducts.products[i].minimumAllowedQty; //////console.log("minQuantity"+minQuantity);
                        }
                    }
                 }
                 

                if(type == 1){
                    quantity = quantity + 1;
                }
                
                if(type == 0){
                    quantity = quantity - 1;
                }
                
                if(quantity < minQuantity){
                    quantity = minQuantity;
                    return;
                }

                if(quantity > maxQuantity){
                    quantity = maxQuantity;
                }
//////console.log("quantity"+quantity);
                for(i=0; i<self.cartProducts.products.length; i++){
                    if(self.cartProducts.products[i].product_id && self.cartProducts.products[i].product_id == product_id){
                        self.cartProducts.products[i].qty = quantity;  
                    }
                 }
                  //////console.log(" after update "); ////console.log(self.cartProducts.products);

                
                for(i=0; i<self.cartProducts.products.length; i++ ){
                    if(self.cartProducts.products[i]){
                        if(self.cartProducts.products[i].product_id == product_id){

                            self.cartProducts.GrandTotal -= self.cartProducts.products[i].subTotal;
                            //////console.log(self.cartProducts.GrandTotal);
                           self.cartProducts.products[i].quantity = quantity;
                           self.cartProducts.products[i].subTotal = self.cartProducts.products[i].price * self.cartProducts.products[i].quantity; //alert(grandTotal); alert(self.cartProducts.products[i].subTotal);
                           self.cartProducts.GrandTotal += self.cartProducts.products[i].subTotal; //alert(grandTotal);
                           //////console.log(self.cartProducts.GrandTotal);
                           //self.cartProducts.products.grandTotal = gTotal; //alert("after"+gTotal);
                        }
                    }
                }
                
                return self.quantity;
            }
            

        cartCtrl.prototype.deleteProductNew = function(product_id){
            $ionicLoading.show();
            $scope.options = [];
            var products = {}; //////console.log(self.cartProducts.products);////console.log(self.cartProducts.products.length);
            for(i=0; i<=self.cartProducts.products.length; i++ ){
                    if(self.cartProducts.products[i]){
                        if(self.cartProducts.products[i].product_id == product_id){
                            var sku = self.cartProducts.products[i].sku;
                            var quantity = self.cartProducts.products[i].qty;
                            var option = self.cartProducts.products[i].options;
                            var newOptions = {};
                            if(option){
                                for(j=0; j<option.length; j++){ //////console.log(option); ////console.log(j);
                                    var newOptions = {};
                                    newOptions['key'] = option[j].option_id;
                                    newOptions['value'] = option[j].option_value; //////console.log(newOptions);
                                    $scope.options.push(newOptions); //////console.log($scope.options);
                                }
                            } else {
                                $scope.options = null;
                            }
                            

                            products['product_id'] = product_id;
                            products['sku'] = sku;
                            products['qty'] = quantity;
                            products['options'] = $scope.options;

                            var p = [products]; //////console.log(p);

                            cartSrvc.deleteCartProduct(cartid, p).then(function(response) { //////console.log(response);
                                getCartProducts();
                            }).finally(function(response){
                                if(response.success == 1){
                                    cartSrvc.showToastBanner("Product Successfully deleted from your cart.", "short", "center");
                                    return;
                                } else {
                                    cartSrvc.showToastBanner(response.msg, "short", "center");
                                    return;
                                }
                            });
                        }
                    }
                }


        }

        cartCtrl.prototype.GoToCheckOut = function(){  //////console.log(localStorage.getItem("customer_id"));
           // updateCart(); 
            if(localStorage.getItem("customer_id") && localStorage.getItem("customer_id") != ''){
                $state.go("app.checkout");
            } else {
                cartSrvc.showToastBanner("Please login to countinue.", "short", "center");
                $state.go("app.login",{ 'route': 'cart' });
            }
        }

        cartCtrl.prototype.addToWishlist = function(product_id){ //alert("Hi");
            var customerId = localStorage.getItem('customer_id');
            $ionicLoading.show();
            if(customerId && customerId != ''){
                //cartSrvc.showToastBanner("Product Successfully Added To Your Wishlist.", "short", "center");
                productSrvc.addToWishlist(product_id, customerId).then(function(response) { //////console.log("add to wishlist response");////console.log(response);
                    if(response.success == 1){ //alert("hi");
                        cartSrvc.showToastBanner("Product Successfully Added To Your Wishlist.", "short", "center");
                    } else {
                        cartSrvc.showToastBanner("Opps ! Some Server issue.", "short", "center");
                    }
                    
                }).finally(function(){
                    $ionicLoading.hide();
                });
            } else {
                $ionicLoading.hide();
                cartSrvc.showToastBanner("Please login first.", "short", "center");
                $state.go("app.login",{ 'route': 'banner' });
            }

            
        }
            
        cartCtrl.prototype.ApplyCoupan = function(){

            var myPopupBilling = $ionicPopup.show({
            template: '<div class="list"> <label class="item item-input"> <input type="text" placeholder="Enter Your Coupan Code" ng-model="cc.coupanCode"> </label> </div>',
            title: 'Apply Coupon',
           
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Apply Coupon</b>',
                type: 'button-positive',
                onTap: function(e) { //////console.log($scope);

                    var coupanCode = self.coupanCode;
                    if(!coupanCode){
                        cartSrvc.showToastBanner("Please Enter your coupan code.", "short", "center");
                        return;
                    }
                    $ionicLoading.show();
                    cartSrvc.applyCoupanCode(cartid, coupanCode).then(function(response) { //////console.log(response);
                        if(response.success == 0){
                            cartSrvc.showToastBanner("Your Coupan Code is invalid.", "short", "center");
                            return;
                        } else if(response.success == 1){
                            cartSrvc.showToastBanner("Your Coupan Code is apply successfully.", "long", "center");
                        }
                    }).finally(function(){
                        $ionicLoading.hide();
                    })
                }
              }
            ]
          });
        }

        

        //User Popover
          $ionicPopover.fromTemplateUrl('components/Banner/userpopover.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });
     }

    return cartCtrl;
})();

cartModule.controller('cartCtrl', cartCtrl);

