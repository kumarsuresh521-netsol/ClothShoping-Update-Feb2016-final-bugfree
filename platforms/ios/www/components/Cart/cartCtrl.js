var cartCtrl;

cartCtrl = (function($rootScope,$scope,$ionicLoading, $ionicSideMenuDelegate,$state, cartSrvc, $ionicPopover, productSrvc, $ionicPopup) {   
        function cartCtrl($rootScope, $scope,$ionicSideMenuDelegate,$state, cartSrvc, $ionicLoading, $ionicPopover, productSrvc, $ionicPopup) {
        
        this.state = $state;
        var self = this;
         var grandTotal = 0; 

        $scope.$on('$stateChangeSuccess', function () { 
            $ionicLoading.show();
            if(localStorage.getItem("cartid") && localStorage.getItem("cartid") != '' && localStorage.getItem("cartid") != 'undefined'){
                var cartid = localStorage.getItem("cartid");
//alert("Cart Id=> "+ cartid);
                cartSrvc.getCartProducts(cartid).then(function(response) { console.log("cart Products..");console.log(response);
                        self.cartProducts = response.products;

                        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartTotal") != 'NaN' && localStorage.getItem("cartid") && localStorage.getItem("cartid") != 'NaN' ){
                            if(self.cartProducts){
                                self.cartTotal = response.products.length;
                                self.cartProducts.grandTotal = response[1].amount;
                                
                            }else {
                                self.cartTotal = 0; 
                            }
                            localStorage.setItem("cartTotal", self.cartTotal);
                        }
                        
                 }).finally(function(){

                    $ionicLoading.hide();
                });
            } else {
                $ionicLoading.hide();
                cartSrvc.showToastBanner("Your Cart Is Empty.", "long", "center");
            }
        });

        $scope.$on('$ionicView.beforeLeave', function () {
            updateCart();
        });

        var cartid = localStorage.getItem("cartid");


            function updateCart(){ //alert(product_id);
                
                var customer_id = localStorage.getItem("customer_id"); 
             //    console.log("before"); console.log(self.cartProducts);
                cartSrvc.updateCartProducts(self.cartProducts, cartid, customer_id).then(function(response) { console.log(self.cartProducts);
                    console.log("Response");console.log(response); 
                    var grandTotal2 = 0;
                    if(response.success == 1){
                        for(i=0; i<=self.cartProducts.length; i++ ){
                            if(self.cartProducts[i]){
                                self.cartProducts.total = '';
                                if(self.cartProducts[i].subTotal){ console.log(self.cartProducts[i]);
                                    grandTotal2 += parseInt(self.cartProducts[i].subTotal); //alert(grandTotal2);
                                }
                            } 
                        }
                    }
                     
                    self.cartProducts.grandTotal = grandTotal2;
                    return;

                }).finally(function(){
                    console.log("after"); console.log(self.cartProducts);
                    var cartTotal = self.cartProducts.length;
                    localStorage.setItem("cartTotal", cartTotal);
                    self.cartTotal = cartTotal;            
                });
             }
             
             
             cartCtrl.prototype.myquantity = function(product_id, type){ console.log(product_id+"-"+type); console.log(self.cartProducts);
                 for(i=0; i<self.cartProducts.length; i++){
                    if(self.cartProducts[i]){
                        if(self.cartProducts[i].product_id  && self.cartProducts[i].product_id == product_id){
                            var quantity = self.cartProducts[i].qty;  
                            var quantityStock = self.cartProducts[i].inventory[0].qty; console.log("quantityStock"+quantityStock);

                             var maxQuantity = self.cartProducts[i].maxAllowedQty; console.log("first maxQuantity"+maxQuantity);
                             
                             if(quantityStock <= maxQuantity){
                                var maxQuantity = quantityStock;
                             }
                             console.log("maxQuantity"+maxQuantity);
                             var minQuantity = self.cartProducts[i].minimumAllowedQty; console.log("minQuantity"+minQuantity);
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
console.log("quantity"+quantity);
                for(i=0; i<self.cartProducts.length; i++){
                    if(self.cartProducts[i].product_id && self.cartProducts[i].product_id == product_id){
                        self.cartProducts[i].qty = quantity;  
                    }
                 }
                  console.log(" after update "); console.log(self.cartProducts);

                
               
                for(i=0; i<self.cartProducts.length; i++ ){
                    if(self.cartProducts[i]){
                        if(self.cartProducts[i].product_id == product_id){
                            var gTotal = self.cartProducts.grandTotal - self.cartProducts[i].subTotal; //alert("before"+gTotal);

                           self.cartProducts[i].quantity = quantity;
                           self.cartProducts[i].subTotal = self.cartProducts[i].price * self.cartProducts[i].quantity; //alert(grandTotal); alert(self.cartProducts[i].subTotal);
                           gTotal += self.cartProducts[i].subTotal; //alert(grandTotal);
                           self.cartProducts.grandTotal = gTotal; //alert("after"+gTotal);
                        }
                    }
                }
                
                return self.quantity;
            }
            

        cartCtrl.prototype.deleteProductNew = function(product_id){
            $ionicLoading.show();
            $scope.options = [];
            var products = {}; console.log(self.cartProducts);console.log(self.cartProducts.length);
            for(i=0; i<=self.cartProducts.length; i++ ){
                    if(self.cartProducts[i]){
                        if(self.cartProducts[i].product_id == product_id){
                            var sku = self.cartProducts[i].sku;
                            var quantity = self.cartProducts[i].qty;
                            var option = self.cartProducts[i].options;
                            var newOptions = {};
                            if(option){
                                for(j=0; j<option.length; j++){ //console.log(option); console.log(j);
                                    var newOptions = {};
                                    newOptions['key'] = option[j].option_id;
                                    newOptions['value'] = option[j].option_value; //console.log(newOptions);
                                    $scope.options.push(newOptions); //console.log($scope.options);
                                }
                            } else {
                                $scope.options = null;
                            }
                            

                            products['product_id'] = product_id;
                            products['sku'] = sku;
                            products['qty'] = quantity;
                            products['options'] = $scope.options;

                            var p = [products]; //console.log(p);

                            cartSrvc.deleteCartProduct(cartid, p).then(function(response) { console.log(response);
                                if(response.success == 1){

                                    for(i=0; i<=self.cartProducts.length; i++ ){
                                        if(self.cartProducts[i]){
                                            if(self.cartProducts[i].product_id == product_id){
                                                self.cartProducts.splice(i,1);
                                            }
                                            self.cartProducts.total = '';
                                            var cartTotal = self.cartProducts.length;
                                            localStorage.setItem("cartTotal", cartTotal);
                                            self.cartTotal = cartTotal;
                                        }
                                    }

                                    cartSrvc.showToastBanner("Product Successfully deleted from your cart.", "short", "center");
                                    return;
                                } else {
                                    cartSrvc.showToastBanner(response.msg, "short", "center");
                                    return;
                                }
                            }).finally(function(){
                                $ionicLoading.hide();
                            });
                        }
                    }
                }


        }

        cartCtrl.prototype.GoToCheckOut = function(){  console.log(localStorage.getItem("customer_id"));
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
                productSrvc.addToWishlist(product_id, customerId).then(function(response) { console.log("add to wishlist response");console.log(response);
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
                onTap: function(e) { console.log($scope);

                    var coupanCode = self.coupanCode;
                    if(!coupanCode){
                        cartSrvc.showToastBanner("Please Enter your coupan code.", "short", "center");
                        return;
                    }
                    $ionicLoading.show();
                    cartSrvc.applyCoupanCode(cartid, coupanCode).then(function(response) { console.log(response);
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

