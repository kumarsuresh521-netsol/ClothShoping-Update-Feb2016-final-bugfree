var paymentCtrl;

paymentCtrl = (function($scope,$ionicSideMenuDelegate,$state, cartSrvc, checkoutSrvc, $ionicLoading, $ionicPopover) {

    function paymentCtrl($scope,$state,cartSrvc, checkoutSrvc, $ionicLoading, $ionicPopover) { //////console.log("$scope"); ////console.log($scope);
        $ionicLoading.show();
        this.state = $state;
        var self = this;
        
        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartid")){
            self.cartTotal = localStorage.getItem("cartTotal");    
        } else {
            self.cartTotal = 0;
        }

        var cartid = localStorage.getItem("cartid");
        var customerId = localStorage.getItem("customer_id");

        
            
            checkoutSrvc.getUserCheckoutMethods(cartid).then(function(response) { ////console.log(" payment....");////console.log(response);
                if(response.success == 1){
                    self.shippingMethod = {};
                    self.paymentMethod = {};
                    self.shippingMethod = response.data.shipping_methods;
                    self.paymentMethod = response.data.payment_methods;
                }
                

            }).finally(function(){
                $ionicLoading.hide();   
            });

 //Payment.html Payment Infomation
        paymentCtrl.prototype.PaymentInfo = function(){
            var shippingm = self.shippingm;
            var paymentm = self.paymentm;
            
            if(!shippingm){
                cartSrvc.showToastBanner("Shipping method is required.", "short", "center");
                return;
            }

            if(!paymentm){
                cartSrvc.showToastBanner("Payment method is required.", "short", "center");
                return;
            }

            $ionicLoading.show();          
            checkoutSrvc.saveShippingAndPaymentMethods(customerId, cartid, shippingm, paymentm).then(function(response) {
               ////console.log("shippping/payment method update"); ////console.log(response);
            }).finally(function(){
                $ionicLoading.hide();
                $state.go("app.orderreview");
            });        
        }
           //User Popover
          $ionicPopover.fromTemplateUrl('components/Banner/userpopover.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });
    }
    return paymentCtrl;
})();

checkoutModule.controller('paymentCtrl', paymentCtrl);

