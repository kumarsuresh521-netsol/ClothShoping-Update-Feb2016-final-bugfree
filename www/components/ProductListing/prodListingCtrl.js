var prodListingCtrl;



prodListingCtrl = (function($rootScope, $scope, $state, $ionicLoading, prodListingSrvc, $ionicPopover, cartSrvc, bannerSrvc) {

	function prodListingCtrl($rootScope,  $scope, prodListingSrvc , $state , $stateParams, $ionicLoading, $ionicPopover, cartSrvc, bannerSrvc) {
        //console.log($stateParams);
        this.state = $state;
        var self = this;
        this.showMe = false;
        this.showListing = true;
        this.scope = $scope;

        this.colorShow = false;
        this.priceShow = true;

        self.ShowProducts = true;

        this.searchproducts = $rootScope.srch;

        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartTotal") != 'NaN' && localStorage.getItem("cartid") && localStorage.getItem("cartid") != 'NaN' ){
            self.cartTotal = localStorage.getItem("cartTotal");    
        } else {
            self.cartTotal = '0';
        }
            
            if($stateParams.category_id == "filter"){ //alert("filter");
            $ionicLoading.show();

            var OptionsValuePrice = localStorage.getItem("OptionsValuePrice"); //localStorage.removeItem("OptionsValuePrice");
            var OptionsValueColor = localStorage.getItem("OptionsValueColor"); //localStorage.removeItem("OptionsValueColor");
            var OptionsValueManufacturer = localStorage.getItem("OptionsValueManufacturer"); //localStorage.removeItem("OptionsValueManufacturer");
            var category_id = localStorage.getItem("OptionsValueCategoryId"); //localStorage.removeItem("OptionsValueCategoryId");
            var category_name = $stateParams.category_name;
////console.log(category_id); //console.log(OptionsValueColor); //console.log(OptionsValueManufacturer); //console.log(OptionsValuePrice); //console.log(category_name); return;
            var price = '';
            var color = '';
            var manufacturer = '';

            if(OptionsValuePrice && OptionsValuePrice != 'undefined' && OptionsValuePrice != ''){
                var price = OptionsValuePrice;
            }
            
            if(OptionsValueColor && OptionsValueColor != 'undefined' && OptionsValueColor != ''){
                var color = OptionsValueColor;
            }

            if(OptionsValueManufacturer && OptionsValueManufacturer != 'undefined' && OptionsValueManufacturer != ''){
                var manufacturer = OptionsValueManufacturer;
            }

                prodListingSrvc.getFilterData(category_id, color, manufacturer, price).then(function(response) { //console.log(response);
                  if(response.success == 1 && response.data.products.length > 0){
                      self.prodListing = response.data.products;
                      self.ShowProducts = true;
                  } else { 
                    self.ShowProducts = false; 
                    //return;
                  }
                    
                    self.category_id = category_id;
                    self.categoryHeading = category_name;
                }).finally(function(){
                    $ionicLoading.hide();
                });
            } else if($stateParams.category_id == "new"){ //alert("new");
            $ionicLoading.show();
                var category_name = $stateParams.category_name;
            //New Products Listing....
                bannerSrvc.getBdataSecond().then(function(response) { //console.log(response);
                    if(response.length > 0){
                      self.prodListing = response;
                      self.ShowProducts = true;
                    } else { 
                      self.ShowProducts = false; 
                      //return;
                    }
                    
                    self.categoryHeading = category_name;
                }).finally(function(){
                  $ionicLoading.hide();
                });
            } else if($stateParams.category_id == "special"){ //alert("special");
            $ionicLoading.show();
                var category_name = $stateParams.category_name;
            //Special Products Listing....
                bannerSrvc.getBdataSpecial().then(function(response) {
                    if(response.length > 0){
                      self.prodListing = response;
                      self.ShowProducts = true;
                    } else { 
                      self.ShowProducts = false; 
                      //return;
                    }
                    
                    self.categoryHeading = category_name;
                }).finally(function(){
                  $ionicLoading.hide();
                });
            } else if($stateParams.category_id){ // alert("other");
            $ionicLoading.show();
                var category_id = $stateParams.category_id;
                var category_name = $stateParams.category_name;
            
          
                prodListingSrvc.getCdata(category_id).then(function(response) { //console.log(response);
                  if(response.success == 1 && response.data.products.length > 0){

                    for(i=0; i<response.data.products.length; i++){
                      if(response.data.products[i].specialprice){
                          response.data.products[i].finalprice = response.data.products[i].specialprice;
                      } else {
                        response.data.products[i].finalprice = response.data.products[i].regularprice;
                      }
                      
                    }

                      self.prodListing = response.data.products;
                      self.ShowProducts = true;
                  } else { 
                    self.ShowProducts = false; 
                    //return;
                  }
                    
                    self.category_id = category_id;
                    self.categoryHeading = category_name;
                }).finally(function(){
                    $ionicLoading.hide();
                });
           } else {
              //this.state.go("app.banner");
           }
    
  
    prodListingCtrl.prototype.goToFilters = function(category_id){
			this.state.go("app.filter",{category_id:category_id,category_name:category_name});
    }

    prodListingCtrl.prototype.showMeSearch = function(){
      if(this.showMe == false){ 
        this.showMe = true;
      } else {
        this.showMe = false;
      }
    }

    prodListingCtrl.prototype.showMeSelect = function(){
    		if(this.showListing == false){ 
				this.showListing = true; 
			} else {
				this.showListing = false;
			}
    }

    prodListingCtrl.prototype.myclick = function(val){
        this.showListing = true;
        this.selectPrice = val;
    }

    prodListingCtrl.prototype.myclickfilter = function(){ //alert("hh");

        var min = 100; var max = 200;
         this.searchproducts = function(x) { //alert("h"); //console.log(x);
            return x.regularprice > min && x.regularprice <= max;
        };
    }


   prodListingCtrl.prototype.fetchDetail = function(product_id){
    this.state.go("app.product",{ 'product_id':product_id });
   }

   prodListingCtrl.prototype.showList = function(){
        ////console.log(this.showMe);
        ////console.log(this.priceShow);

      if(this.showMe == false && this.priceShow == true){

        this.priceShow = false;
        this.showMe = true;
        this.colorShow = false;
        
      }else if(this.showMe == false && this.priceShow == false){

        this.colorShow = false;
        this.showMe  = true;
      }
    }

 
        // Go To Cart
        prodListingCtrl.prototype.goToCart = function(){
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


	 
   
    return prodListingCtrl;


})();


prodListingModule.controller('prodListingCtrl', prodListingCtrl);