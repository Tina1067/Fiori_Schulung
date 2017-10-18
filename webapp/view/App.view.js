sap.ui.jsview("view.App", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.App
	*/ 
	getControllerName : function() {
		return "controller.App";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.App
	*/ 
	createContent : function(oController) {
			var oSlider1 = new sap.m.Slider( "Slider1",{
				value:"{dataModel>/value1}",
				change: oController.onSliderChange, enableTickmarks:true, range:"0,10", min:0, max:100		 	
			});
			
			var oText1 = new sap.m.Text({
				text: "{path: 'dataModel</value1'}"
			});

			
			var oSlider2 = new sap.m.Slider( "Slider2",{
				value:"{model: 'dataModel', path: '/value2'}",
				change: oController.onSliderChange
			});

			var oText2 = new sap.m.Text({
				text: "{/value2}"
			});

			var oButton = new sap.m.Button({
			      tooltip: "Hello World", 
				  text:    "Ich bin ein Knopf"
				  });
 		
 		var oVLayout = new sap.m.VBox({
 		items:[
				oSlider1,
				oText1,
				oSlider2,
				oText2,
				oButton
			]
 		});
 		
 		return new sap.m.Page({
			title: "Title",
			content: [
				oVLayout
			]
		});
	}

});