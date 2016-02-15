var orderDetailCtrl;

orderDetailCtrl = (function($state,$rootScope, $stateParams, $scope, profileSrvc, $ionicLoading, $ionicPopover) {

    function orderDetailCtrl($state,$rootScope, $stateParams, $scope, profileSrvc, $ionicLoading, $ionicPopover) {
       
       $ionicLoading.show(); 
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
    
        var orderId = $stateParams.orderId;
        
        if(orderId){
            profileSrvc.getMyOrderDetail(orderId).then(function(response) { //console.log("order details response"); //console.log(response);
              if(response.success == 1){
                self.orderDetail = response.order;
              } else {
                alert("Server Error!");
              }
                
            }).finally(function(){
                $ionicLoading.hide();
            });
        } else {
            $ionicLoading.hide();
        }

        //User Popover
          $ionicPopover.fromTemplateUrl('components/Banner/userpopover.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });
    }

    return orderDetailCtrl;
})();

profileModule.controller('orderDetailCtrl', orderDetailCtrl);
