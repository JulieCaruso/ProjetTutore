/*	NOTES DE PROJET
** Le changement d'état **

Il faut savoir que quand on envoie une requête HTTP via XMLHttpRequest, celle-ci passe par plusieurs états différents :

0 : L'objet XHR a été créé, mais pas encore initialisé (la méthode open n'a pas encore été appelée)
1 : L'objet XHR a été créé, mais pas encore envoyé (avec la méthode send )
2 : La méthode send vient d'être appelée
3 : Le serveur traite les informations et a commencé à renvoyer des données
4 : Le serveur a fini son travail, et toutes les données sont réceptionnées

** Documentation intéressante **
Document XML/Javascript : http://www.w3schools.com/dom/dom_document.asp
Objets en Javascript : https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_objets


*/

$(function(){
	$('#titre').html("Contrôle Aérien");
	getXMLPlanesToJavascript(processXMLData);
});

// ***** MAIN *****
function getXMLPlanesToJavascript(callback){

	var xdr = getXDomainRequest();
	var jquery_nom_xml, nom_XML;
	
	xdr.onload = function() {

	// On appelle la fonction qui va utiliser le fichier XML
    callback(xdr.responseXML);

	}
	
	jquery_nom_xml = $("#id_jeu_XML");
	
    //sans PHP, modifier ici le nom du fichier xml à charger
	nom_XML = "xml/" + (jquery_nom_xml.text() != "" ? jquery_nom_xml.text() : "planes_2N_2A_3TP_3T.xml");
	
	xdr.open("GET", nom_XML);

	xdr.send();

	// Attention : Le thread repart dans le code principal et le traitement des données se fait en parallèle
}


// ***** FONCTIONS *****

// Permet de définir un objet de type XDomainRequest ou XMLHttpRequest
function getXDomainRequest() {

    var xdr = null;

    if (window.XDomainRequest) {

        xdr = new XDomainRequest(); 

    } else if (window.XMLHttpRequest) {

        xdr = new XMLHttpRequest(); 

    } else {

        alert("Votre navigateur ne gère pas l'AJAX cross-domain !");

    }

    return xdr; 

}

// Traite les données XML
function processXMLData(XMLData) {
	// On peut maintenant traiter les données du fichier xml

	initLoading(processPerformances);

	// On sélectionne l'ensemble des noeuds "level"
	var levelNodes = XMLData.getElementsByTagName("level");
	
	// On initialise plusieurs variables de manière explicite et qui seront utilisées par la suite
	var currentLevel = null, planeNodes = null, currentPlane = null, currentZone = null, zoneNodes = null, levelTitle = null, levelID = null;
	var attribute = null, initInterface = null, configAttributes = [], configInitialeNode = null, controlPanelAttributes = [], controlPanel = null;
	var plane = null, listOfTargetPoint = null, targetPoint = null, zone = null, listOfPoint = null, listOfCercle = null, cercle = null, level = null;
	var planeAttributes = [], targetPointAttributes = [], zoneAttributes = [], pointAttributes = [], cercleAttributes = [], textIntroNodes = null, textEndNodes = null, textHelpNodes = null;
	var tabTextIntro = [], tabTextEnd = [], tabTextHelp = [], text = null;

	Niveau.setChargementDonnees(levelNodes.length);

	console.log("[DEBUT]Chargement des niveaux en cours...");

	for(var i = 0; i < levelNodes.length; i++)
	{
		currentLevel = levelNodes[i];
		levelID = currentLevel.getAttribute("id");
		levelTitle = currentLevel.getAttribute("levelTitle");
		planeNodes = currentLevel.getElementsByTagName("plane");
        
		for(var j = 0; j < planeNodes.length; j++)
		{
			currentPlane = planeNodes[j];
			for (var k = 0; k < currentPlane.attributes.length; k++)
			{
				attribute = currentPlane.attributes.item(k);
				planeAttributes[attribute.nodeName] = attribute.nodeValue;
			}
			//parseInt pour convertir string -> int
			//attention controllable et typeDansEtiquette sont des strings (a vocation de booleens) !
			plane = new Avion(
				parseInt(planeAttributes["xIni"]),
				parseInt(planeAttributes["yIni"]),
				parseInt(planeAttributes["vIni"]),
				parseInt(planeAttributes["zIni"]),
				parseInt(planeAttributes["hIni"]),
				parseInt(planeAttributes["rateIni"]),
				planeAttributes["controllable"],
				planeAttributes["planeType"],
				planeAttributes["planeName"],
				parseInt(planeAttributes["zTarget"]),
				planeAttributes["typeDansEtiquette"]);

			listOfTargetPoint = currentPlane.getElementsByTagName("targetPoint");
			for (var k = 0; k < listOfTargetPoint.length; k++)
			{
				for (var h = 0; h < listOfTargetPoint[k].attributes.length; h++)
				{
					attribute = listOfTargetPoint[k].attributes.item(h);
					targetPointAttributes[attribute.nodeName] = attribute.nodeValue;
				}

				targetPoint = new TargetPoint(
					parseInt(targetPointAttributes["x"]),
					parseInt(targetPointAttributes["y"]),
					targetPointAttributes["label"]);

				plane.getListOfTargetPoints().push(targetPoint);
			}
		}

		console.log("Chargement des avions terminé pour le niveau "+levelID);
		//console.debug(Avion.getListeAvions());

		zoneNodes = currentLevel.getElementsByTagName("zone");

		for(var j = 0; j < zoneNodes.length; j++)
		{
			currentZone = zoneNodes[j];

			for (var k = 0; k < currentZone.attributes.length; k++)
			{
				attribute = currentZone.attributes.item(k);
				zoneAttributes[attribute.nodeName] = attribute.nodeValue;
			}
			
			zone = new Zone(
				zoneAttributes["nature"],
				zoneAttributes["type"],
				zoneAttributes["concernedPlanes"]);

			listOfPoint = currentZone.getElementsByTagName("point");
			listOfCercle = currentZone.getElementsByTagName("circle");

			// On vérifie si ce noeud contient des noeuds "point" ou "cercle"
			if(listOfPoint.length !== 0)
			{
				for (var k = 0; k < listOfPoint.length; k++)
				{
					for (var h = 0; h < listOfPoint[k].attributes.length; h++)
					{
						attribute = listOfPoint[k].attributes.item(h);
						pointAttributes[attribute.nodeName] = attribute.nodeValue;
					}

					point = new Point(
						parseInt(pointAttributes["x"]),
						parseInt(pointAttributes["y"]));

					zone.getListOfPoints_Cercle().push(point);
				}
			}
			else
			{
				for (var k = 0; k < listOfCercle.length; k++)
				{
					for (var h = 0; h < listOfCercle[k].attributes.length; h++)
					{
						attribute = listOfCercle[k].attributes.item(h);
						cercleAttributes[attribute.nodeName] = attribute.nodeValue;
					}
					
					cercle = new Cercle_Alteration(
						parseInt(cercleAttributes["x"]),
						parseInt(cercleAttributes["y"]),
						parseInt(cercleAttributes["radius"]),
						parseInt(cercleAttributes["speed"]),
						parseInt(cercleAttributes["head"]));

					zone.getListOfPoints_Cercle().push(cercle);
				}
			}
		}		

		console.log("Chargement des zones terminé pour le niveau "+levelID);
		//console.debug(Zone.getListeZones());

		configInitialeNode = currentLevel.getElementsByTagName("configInitial");


		for (var k = 0; k < configInitialeNode[0].attributes.length; k++)
		{
			attribute = configInitialeNode[0].attributes.item(k);
			configAttributes[attribute.nodeName] = attribute.nodeValue;
		}

		controlPanelNode = configInitialeNode[0].getElementsByTagName("controlPanel");

		for (var k = 0; k < controlPanelNode[0].attributes.length; k++)
		{
			attribute = controlPanelNode[0].attributes.item(k);
			controlPanelAttributes[attribute.nodeName] = attribute.nodeValue;
		}

		controlPanel = new ControlPanel(
			controlPanelAttributes["hControl"],
			controlPanelAttributes["vControl"],
			controlPanelAttributes["rateControl"],
			controlPanelAttributes["zControl"],
			controlPanelAttributes["directPointControl"],
			controlPanelAttributes["waitingControl"],
			controlPanelAttributes["tempoControl"]);

		textIntroNodes = configInitialeNode[0].getElementsByTagName("textIntro");
		textEndNodes = configInitialeNode[0].getElementsByTagName("textEnd");
		textHelpNodes = configInitialeNode[0].getElementsByTagName("textHelp");

		for (var k = 0; k < textIntroNodes.length; k++)
		{
			attribute = textIntroNodes[k].getAttribute("lang");
			tabTextIntro[attribute] = textIntroNodes[k].textContent;

			attribute = textEndNodes[k].getAttribute("lang");
			tabTextEnd[attribute] = textEndNodes[k].textContent;

			attribute = textHelpNodes[k].getAttribute("lang");
			tabTextHelp[attribute] = textHelpNodes[k].textContent;
		}

		texts = new Texts(tabTextIntro,
			tabTextEnd,
			tabTextHelp);

		initInterface = new Interface(
				configAttributes["backgroundImage"],
				parseInt(configAttributes["backgroundX"]),
				parseInt(configAttributes["backgroundY"]),
				parseInt(configAttributes["maxTime"]),
				configAttributes["performancesTable"],
				parseFloat(configAttributes["scale"]),
				parseInt(configAttributes["windOption"]),
				parseInt(configAttributes["normVerticalSeparation"]),
				parseInt(configAttributes["normHorizontalSeparation"]),
				parseInt(configAttributes["normDistanceToZone"]),
				parseInt(configAttributes["tolerance"]),
				parseInt(configAttributes["normLineSeparation"]),
				parseInt(configAttributes["tempo"]),
				parseInt(configAttributes["turnDirectionRequired"]),
				parseInt(configAttributes["zoomScale"]),
				controlPanel,
				texts);

		console.log("Chargement de l'interface initiale pour le niveau "+levelID+" terminé");
		//console.debug(initInterface);

		level = new Niveau(levelID,levelTitle,Avion.getListeAvions(),Zone.getListeZones(),initInterface);
        
        
        // On supprime les données récupérées
        Avion.flush();
        Zone.flush();
        
		Niveau.decrementChargementDonnees();

		console.log("Chargement du niveau "+levelID+" terminé");
		//console.debug(level);
	}


	
	console.log("[FIN]Chargement des niveaux terminé");
}