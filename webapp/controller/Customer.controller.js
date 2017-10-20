sap.ui.define([
		"de/schulung/ersteApp/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("de.schulung.ersteApp.controller.Customer", {
			onInit: function() {
				this.getRouter().getRoute("customerDetails").attachPatternMatched(this._onMasterMatched, this);
			},
			
			onNavBack: function() {
				var sPreviousHash = sap.ui.core.routing.History.getInstance().getPreviousHash();
	
				if (sPreviousHash !== undefined) {
					// The history contains a previous entry
					history.go(-1);
				} else {
					// Otherwise we go backwards with a forward history
					var bReplace = true;
					this.getRouter().navTo("initial", {}, bReplace);
				}
			},
			
			_onMasterMatched: function(oEvent) {
				var sCustomerId =  oEvent.getParameter("arguments").customerId;
				var oModel = this.getModel("flugkundenModel");
				
				oModel.metadataLoaded().then(function() {
					var sCustomerPath = oModel.createKey("FlugkundenSet", {
						Customerid :  sCustomerId
					});
					this.getView().bindElement({
						model: "flugkundenModel",
						path: "/" + sCustomerPath
					});
				}.bind(this));
			}
		});
	}
);