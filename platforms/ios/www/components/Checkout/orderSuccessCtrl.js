var orderSuccessCtrl;

orderSuccessCtrl = (function($scope,$state,$stateParams, $ionicPopover) {

    function orderSuccessCtrl($scope,$state,$stateParams, $ionicPopover) { //console.log("$scope"); console.log($scope);
        
        this.state = $state;
        var self = this; console.log($stateParams);
        self.order_id = $stateParams.order_id;
        //User Popover
          $ionicPopover.fromTemplateUrl('components/Banner/userpopover.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });
        }
    return orderSuccessCtrl;
})();

checkoutModule.controller('orderSuccessCtrl', orderSuccessCtrl);

