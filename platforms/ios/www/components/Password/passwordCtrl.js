var passwordCtrl;



passwordCtrl = (function($state) {
	


	

    function passwordCtrl(passwordSrvc, $state,$stateParams) {
    //console.log(this);
	this.state = $state ;
	//this.password = passwordSrvc;
	
	 
	}

	passwordCtrl.prototype.add = function(){

		this.IsMatch = false;

		if (this.password1 != this.password2) {
			
    		this.IsMatch=true;
  		}
  			console.log(this);

	}
	
    return passwordCtrl;


})();


passwordModule.controller('passwordCtrl', passwordCtrl);