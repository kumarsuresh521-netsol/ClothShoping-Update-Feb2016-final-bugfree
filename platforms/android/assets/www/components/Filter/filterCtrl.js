var filterCtrl;


filterCtrl = (function($rootScope,$scope,$ionicSideMenuDelegate,$state) {

    function filterCtrl($rootScope,$scope,$ionicSideMenuDelegate,$state) {
        
       this.showMe = false;
       this.colorShow = false;
       this.priceShow = true;
       this.state = $state;
       this.rootScope = $rootScope;
        
        var self = this;
        
        if(localStorage.getItem("cartTotal") && localStorage.getItem("cartid")){
            self.cartTotal = localStorage.getItem("cartTotal");    
        } else {
            self.cartTotal = 0;
        }
    

   filterCtrl.prototype.showList = function(){
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

  filterCtrl.prototype.showPrice = function(){
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


  filterCtrl.prototype.showColor = function(){
    //console.log(this.showMe);
        //console.log(this.priceShow);
    if(this.showMe == true || this.priceShow == true && this.colorShow == false){

      this.showMe = false;
      this.priceShow = false;
      this.colorShow = true;
      
    }
  }
}


    return filterCtrl;

})();
filterModule.controller('filterCtrl', filterCtrl);