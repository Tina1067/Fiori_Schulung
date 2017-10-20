sap.ui.define([
		"de/schulung/ersteApp/controller/BaseController"
	], function (BaseController) {
		"use strict";
/*am besten auf diesem Wert belassen
				}, true); 				*/
				
		return BaseController.extend("de.schulung.ersteApp.controller.List", {
			onItemPress: function(oEvent){
				var oItem = oEvent.getSource();
				
				this.getRouter().navTo("customerDetails", {
					customerId : oItem.getBindingContext("flugkundenModel").getProperty("Customerid")
				}, true);
			}
		});
	}
);