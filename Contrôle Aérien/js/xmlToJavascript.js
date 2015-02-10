/*	NOTES DE PROJET
** Le changement d'état **

Il faut savoir que quand on envoie une requête HTTP via XMLHttpRequest, celle-ci passe par plusieurs états différents :

0 : L'objet XHR a été créé, mais pas encore initialisé (la méthode open n'a pas encore été appelée)
1 : L'objet XHR a été créé, mais pas encore envoyé (avec la méthode send )
2 : La méthode send vient d'être appelée
3 : Le serveur traite les informations et a commencé à renvoyer des données
4 : Le serveur a fini son travail, et toutes les données sont réceptionnées


*/

$(function(){
	$('#titre').html("Contrôle Aérien");
	getXMLPlanesToJavascript(processXMLData);
});

// ***** MAIN *****
function getXMLPlanesToJavascript(callback){
	var xhr = getXMLHttpRequest(); 


	xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
		alert("Requête réussie, traitement des données...");
		callback(xhr.responseXML);
	
}};

	xhr.open("GET", "planes.xml", true);
	//alert(xhr.readyState);
	xhr.send(null);
}


// ***** FONCTIONS *****



// Permet d'instancier un objet du type XmlHttpRequest()
function getXMLHttpRequest() {
	var xhr = null;
	
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	
	return xhr;
}

// Traite les données XML
function processXMLData(XMLData) {
	// On peut maintenant traiter les données sans encombrer l'objet XHR.
	alert(XMLData);
}
