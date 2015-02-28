/*********************************************************************************************


Contient les classes d'objets de type :
- Avion
- TargetPoint



********************************************************************************************/


// Permet de construire un objet de type : Avion
// Les attributs/méthodes privés sont les attributs/méthodes commençant par "var ....", les attributs/méthodes public sont les attributs/méthodes commençant par "this ..."
function Avion(xInit,yInit,vInit,zInit,hInit,rateInit,controllable,type,name,zTarget,typeInLabel)
{
	// Attribut statique, sa méthode statique associée est définie à la suite de ce constructeur (à part)
	Avion.total = ++Avion.total || 1;
	Avion.listeAvions = Avion.listeAvions || [this];

	// Attributs public
	this.type = "Avion";
	this.nameOfPlane = name;
	this.typeOfPlane = type;

	// Attributs privés
	var xInitial = xInit;
	var yInitial = yInit;
	var vInitial = vInit;
	var zInitial = zInit;
	var hInitial = hInit;
	var xCurrent = xInit;
	var yCurrent = yInit;
	var vCurrent = vInit;
	var zCurrent = zInit;
	var hCurrent = hInit;
	var x1 = xInit;
	var y1 = yInit;
	var x2 = xInit;
	var y2 = yInit;
	var rateInitial = rateInit;
	var controllable = controllable;
	var zTarget = zTarget;
	var typeInLabel = typeInLabel;
	var listOfTargetPoints = [];

	// GETTERS d'attributs privés
	if( typeof Avion.initialized == "undefined" ) { 

        Avion.prototype.getXInitial = function() { return xInitial;}; 
        Avion.prototype.getYInitial = function() { return yInitial;}; 
        Avion.prototype.getVInitial = function() { return vInitial;}; 
        Avion.prototype.getZInitial = function() { return zInitial;}; 
        Avion.prototype.getHInitial = function() { return hInitial;}; 
		Avion.prototype.getX = function() { return xCurrent;}; 
        Avion.prototype.getY = function() { return yCurrent;}; 
        Avion.prototype.getV = function() { return vCurrent;}; 
        Avion.prototype.getZ = function() { return zCurrent;}; 
        Avion.prototype.getH = function() { return hCurrent;}; 
		Avion.prototype.getX1 = function() { return x1;}; 
        Avion.prototype.getY1 = function() { return y1;}; 
		Avion.prototype.getX2 = function() { return x2;}; 
        Avion.prototype.getY2 = function() { return y2;}; 
        Avion.prototype.getRateInitial = function() { return rateInit;}; 
        Avion.prototype.isControllable = function() { return controllable;}; 
        Avion.prototype.getZTarget = function() { return zTarget;}; 
        Avion.prototype.getTypeInLabel = function() { return typeInLabel;}; 
        Avion.prototype.getListOfTargetPoints = function() { return listOfTargetPoints;};

		
		//SETTERS
		Avion.prototype.setXInitial = function(x) { xInitial = x;}; 
        Avion.prototype.setYInitial = function(y) { yInitial = y;}; 
        Avion.prototype.setVInitial = function(v) { vInitial = v;}; 
        Avion.prototype.setZInitial = function(z) { zInitial = z;}; 
        Avion.prototype.setHInitial = function(h) { hInitial = h;}; 
		Avion.prototype.setX = function(X) { xCurrent = X;}; 
        Avion.prototype.setY = function(Y) { yCurrent = Y;}; 
        Avion.prototype.setV = function(V) { vCurrent = V;}; 
        Avion.prototype.setZ = function(Z) { zCurrent = Z;}; 
        Avion.prototype.setH = function(H) { hCurrent = H;};
		Avion.prototype.setX1 = function(X) { x1 = X;}; 
        Avion.prototype.setY1 = function(Y) { y1 = Y;}; 
		Avion.prototype.setX2 = function(X) { x2 = X;}; 
        Avion.prototype.setY2 = function(Y) { y2 = Y;};
        

        Avion.initialized = true; 
    }

	// Permet d'ajouter l'avion à la liste à chaque instanciation de la classe
	var ajouteAvion = (function(avion){ if (Avion.total !== 1) Avion.listeAvions.push(avion);})(this);


}

// Permet d'obtenir le nombre d'avions instancié
Avion.getNombreAvions = function(){
	if (typeof Avion.total == "undefined")
		return 0;
	return Avion.total;
}

// Permet d'obtenir la liste des avions instancié
Avion.getListeAvions = function(){
	if (typeof Avion.listeAvions == "undefined")
		return [];
	return Avion.listeAvions;
}

Avion.getPerformancesParType = function(){ 
	return Avion.performancesParType; 
}

Avion.setPerformancesParType = function(performances) {
	Avion.performancesParType = performances;
} 

// Permet de réinitialiser les variables statiques
Avion.flush = function(){
		Zone.total = 0;
		Zone.listeZones = [];
}

// Constructeur pour l'objet de type TargetPoint
function TargetPoint(x,y,label)
{
	this.type = "TargetPoint";
	
	var x = x;
	var y = y;
	var label = label;

	this.getX = function(){ return x;}
	this.getY = function(){ return y;}
	this.getLabel = function() {return label;}
}