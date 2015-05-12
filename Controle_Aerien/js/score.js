/*********************************************************************************************/

// Permet de construire un objet de type : Score
function Score(valeur,nb_airprox,nb_manip){


	this.valeur = valeur;
	this.airprox = nb_airprox;
	this.manipulations = nb_manip;
    
	// GETTERS d'attributs privés
	if( typeof Score.initialized == "undefined" ) {

		Score.prototype.getValue = function() { return this.valeur;}
		Score.prototype.getNumberAirprox = function() { return this.airprox;}
        Score.prototype.getNumberActions = function() { return this.manipulations;}

		//SETTERS
		Score.prototype.setValue = function(x) { this.valeur = x;};
		Score.prototype.setNumberAirprox = function(a) { this.airprox = a;};
		Score.prototype.setNumberActions = function(m) { this.manipulations = m;};


		Score.initialized = true;
	}
}