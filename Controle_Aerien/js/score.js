/*********************************************************************************************/

// Permet de construire un objet de type : Score


// score de debut : 400
// penalité airprox : -20
// penalité par manipulation : -5
// avion atteint la zone fin de jeu : +30

function Score(valeur, nb_airprox, nb_manip, nb_avion_zone_fin) {


	this.valeur = valeur;
	this.airprox = nb_airprox;
	this.manipulations = nb_manip;
    this.nb_avion_zone_fin = nb_avion_zone_fin;
    
	// GETTERS d'attributs privés
	if ( typeof Score.initialized == "undefined" ) {

		Score.prototype.getValue = function() { return this.valeur;}
		Score.prototype.getNumberAirprox = function() { return this.airprox;}
        Score.prototype.getNumberActions = function() { return this.manipulations;}
        Score.prototype.getNumberPlanesEndZone = function() { return this.nb_avion_zone_fin;}

		//SETTERS
		Score.prototype.setValue = function(x) { this.valeur = x;};
		Score.prototype.setNumberAirprox = function(a) { this.airprox = a;};
		Score.prototype.setNumberActions = function(m) { this.manipulations = m;};
        Score.prototype.setNumberPlanesEndZone = function(p) {this.getNumberPlanesEndZone = p;}

		Score.initialized = true;
	}
    
    Score.prototype.init = function() {
            this.manipulations = 0 ;
            this.valeur = 400 ;
            this.airprox = 0;
            this.nb_avion_zone_fin = 0;
    }
    
            
    Score.prototype.manipulationEffectuee = function() {
            this.manipulations = this.manipulations + 1 ;
            this.valeur -= 5 ;
    }
    
    // fonction appelée par chaque avion en airprox
    // donc un airprox qui concerne 2 avions : pénalité de 20 pts
    Score.prototype.airproxDetecte = function() {
    this.airprox = this.airprox + 0.5 ;
    this.valeur = this.valeur - 10 ;
    }   
    
    Score.prototype.zoneFinDeJeuAtteinte = function () {
        this.valeur = this.valeur + 30 ;
        this.nb_avion_zone_fin += 1 ;
    }
}
    
    
    
