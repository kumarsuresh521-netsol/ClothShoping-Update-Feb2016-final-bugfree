var menuCtrl;
//menuModule.$inject = [$state];
menuCtrl = (function($state ,$rootScope,$scope,$timeout, $ionicLoading, menuSrvc) {

    
    function menuCtrl($scope , $rootScope , $state,$timeout, $ionicLoading, menuSrvc) {
////console.log($scope); 
        this.state = $state ;
        this.menuSrvc= menuSrvc;
        var mycategories = {};
        var self = this;
        //console.log("rootsoup222"); //console.log($rootScope);

       // alert(localStorage.getItem("customer_id")); alert(localStorage.getItem("firstname")); 
        if(localStorage.getItem("customer_id")){ 
            self.username = localStorage.getItem("firstname");
        } else {
            self.username = "Guest1";
        }

        //if($rootScope.current_user.firstname){
        //    self.username =  $rootScope.current_user.firstname;
        //}

        $ionicLoading.show();
        self.menuSrvc.getCategories().then(function(response) { //console.log("menu categories.."); //console.log(response);
            //menushowCat(response);
            if(response.success == 1){
                self.youcategories = response.data.children[0].children;
            }
            
        }).finally(function(){
            $ionicLoading.hide();
        });

        var i = 0;

        function menushowCat(response){ //console.log(response);
            if(response.length > 0 ){
                if(response[i]){
                    if(response[i].parent_id == 2){
                        mycategories[i] = response[i];
                        self.youcategories = mycategories;
                    }
                    i++;
                    menushowCat(response);
                }
            }
        }

        self.rootscope = $rootScope; 

       menuCtrl.prototype.getSub = function(index, position_id, category_id, category_name) {
            var myarray = [];
            for(x in self.youcategories){
                myarray.push(self.youcategories[x]);
            } ////console.log("myarray"); alert(index);
////console.log(myarray); alert(myarray[index].children.length);
            if (myarray[index].children.length > 0){ ///alert("hi");
                self.state.go("app.home",{'category_id':category_id, 'category_name':category_name});
            } else {
              self.state.go("app.prodListing", {'category_id':category_id, 'category_name':category_name});
            }
        }

         menuCtrl.prototype.toggleGroup = function(group) {
            if (this.isGroupShown(group)) {
              this.shownGroup = null;
            } else {
              this.shownGroup = group;
            }
          }
          menuCtrl.prototype.isGroupShown = function(group) {
            return this.shownGroup === group;
          }

        menuCtrl.prototype.nav = function(state) {
            self.state.go(state);
        }
    }
 

return menuCtrl;
    
})();



menuModule.controller('menuCtrl', menuCtrl);
