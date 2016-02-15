var productCompareCtrl;

productCompareCtrl = (function($rootScope,$scope,$state,productSrvc, $ionicSideMenuDelegate, $ionicLoading, cartSrvc, $ionicHistory, $ionicPopover) {

    function productCompareCtrl($rootScope,$scope,productSrvc,$state,$stateParams, $ionicSideMenuDelegate, $ionicLoading, cartSrvc, $ionicHistory, $ionicPopover) {
            $ionicLoading.show();
            
           this.state = $state;
           var self = this;
           
           
           if(localStorage.getItem("cartTotal") && localStorage.getItem("cartTotal") != 'NaN' && localStorage.getItem("cartid") && localStorage.getItem("cartid") != 'NaN' ){
                self.cartTotal = localStorage.getItem("cartTotal");    
            } else {
                self.cartTotal = '0';
            }
           

             var product_one = window.localStorage.getItem('compare_product_one_id');
             $ionicLoading.show();
             if(product_one && product_one != 'NULL'){
                productSrvc.getData(product_one).then(function(response) { //console.log('product_one');//console.log(response);
                    self.pCOData = response;
                    if(self.pCOData.special_price){
                        self.pCOData.discount = (1 - (self.pCOData.special_price / self.pCOData.price)) * 100;
                    }
                 }).finally(function(){
                    $ionicLoading.hide();
                 });
             }

             var product_two = window.localStorage.getItem('compare_product_two_id');
             $ionicLoading.show();
             if(product_two && product_two != 'NULL'){
                productSrvc.getData(product_two).then(function(response) { //console.log('response');//console.log(response);
                    self.pCTData = response;
                    if(self.pCTData.special_price){
                        self.pCTData.discount = (1 - (self.pCTData.special_price / self.pCTData.price)) * 100;
                    }
                 }).finally(function(){
                    $ionicLoading.hide();
                 });
             }
           
           productCompareCtrl.prototype.addToCart = function(product_id){
            this.state.go("app.product",{ 'product_id':product_id });
            return;
           }

         productCompareCtrl.prototype.addToWishlist = function(product_id){
            var customerId = localStorage.getItem('customer_id');

            if(customerId && customerId != ''){
                productSrvc.addToWishlist(product_id, customerId).then(function(response) { //console.log("add to wishlist response");//console.log(response);
                    if(response.success == 1){
                        cartSrvc.showToastBanner("Product Successfully Added To Your Wishlist.", "short", "center");
                    } else {
                        cartSrvc.showToastBanner("Opps ! Some Server issue.", "short", "center");
                    }
                    
                });
            } else {
                $state.go("app.login",{ 'route': 'banner' });
            }

            
        }


        productCompareCtrl.prototype.goToCart = function(){
            if(self.cartTotal > 0){
                this.state.go("app.cart");
            } else {
                cartSrvc.showToastBanner("Cart is empty.", "short", "center");
            }
        }


        productCompareCtrl.prototype.removeToCampare = function(product_id){
           
            if(product_id){
                var product_one = window.localStorage.getItem('compare_product_one_id');
                var product_two = window.localStorage.getItem('compare_product_two_id');

                    if(product_one == product_id){
                        window.localStorage.removeItem('compare_product_one_id');

                        if(product_two){
                            window.localStorage.setItem('compare_product_one_id',product_two);

                            window.localStorage.removeItem('compare_product_two_id');
                        }

                    } else {
                        window.localStorage.removeItem('compare_product_two_id');
                    }

                cartSrvc.showToastBanner("Product removed successfully.", "short", "center");
                
                    if(product_one || product_two){
                        
                    } else {
                        this.state.go("app.banner");
                        return;
                    }
            } else {
                cartSrvc.showToastBanner("Server Error.", "short", "center");
            }

            $state.reload();
        }


        productCompareCtrl.prototype.addToCompare = function(product_id){ 
            
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

    return productCompareCtrl;
})();

productModule.controller('productCompareCtrl', productCompareCtrl);

