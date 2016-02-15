var productCtrl;

productCtrl = (function($rootScope,$scope,$state,productSrvc, $ionicSideMenuDelegate, $ionicLoading, cartSrvc, $ionicHistory, $ionicPopover) {

    function productCtrl($rootScope,$scope,productSrvc,$state,$stateParams, $ionicSideMenuDelegate, $ionicLoading, cartSrvc, $ionicHistory, $ionicPopover) {
            $ionicLoading.show();
            
            
           this.state = $state;
           var self = this;
           
           
           if(localStorage.getItem("cartTotal") && localStorage.getItem("cartTotal") != 'NaN' && localStorage.getItem("cartid") && localStorage.getItem("cartid") != 'NaN' ){
                self.cartTotal = localStorage.getItem("cartTotal");    
            } else {
                self.cartTotal = '0';
            }

            if($stateParams.product_id){
                var product_id = $stateParams.product_id;

                productSrvc.getData(product_id).then(function(response) { console.log('response');console.log(response);
                    self.pdata = response;
                    self.productid = response.product_id;
                    if(self.pdata.special_price){
                        self.discount = (1 - (self.pdata.special_price / self.pdata.price)) * 100;
                    }
                 }).finally(function(){
                    $ionicLoading.hide();
                 });
            } else {
                $ionicLoading.hide();
                this.state.go("app.banner");
            }
            
           productCtrl.prototype.addToCart = function(id){ console.log(self.Color); console.log(self.Manufacturers); console.log(self.Size);
                $scope.options = [];
         // Check Options are selected or not...
        /* if(self.pdata.optionid){ console.log("HI");   
                if(self.Color == '' || self.Color == 'undefined' || self.Color == 'null' || self.Color == undefined){
                        cartSrvc.showToastBanner("Please Select Color options.", "short", "center");
                        return;
                    }

                    if(self.Manufacturers == '' || self.Manufacturers == 'undefined' || self.Manufacturers == 'null' || self.Manufacturers == undefined){
                        cartSrvc.showToastBanner("Please Select Manufacturers options.", "short", "center");
                        return;
                    }

                    if(self.Size == '' ||self.Size == 'undefined' || self.Size == 'null' || self.Size == undefined){
                        cartSrvc.showToastBanner("Please Select Size options.", "short", "center");
                        return;
                    }
            } */
        // Options code end here...
                $ionicLoading.show();
                if(self.pdata.optionid){
                var options1 = {};
                var options2 = {};
                var options3 = {};

                var opt = {};
                for(i=0; i<self.pdata.optionid.length; i++){ 
                    var oid = self.pdata.optionid[i].option_id;
                    var ovalue = self.pdata.optionid[i].title;
                    
                    if(i == 0){
                        options1['key'] = oid;
                        options1['value'] = self.Color;
                        $scope.options.push(options1);
                    } else if(i == 1){
                        options2['key'] = oid;
                        options2['value'] = self.Manufacturers;
                        $scope.options.push(options2);
                        
                    } else if(i == 2){
                        options3['key'] = oid;
                        options3['value'] = self.Size;
                        $scope.options.push(options3);
                    }
                }
                
                //options = {[options1], [options2], [options3]};
                
               } else {
                $scope.options = null;
               }
               //console.log($scope.options);
                var products = {};
                 var request = {};
                products['product_id'] = self.pdata.product_id;
                products['quantity'] = '1';
                products['sku'] = self.pdata.sku;
                products['options'] = $scope.options;
                products['bundle_option'] = null;
                products['bundle_option_qty'] = null;
                products['links'] = null;
                
                var products1 = [products];

                var customer = {};

               if(localStorage.getItem('customer_id')){
                    customer['customer_as_guest'] = false;
                    customer['customer_id'] = localStorage.getItem('customer_id');
               } else {
                    customer['customer_as_guest'] = true;
                    customer['customer_id'] = null;
               }
                
                
                
                if(localStorage.getItem("cartid") && localStorage.getItem("cartid") != '' && localStorage.getItem("cartid") != 'undefined'){
                    var cartid = localStorage.getItem("cartid");
                } else {
                    var cartid = null;
                }
                
               // alert(cartid);
                request["products"]= products1;
                request["customer"]= customer;
                request["shopping_cart_id"]= cartid;
                //console.log(self.pdata);
                //console.log(request);


                       /* $ionicLoading.hide();
                        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartTotal") != 'NaN' && localStorage.getItem("cartid") && localStorage.getItem("cartid") != 'NaN' ){
                            var cartTotal = localStorage.getItem("cartTotal");
                        } else {
                            var cartTotal = 0;
                        }
                        self.cartTotal = parseInt(cartTotal) + 1; */
                        //cartSrvc.showToastBanner("Product is add to cart successfully.", "short", "center");



                productSrvc.addToCart(request).then(function(response) { console.log("add to cart response");console.log(response);
                        
                    if(response.errorMsg){
                        $ionicLoading.hide();
                        cartSrvc.showToastBanner(response.errorMsg, "short", "center");
                        return;
                    }else if(response.data.cart_id){
                        localStorage.setItem("cartid", response.data.cart_id);
                        var cartTotal = response.data.items_count;
                        localStorage.setItem("cartTotal", cartTotal);
                        self.cartTotal = cartTotal;
                        
                        $ionicLoading.hide();
                        
                        cartSrvc.showToastBanner(response.msg, "short", "center");
                    }
                }); 

                $ionicHistory.nextViewOptions({
                  disableBack: true
                });
         }

         
         productCtrl.prototype.fetchDetail = function(product_id){
            this.state.go("app.product",{ 'product_id':product_id });
         }

         productCtrl.prototype.addToWishlist = function(product_id){
            $ionicLoading.show();
            var customerId = localStorage.getItem('customer_id');

            if(customerId && customerId != ''){
                productSrvc.addToWishlist(product_id, customerId).then(function(response) { console.log("add to wishlist response");console.log(response);
                    if(response.success == 1){
                        cartSrvc.showToastBanner("Product Successfully Added To Your Wishlist.", "short", "center");
                    } else {
                        cartSrvc.showToastBanner("Opps ! Some Server issue.", "short", "center");
                    }
                    
                });
                $ionicLoading.hide();
            } else {

                cartSrvc.showToastBanner("Please login first.", "short", "center");
                $ionicLoading.hide();
                $state.go("app.login",{ 'route': 'banner' });
                return;
            }
        }

        productCtrl.prototype.goToProductDetails = function(product_id){
            this.state.go("app.product",{ 'product_id':product_id });
        }

        productCtrl.prototype.goToCart = function(){
            if(self.cartTotal > 0){
                this.state.go("app.cart");
            } else {
                cartSrvc.showToastBanner("Cart is empty.", "short", "center");
            }
        }

        productCtrl.prototype.addToShare = function(){
            window.plugins.socialsharing.share(self.pdata.name, self.pdata.name, self.pdata.productimage[0].url);
        }



        productCtrl.prototype.addToCompare = function(product_id){ 
            
            if(product_id){
                var product_one = window.localStorage.getItem('compare_product_one_id');
                var product_two = window.localStorage.getItem('compare_product_two_id');
//alert(product_id); alert(product_one); alert(product_two);
                if(product_one != product_id && product_two != product_id){
                    if(product_two){
                        cartSrvc.showToastBanner("Your Compare cart is full.", "short", "center");
                    } else {
                        
                        if(product_one){
                            window.localStorage.setItem('compare_product_two_id', product_id);
                        } else {
                            window.localStorage.setItem('compare_product_one_id', product_id);
                        }
                        cartSrvc.showToastBanner("Your product is add to compare successfully.", "short", "center");
                    }
                } else {
                    cartSrvc.showToastBanner("Already added to compare cart.", "short", "center");
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

    return productCtrl;
})();

productModule.controller('productCtrl', productCtrl);

