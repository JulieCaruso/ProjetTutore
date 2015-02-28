/*(function(){
	initLoading(processPerformances);
})();*/

function initLoading(callback){

	var xdr = getXDomainRequest();

	xdr.onload = function() {

	// On appelle la fonction qui va utiliser le fichier XML
    callback(xdr.responseText);

	}

	xdr.open("GET", "txt/performances.txt");

	xdr.send();

	// Attention : Le thread repart dans le code principal et le traitement des données se fait en parallèle
}

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

function processPerformances(performancesText){

	var re = /&type[0-9]+=([^&]+)&[^=]+=([0-9]+)&[^=]+=([0-9]+)&[^=]+=([0-9]+)/g;
    var m, entetesAvion = [], infos = [];
     
    // Récupération des en-têtes
    while ((m = re.exec(performancesText)) != null) {
	    if (m.index === re.lastIndex) {
	  		 re.lastIndex++;
	    }
	    // View your result using the m-variable.
	    // eg m[0] etc.
	    infos = [];
	    infos["type"] = m[1];
	    infos["inclinaisonSdt"] = parseInt(m[2]);
	    infos["inclinaisonMax"] = parseInt(m[3]);
	    infos["cassure"] = parseInt(m[4]);
	    entetesAvion.push(infos);

    }

    var re2 = /(?:([0-9]+) ?)(?:([0-9]+) ?)(?:([0-9]+) ?)(?:([0-9]+) ?)(?:([0-9]+) ?)(?:([0-9]+) ?)/g;
    var compteur = 0, performances = [], infosPerformances = [], oldValue = -1;
    m = re2.exec(performancesText);
     
    while (m != -1) {
	    if (m != null && m.index === re2.lastIndex) {
	  		 re2.lastIndex++;
	    }
	    // View your result using the m-variable.
	    // eg m[0] etc.
	    // Données de la forme : [altitude en pieds / 100 Vpc Vpm Vpd rateUp rateDow]
	    if (m != null && oldValue < parseInt(m[1])){

		    infosPerformances = [];
		    infosPerformances["Vpc"] = parseInt(m[2]);
		    infosPerformances["Vpm"] = parseInt(m[3]);
		    infosPerformances["Vpd"] = parseInt(m[4]);
		    infosPerformances["rateUp"] = parseInt(m[5]);
		    infosPerformances["rateDow"] = parseInt(m[6]);
		    performances[parseInt(m[1])] = infosPerformances;

		    oldValue = parseInt(m[1]);
		    m = re2.exec(performancesText);

		}
		else
		{
			entetesAvion[compteur]["performances"] = performances;

			if (m == null){
				m = -1;
			}
			else
			{
				performances = [];
				infosPerformances = [];
			    infosPerformances["Vpc"] = parseInt(m[2]);
			    infosPerformances["Vpm"] = parseInt(m[3]);
			    infosPerformances["Vpd"] = parseInt(m[4]);
			    infosPerformances["rateUp"] = parseInt(m[5]);
			    infosPerformances["rateDow"] = parseInt(m[6]);
			    performances[parseInt(m[1])] = infosPerformances;
				
			    oldValue = parseInt(m[1]);
			    m = re2.exec(performancesText);
			}
			compteur++;
		}
		
    }

    // On range les résultats de sorte d'avoir l'ensemble des informations en passant le type d'avion en paramètre
    
    var performancesParType = [], infos = [];

    for(var i = 0; i < entetesAvion.length; i++){
    	infos = [];
    	infos["inclinaisonSdt"] = entetesAvion[i]["inclinaisonSdt"];
    	infos["inclinaisonMax"] = entetesAvion[i]["inclinaisonMax"];
    	infos["cassure"] = entetesAvion[i]["cassure"];
    	infos["performances"] = entetesAvion[i]["performances"];
    	performancesParType[entetesAvion[i]["type"]] = infos;
    }

    Avion.setPerformancesParType(performancesParType);
}