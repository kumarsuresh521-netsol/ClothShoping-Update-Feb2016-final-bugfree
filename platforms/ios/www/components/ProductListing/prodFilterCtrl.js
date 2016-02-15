var prodFilterCtrl;



prodFilterCtrl = (function($rootScope, $scope, $state, $ionicLoading, prodListingSrvc, $ionicPopover, cartSrvc) {

	function prodFilterCtrl($rootScope,  $scope, prodListingSrvc , $state , $stateParams, $ionicLoading, $ionicPopover, cartSrvc) {
        
        this.state = $state;
        var self = this;
        this.scope = $scope;
        //this.price = {};
        //this.color = {};
        //this.manufacturer = {};

        this.colorShow = false;
        this.priceShow = true;
        this.manufacturerShow = false;

        self.ShowProducts = true;

        this.searchproducts = $rootScope.srch;
//console.log($stateParams);
        if($stateParams.category_id){
          
          var category_id = $stateParams.category_id;
          var category_name = $stateParams.category_name;
          
          if(localStorage.getItem("cartTotal") && localStorage.getItem("cartTotal") != 'NaN' && localStorage.getItem("cartid") && localStorage.getItem("cartid") != 'NaN' ){
              self.cartTotal = localStorage.getItem("cartTotal");    
          } else {
              self.cartTotal = '0';
          }
          
          $ionicLoading.show();
          prodListingSrvc.getFilterOptions(category_id).then(function(response) {
              if(response.success == 1){
                self.filters = response.data;
              }
              
          }).finally(function(){
            $ionicLoading.hide();
          });

        } else {
          return;
        }



    prodFilterCtrl.prototype.showOption = function(option_code){
      switch (option_code){
         case 'manufacturer' :
                  this.colorShow = false;
                  this.priceShow = false;
                  this.manufacturerShow = true;
                  return true;
              case 'color':
                  this.colorShow = true;
                  this.priceShow = false;
                  this.manufacturerShow = false;
                  return true;
              case 'price':
                  this.colorShow = false;
                  this.priceShow = true;
                  this.manufacturerShow = false;
                  return true;
          }
    }

    prodFilterCtrl.prototype.filterDone = function(){ //alert("done"); console.log(this);
      var OptionsValue = [];
      var price = [];

      if(this.price){
        angular.forEach(this.price.p, function(value, key) {
          if(key != 'undefined'){
            var price1 = key.replace("$",'');
            var price2 = price1.replace("$",''); //alert(price2);
            var price3 = price2.replace(" and above",'-');
            var price4 = price3.replace(" ",'');
            var price5 = price4.replace(" ",'');
            var price6 = price5.replace(" ",'');

            price.push(price6); 
          }
        });
      }
       //console.log(price);

      var color = [];

      if(this.color){
        angular.forEach(this.color.c, function(value, key) {
          if(key != 'undefined'){
            var color1 = key.replace("$",'');
            var color2 = color1.replace("$",'');
            color.push(color2); 
          }
          
        });
      }
       //console.log(color);

      var manufacturer = [];

      if(this.manufacturer){
        angular.forEach(this.manufacturer.m, function(value, key) {
          if(key != 'undefined'){
            var manufacturer1 = key.replace("$",'');
            var manufacturer2 = manufacturer1.replace("$",'');
            manufacturer.push(manufacturer2); 
          }
          
        });
      }
    //  console.log("price"); console.log(price);
//console.log(localStorage.getItem("OptionsValuePrice"));
      localStorage.setItem("OptionsValuePrice",price); //console.log(localStorage.getItem("OptionsValuePrice"));
      localStorage.setItem("OptionsValueColor",color); //console.log(localStorage.getItem("OptionsValueColor"));
      localStorage.setItem("OptionsValueManufacturer",manufacturer); //console.log(localStorage.getItem("OptionsValueManufacturer"));
      localStorage.setItem("OptionsValueCategoryId",category_id); //console.log(localStorage.getItem("OptionsValueCategoryId"));
     // var filtersValue = category_name+","+category_id+","+this.color+","+this.manufacturer+","+this.price; console.log(filtersValue);
       self.state.go("app.prodListing", {'category_id':'filter', 'category_name':category_name});
     // console.log(this);
    }
  
    prodFilterCtrl.prototype.showMeSearch = function(){
			if(this.showMe == false){ 
				this.showMe = true;
			} else {
				this.showMe = false;
			}
    }

    prodFilterCtrl.prototype.showMeSelect = function(){
    		if(this.showListing == false){ 
				this.showListing = true; 
			} else {
				this.showListing = false;
			}
    }

    prodFilterCtrl.prototype.myclick = function(val){
        this.showListing = true;
        this.selectPrice = val;
    }

    prodFilterCtrl.prototype.myclickfilter = function(){ //alert("hh");

        var min = 100; var max = 200;
         this.searchproducts = function(x) { //alert("h"); console.log(x);
            return x.regularprice > min && x.regularprice <= max;
        };
    }


   prodFilterCtrl.prototype.showList = function(){
        //console.log(this.showMe);
        //console.log(this.priceShow);

      if(this.showMe == false && this.priceShow == true){

        this.priceShow = false;
        this.showMe = true;
        this.colorShow = false;
        
      }else if(this.showMe == false && this.priceShow == false){

        this.colorShow = false;
        this.showMe  = true;
      }
    }

  prodFilterCtrl.prototype.showPrice = function(){
     //console.log(this.showMe);
     //console.log(this.priceShow);
    if(this.showMe == true && this.priceShow == false){

      this.showMe = false;
      this.priceShow = true;
      this.colorShow = false;
      
    }else if (this.showMe == false && this.priceShow == false){

        this.colorShow = false;
        this.priceShow  = true;
    }
  }  

  prodFilterCtrl.prototype.showColor = function(){
    //console.log(this.showMe);
    //    console.log(this.priceShow);
    if(this.showMe == true || this.priceShow == true && this.colorShow == false){

      this.showMe = false;
      this.priceShow = false;
      this.colorShow = true;
      
    }
  }
        // Go To Cart
        prodFilterCtrl.prototype.goToCart = function(){
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

    return prodFilterCtrl;


})();


prodListingModule.controller('prodFilterCtrl', prodFilterCtrl);