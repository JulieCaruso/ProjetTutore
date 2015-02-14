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

	xdr.onload = function() {

	// On appelle la fonction qui va utiliser le fichier XML
    callback(xdr.responseXML);

	}

	xdr.open("GET", "xml/planes.xml");

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

	// On sélectionne l'ensemble des noeuds "level"
	var levelNodes = XMLData.getElementsByTagName("level");
	
	// On initialise plusieurs variables de manière explicite et qui seront utilisées par la suite
	var currentLevel = null, planeNodes = null, currentPlane = null;
	var attribute = null;
	var plane = null, listOfTargetPoint = null, targetPoint = null;
	var planeAttributes = [], targetPointAttributes = [];

	for(var i = 0; i < levelNodes.length; i++)
	{
		currentLevel = levelNodes[i];
		planeNodes = currentLevel.getElementsByTagName("plane");

		for(var j = 0; j < planeNodes.length; j++)
		{
			currentPlane = planeNodes[j];
			for (var k = 0; k < currentPlane.attributes.length; k++)
			{
				attribute = currentPlane.attributes.item(k);
				planeAttributes[attribute.nodeName] = attribute.nodeValue;
			}

			plane = new Avion(
				planeAttributes["xIni"],
				planeAttributes["yIni"],
				planeAttributes["vIni"],
				planeAttributes["zIni"],
				planeAttributes["hIni"],
				planeAttributes["rateIni"],
				planeAttributes["controllable"],
				planeAttributes["planeType"],
				planeAttributes["planeName"],
				planeAttributes["zTarget"],
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
					targetPointAttributes["x"],
					targetPointAttributes["y"],
					targetPointAttributes["label"]);

				plane.getListOfTargetPoints().push(targetPoint);
			}
		}
	}
	
	console.log("Chargement des avions terminé : ");
	console.debug(Avion.getListeAvions());
}