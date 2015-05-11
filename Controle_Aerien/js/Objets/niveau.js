/*********************************************************************************************


Contient les classes d'objets de type :
- Niveau



********************************************************************************************/


// Permet de construire un objet de type : Niveau
// Les attributs/méthodes privés sont les attributs/méthodes commençant par "this.....", les attributs/méthodes public sont les attributs/méthodes commençant par "this ..."
function Niveau(levelID,levelTitle,listOfAvions, listOfZones, initInterface)
{
	// Attribut statique, sa méthode statique associée est définie à la suite de ce constructeur (à part)
	Niveau.total = ++Niveau.total || 1;
	Niveau.listeNiveaux= Niveau.listeNiveaux || [this];

	// Variable permettant de vérifier que l'intégralité des données a été chargé (-1 = non initialisé, 0 = terminé sinon en cours)
	Niveau.chargementDonnees = Niveau.chargementDonnees || -1;

	// Attributs public
	this.type = "Niveau";

	// Attributs privés
	this.levelID = levelID;
	this.levelTitle = levelTitle;
	this.listOfAvions = listOfAvions;
	this.listOfZones = listOfZones;
	this.initInterface = initInterface;

	// Getters d'attributs privés
	if( typeof Niveau.initialized == "undefined" ) { 

        Niveau.prototype.getID = function() { 
            return this.levelID;
        };

        Niveau.prototype.getTitle = function() { 
            return this.levelTitle;
        };

        Niveau.prototype.getListOfAvions = function() { 
            return this.listOfAvions;
        };

        Niveau.prototype.getListOfZones = function() { 
            return this.listOfZones;
        };

        Niveau.prototype.getInitInterface = function() { 
            return this.initInterface;
        };

        Niveau.initialized = true; 
    }

	// Permet d'ajouter le niveau à la liste à chaque instanciation de la classe
	this.ajouteNiveau = (function(niveau){ if (Niveau.total !== 1) Niveau.listeNiveaux.push(niveau);})(this);


}

// Permet d'obtenir le nombre de niveaux instancié
Niveau.getNombreNiveaux = function(){
	if (typeof Niveau.total == "undefined")
		return 0;
	return Niveau.total;
}

// Permet d'obtenir la liste des niveaux instanciés
Niveau.getListeNiveaux = function(){
	if (typeof Niveau.listeNiveaux == "undefined")
		return [];
	return Niveau.listeNiveaux;
}

// Getter et Setter spécifique au chargement des données
Niveau.getChargementDonnees = function(){ return chargementDonnees;}
Niveau.setChargementDonnees = function(nombre){ chargementDonnees = nombre;}
Niveau.decrementChargementDonnees = function(){ chargementDonnees--;}