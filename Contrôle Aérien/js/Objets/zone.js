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
	this.nature = nature;
	this.typeOfZone = type;
	this.listOfPoints_Cercle = [];

	// Getters d'attributs privés
	if( typeof Zone.initialized == "undefined" ) { 

        Zone.prototype.getNature = function() { 
            return this.nature;
        };

        Zone.prototype.getTypeOfZone = function() { 
            return this.typeOfZone;
        };

        Zone.prototype.getListOfPoints_Cercle = function() { 
            return this.listOfPoints_Cercle;
        };

        Zone.initialized = true; 
    }

	// Permet d'ajouter la zone à la liste à chaque instanciation de la classe
	var ajouteZone = (function(zone){ if (Zone.total !== 1) Zone.listeZones.push(zone);})(this);
}

// Permet d'obtenir le nombre de zones instanciées
Zone.getNombreZones = function(){
	if (typeof Zone.total == "undefined")
		return 0;
	return Zone.total;
}

// Permet d'obtenir la liste des zones instanciées
Zone.getListeZones = function(){
	if (typeof Zone.listeZones == "undefined")
		return [];
	return Zone.listeZones;
}

// Permet de réinitialiser les variables statiques
Zone.flush = function(){
		Zone.total = 0;
		Zone.listeZones = [];
}

// Constructeur pour l'objet de type Point
function Point(xPos,yPos)
{
	this.type = "Point";

	var x = xPos;
	var y = yPos;

	this.getX = function(){ return x;}
	this.getY = function(){ return y;}
}

// Constructeur pour l'objet de type Cercle
function Cercle_Alteration(x,y,radius,speed,head)
{
	this.type = "Cercle";

	this.x = x;
	this.y = y;
	this.radius = radius;
	this.speed = speed;
	this.head = head;
		
	
	this.getX = function(){ return this.x;}
	this.getY = function(){ return this.y;}
	this.getRadius = function(){ return this.radius;}
	this.getSpeed = function(){ return this.speed;}
	this.getHead = function(){ return this.head;}
}