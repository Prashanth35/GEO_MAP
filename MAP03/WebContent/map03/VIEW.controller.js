sap.ui.controller("map03.VIEW", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf map03.VIEW
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf map03.VIEW
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf map03.VIEW
*/
	onAfterRendering: function() {
		var me = this;
		this.loadGoogleMaps("https://maps.googleapis.com/maps/api/js?key=AIzaSyCbx0eWo5LTBbn886JxaStcAu0O1VN4eD8", me.setMapData.bind(me));
	},
	
	loadGoogleMaps: function(scriptUrl, callbackFn) {
		var script = document.createElement('script');
		script.onload = function() {
	        callbackFn();
		}
		script.src = scriptUrl;
		document.body.appendChild(script);
	},
	
	
	
	
	

	    setMapData: function() {
	    	 var info=["HYd",
	    		       "MUMBAI"]
	    	var postalCodes = ([ 
			    '508205', 
	    		'503230'// Dresden
			  // Hamburg
			]);
	    	
	    	
	        var myCenter = new google.maps.LatLng(20.59,78.96);
	        var mapProp = {center:myCenter, zoom:5, scrollwheel:true, draggable:true, mapTypeId:google.maps.MapTypeId.ROADMAP};
	        var map = new google.maps.Map(this.getView().byId("googleMap").getDomRef(),mapProp);
	       
	        
	        var geocoder = new google.maps.Geocoder();

		    google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
		    	
		    	
		    	
		        for (var i = 0; i < postalCodes.length; ++i) {
		            geocoder.geocode({
		                address: postalCodes[i],
		                region: 'IN'
		            }, function(result, status) {
		                if (status == 'OK' && result.length > 0) {
		                	for(var i = 0;i <info.length; ++i){
		                    new google.maps.Marker({
		                        position: result[0].geometry.location,
		                        map: map,
		                        title:info[i],
		                    });
		                	}
		                }
		            });
		        }
		    	
		    });	
	    },
	    
	    
	    

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf map03.VIEW
*/
//	onExit: function() {
//
//	}
	  /*  var oModel=new sap.ui.model.json.JSONModel();
 	   oModel.loadData("model/model.json");
 	   this.getView().byId("googleMap").bindAggregation("items","")
 	*/

});