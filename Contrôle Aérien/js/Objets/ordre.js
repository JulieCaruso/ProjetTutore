/*********************************************************************************************


Contient les classes d'objets de type :
- Ordre



********************************************************************************************/

// Permet de construire un objet de type Ordre, changements un objet de type tableau d'objet CHANGEMENT
function Ordre(avion,changements){
	// Attribut statique, sa méthode statique associée est définie à la suite de ce constructeur (à part)
	

	// Attributs public
	this.type = "Ordre";

	// Attributs privés
	var message = "\nAircraft "+avion.getTypeOfPlane();
	var changements = changements;

	// Getters d'attributs privés

	if( typeof Ordre.initialized == "undefined" ) { 

		Ordre.prototype.getMessage = function() { return message;}

		Ordre.prototype.getStringChangements = function() { return changements;}
        

        Ordre.initialized = true; 
    }

    // Permet de définir quelles modifications ont été faites et seront à afficher dans le message
    var identifyModifications = (function(ordre){ 

    })(this);

    // Permet d'ajouter le message à la zone d'ordres envoyés
	var showOrder = (function(ordre){ var messages = document.getElementById('zoneOrdres').textContent; messages+=ordre.getMessage(); $('#zoneOrdres').html(messages);})(this);


}