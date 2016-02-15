var orderReviewCtrl;

orderReviewCtrl = (function($scope,$ionicSideMenuDelegate,$state, cartSrvc, checkoutSrvc, $ionicLoading, $ionicPopover) {

    function orderReviewCtrl($scope,$state,cartSrvc, checkoutSrvc, $ionicLoading, $ionicPopover) { //////console.log("$scope"); ////console.log($scope);
        
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
            cartSrvc.getCartProducts(cartid).then(function(response) { ////console.log(response);
                    self.cartProducts = response;
             }).finally(function(){
                $ionicLoading.hide();
            });

 //Payment.html Payment Infomation
        orderReviewCtrl.prototype.GoToSuccess = function(){
            $ionicLoading.show();          
            checkoutSrvc.placeOrder(cartid).then(function(response) {
               ////console.log("order placed"); ////console.log(response);
               $ionicLoading.hide();
               localStorage.removeItem("cartTotal");
               localStorage.removeItem("cartid");
                cartSrvc.showToastBanner("Your Order is placed successfully.", "short", "center");
                $state.go("app.success", {"order_id":response.order_id}); 
            });
        }
        //User Popover
          $ionicPopover.fromTemplateUrl('components/Banner/userpopover.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });
    }
    return orderReviewCtrl;
})();

checkoutModule.controller('orderReviewCtrl', orderReviewCtrl);

