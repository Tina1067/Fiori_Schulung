/*Komponente muss geladen werden*/
sap.ui.define([
	"sap/ui/core/UIComponent"
], function(UIComponent) {
	"use strict";

	/*Vorgefertigte Kompente von SAP UI laden, Erweiterung der Standardkomponenten*/
	/*Namensraum muss über einstimmen mit index.html*/
	/*Metadaten zur konkreten App Deklaratorischer Charakter*/
	return UIComponent.extend("de.schulung.ersteApp.Component", {

		metadata: {
			name: "Meine App",
			version: "0.5",
			dependencies: {
				libs: ["sap.m"]
			},
			/*Welcher View soll als erstes geladen werden beim rootView, Typ nicht vergessen*/
			rootView: {
				viewName: "de.schulung.ersteApp.view.App",
				type: "XML"
			}
		},

		/*Vom Elternelement wird die Methode durchlaufen */
		init: function() {
			UIComponent.prototype.init.apply(this, arguments);
/*Model für die Spracherweiterung*/			
			var i18nModel = new sap.ui.model.resource.ResourceModel({
					bundleUrl: "i18n/i18n.properties"
				});
				this.setModel(i18nModel, "i18n");
			
			/*Wird aus dem Controller abgezogen, damit es überall verfügbar ist*/
			/*Init-Methode von der KOmponente wurde damit erweitert*/
			var oData = {
				value1: 50,
				value2: 75
			};
			var oModel = new sap.ui.model.json.JSONModel(oData);
			this.setModel(oModel, "dataModel");
			/*Referenz auf das globale Objekt*/

		}
	});
});