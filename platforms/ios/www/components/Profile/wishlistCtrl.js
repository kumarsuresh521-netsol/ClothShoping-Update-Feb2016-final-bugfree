var wishlistCtrl;

wishlistCtrl = (function($state, $stateParams,$rootScope, $scope, profileSrvc, cartSrvc, $ionicLoading, $ionicPopover) {

    function wishlistCtrl($state, $stateParams,$rootScope, $scope, profileSrvc, cartSrvc, $ionicLoading, $ionicPopover) {
       
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
        
        $scope.$on('$stateChangeSuccess', function () {
             $ionicLoading.show();
            profileSrvc.getWishlist(customer_id).then(function(response) { console.log("wishlist response"); console.log(response);
                if(response.success == 1 && response.wish_list_data.length > 0){
                    self.wishlist = response.wish_list_data;
                }

            }).finally(function(){
                $ionicLoading.hide();
            });
        });
//Remove Products from wishlist
        wishlistCtrl.prototype.RemoveFromWishlist = function(index, wishlist_item_id){
            if(wishlist_item_id){
                self.wishlist.splice(index,1); console.log(self.wishlist);
                cartSrvc.showToastBanner("Product remove from wishlist successfully.", "short", "center");
               profileSrvc.removeWishlistItem(wishlist_item_id).then(function(response) { console.log("remove profuct from wishlist response"); console.log(response);
                    //self.wishlist = response.wish_list;
                });
            }
        }
//Add TO cart product
        wishlistCtrl.prototype.AddToCart = function(product_id){
            if(product_id){
               this.state.go("app.product",{'product_id':product_id});
            }
        }
// Go To Cart
        wishlistCtrl.prototype.goToCart = function(){
            if(self.cartTotal > 0){
                this.state.go("app.cart");
            } else {
                cartSrvc.showToastBanner("Cart is empty.", "short", "center");
            }
        }
        //User Popover
          $ionicPopover.fromTemplateUrl('components/Banner/userpopover.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });
    }

    return wishlistCtrl;
})();

profileModule.controller('wishlistCtrl', wishlistCtrl);
