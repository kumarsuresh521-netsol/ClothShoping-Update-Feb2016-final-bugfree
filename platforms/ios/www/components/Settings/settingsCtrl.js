var settingsCtrl;



settingsCtrl = (function($state) {
	


    function settingsCtrl(profileSrvc, $state,$stateParams) {
    	
	this.state = $state ;
	this.IsVisible = false;
	}

	settingsCtrl.prototype.ShowDiv = function(){

		if(this.IsVisible == false){ 
			this.IsVisible = true;
		} else {
			this.IsVisible = false;
		}

	}

    return settingsCtrl;


})();


settingsModule.controller('settingsCtrl', settingsCtrl);