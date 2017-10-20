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
			},
			/*neu*/
/*hier wurde das rooting hinzugefügt*/
/*immer den Standard Router verwenden von sap.m.routing*/
/*der über nimmt alles. Den Router bringt Fiori mit ist ein JavaSript, Läuft nur im Browser
und nur dort wenn die App aufgerufen wird*/
/*Eindeutige ID für die Bühne über 	controlId: "app",*/
/*welche Aggregation soll manipuliert werden controlAggregation -> primäre Aggregation*/
/*wie wird ausgetausch 	transition:  gibt noch weitere*/
/*Nur Initiale Einstellung für den Router*/
			routing: {
					config: {
						routerClass: sap.m.routing.Router,
						viewType: "XML",
						viewPath: "de.schulung.ersteApp.view",
						controlId: "app",
						controlAggregation: "pages",
						transition: "slide",
						async: true
					},
/*zwei Router deshalb benötigt man ein Array []*/
/*hinter dem Pattern kein Name dann zieht initial*/
/*falls beim Aufuf eine Customerid mitgegeben wurde soll er "name: "customerDetails" aufrufen*/
/*	pattern: "{customerId}",verweist nicht auf das Model ist nur ein Platzhalter
Router haben einen Namen und ist über diesen Namen erreichbar*/
					routes: [
						{
							pattern: "",
							name: "initial",
							target: [
								"list"
							]					
						},
						{
							pattern: "{customerId}",
							name: "customerDetails",
							target: [
								"details"
							]
						}
					],
/*oben als Objekt "list" und unten ohne "" nur noch Name der Datei*/
/*viewLevel: 1 ist standard und sorgt für das Verschieben nach links,
dieses würde ohne Angabe immer nach links verschoben, 2 sorgt für das Verschieben nach rechts*/
					targets: {
						list: {
							viewName: "List",
							viewLevel: 1
						},
						details: {
							viewName: "Customer",
							viewLevel: 2
						}
					}
			}
			/*neu*/
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
/*Für den Zugriff auf die Flugkundendaten*/			
/*Der Zugriff der im folgenden Auskommentiert wurde wird durch oData Zugriff ersetzt*/
/*var oFlugkundenModel = new sap.ui.model.json.JSONModel("model/flugkunden.json");
	this.setModel(oFlugkundenModel, "flugkundenModel");*/
/*Für ältere Versionen disableHeadRequestForToken wird für neuere nicht benötigt*/
				var oFlugkundenModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZGW_FLUGKUNDEN_005_SRV",{	
					disableHeadRequestForToken: true,
					useBatch: false
				});
				this.setModel(oFlugkundenModel, "flugkundenModel");
/*Der Router muss unbeding angelassen werden*/				
				this.getRouter().initialize();
		}
	});
});