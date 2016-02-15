var trackCtrl;



trackCtrl = (function($state) {
	


    function trackCtrl(profileSrvc, $state,$stateParams) {
    	
	this.state = $state ;
	 
	}

	trackCtrl.prototype.ShowHide = function(){

		

	this.IsVisible = true;	

	this.IsVisible = this.trackOrder;

	}

    return trackCtrl;


})();


trackModule.controller('trackCtrl', trackCtrl);