var bannerCtrl;

bannerCtrl = (function($rootScope, $scope,loginSrvc, $ionicSideMenuDelegate,$state, $ionicNavBarDelegate, $ionicLoading, $ionicHistory, homeSrvc, prodListingSrvc, cartSrvc, $ionicPopover,$timeout) {
    function bannerCtrl($rootScope,loginSrvc, $scope,bannerSrvc,$ionicNavBarDelegate, $ionicSideMenuDelegate,$state, $ionicLoading, $ionicHistory, homeSrvc, prodListingSrvc, cartSrvc, $ionicModal, $ionicPopover, $timeout) {

       this.state = $state;
       this.scope = $scope;
       this.rootScope = $rootScope;
       this.showProfile = false;
        
        var self = this;
// Hide back button on page..
        $ionicNavBarDelegate.showBackButton(false);
        
        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartTotal") != 'NaN' && localStorage.getItem("cartid") && localStorage.getItem("cartid") != 'NaN' ){
            self.cartTotal = localStorage.getItem("cartTotal");    
        } else {
            self.cartTotal = '0';
        }
        
            $ionicLoading.show();

            this.categories = homeSrvc.children[0].children;// ////console.log("hime servies");////console.log(this.categories);

            var prodCatListing = {};

            var i = 0;

            if(this.categories.length > 0){
                showCat(this.categories);
            }

             bannerCtrl.prototype.cartId = function(){
                loginSrvc.chkLogin2().then(function(response) {
                      alert(response); //////console.log("response"); ////console.log(response);
                   });
            }

            function showCat(categories){ //////console.log(i); ////console.log(categories)
                if(categories[i]){
                prodListingSrvc.getCdata(categories[i].category_id).then(function(response) { //////console.log("hime servies");////console.log(response);
                        //response[i].category_name = this.categories[i].name;
                        if(response.data.products.length > 0 ){ 
                            if(categories[i]){
                                if(response.success == 1){
                                      prodCatListing[i] = response.data.products;
                                        prodCatListing[i].name = categories[i].name;
                                        prodCatListing[i].category_id = categories[i].category_id;
                                        self.prodCatListing = prodCatListing;  //////console.log("sfsfdsdf servies"); ////console.log(self.prodCatListing);
                                  } else {
                                    return;
                                  }
                                
                            }
                        }
                        i++;
                        showCat(categories);
                    });
                }
            }

            bannerSrvc.getBdata().then(function(response) {
                self.category = response.banners;
            });
           
            bannerSrvc.getBdataSecond().then(function(response) {
                if(response.length > 0){
                    self.categoryBanners = response;
                }
            });

            bannerSrvc.getBdataSpecial().then(function(response) { //////console.log("Special Banner"); ////console.log(response);
                if(response.length > 0){
                    self.categoryBannersSpecial = response;
                }
                
            }).finally(function(){
              $ionicLoading.hide();
            });

        bannerCtrl.prototype.goToCart = function(product_id){
            if(self.cartTotal > 0){
                this.state.go("app.cart");
            } else {
                cartSrvc.showToastBanner("Cart is empty.", "short", "center");
            }
            
        }

        bannerCtrl.prototype.fetchDetail = function(product_id){
   
            this.state.go("app.product",{ 'product_id':product_id });
        
           }
        bannerCtrl.prototype.hideProf = function(){

            this.showProfile = false;
        
        }

        bannerCtrl.prototype.showMeProfile = function(){ //alert("HI");

            if(this.showProfile == false){
                this.showProfile = true;
            } else {
                this.showProfile = false;
            }
        
         }

        bannerCtrl.prototype.getSub = function(category_id, category_name) {
            this.state.go("app.prodListing", {'category_id':category_id, 'category_name':category_name});
        }

        bannerCtrl.prototype.userNav = function(nav) {
            $scope.popover.hide();
            if(nav == 'logout'){
                localStorage.setItem("email", '');
                localStorage.setItem("firstname", '');
                localStorage.setItem("lastname", '');
                localStorage.setItem("customer_id", '');
                alert("You Logout Successfully");
                //this.state.go("app.login");
                return;
            } else {
                this.state.go(nav);
            }
            
        }
//User Popover
          $ionicPopover.fromTemplateUrl('components/Banner/userpopover.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });

    }
    return bannerCtrl;
})();

bannerModule.controller('bannerCtrl', bannerCtrl);

