/*********************************************************************************************


Contient les classes d'objets de type :
- Zone
- Point



********************************************************************************************/

// Permet de construire un objet de type Zone
function Zone(nature,type,concernedPlanes){
	// Attribut statique, sa méthode statique associée est définie à la suite de ce constructeur (à part)
	Zone.total = ++Zone.total || 1;
	Zone.listeZones = Zone.listeZones || [this];

	// Attributs public
	this.type = "Zone";
	this.concernedPlanes = concernedPlanes;

	// Attributs privés
	var nature = nature;
	var typeOfZone = type;

	// Getters d'attributs privés
	this.getNature = function(){ return nature;}
	this.getTypeOfZone = function(){ return typeOfZone;}

	// Permet d'ajouter la zone à la liste à chaque instanciation de la classe
	var ajouteZone = (function(zone){ if (Zone.total !== 1) Zone.listeZones.push(zone);})(this);
}

// Permet d'obtenir le nombre de zones instanciées
Avion.getNombreZones = function(){
	if (typeof Zone.total == "undefined")
		return 0;
	return Zone.total;
}

// Permet d'obtenir la liste des zones instanciées
Avion.getListeZones = function(){
	if (typeof Zone.listeZones == "undefined")
		return [];
	return Zone.listeZones;
}

// Constructeur pour l'objet de type Point
function Point(x,y)
{
	this.type = "Point";

	var x = x;
	var y = y;

	this.getX = function(){ return x;}
	this.getY = function(){ return y;}
}

// Constructeur pour l'objet de type Cercle
function Cercle(x,y,radius)
{
	this.type = "Cercle";

	var x = x;
	var y = y;
	var radius = radius;

	this.getX = function(){ return x;}
	this.getY = function(){ return y;}
	this.getRadius = function(){ return radius;}
}