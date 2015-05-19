/*********************************************************************************************


Contient les classes d'objets de type :
- Avion
- TargetPoint



********************************************************************************************/


// Permet de construire un objet de type : Avion
// Les attributs/méthodes privés sont les attributs/méthodes commençant par "var ....", les attributs/méthodes public sont les attributs/méthodes commençant par "this ..."
function Avion(xInit,yInit,vInit,zInit,hInit,rateInit,controllable,type,name,zTarget,typeInLabel){

	// Attribut statique, sa méthode statique associée est définie à la suite de ce constructeur (à part)
	Avion.total = ++Avion.total || 1;
	Avion.listeAvions = Avion.listeAvions || [this];

	// Attributs public
	this.type = "Avion";
	this.nameOfPlane = name;
	this.typeOfPlane = type;
	this.xInitial = xInit;
	this.yInitial = yInit;
	this.vInitial = vInit;
	this.zInitial = zInit;
	this.hInitial = hInit;
	this.xCurrent = xInit;
	this.yCurrent = yInit;
	this.vCurrent = vInit;
	this.zCurrent = zInit;
	this.hCurrent = hInit;
	this.x1 = xInit;
	this.y1 = yInit;
	this.x2 = xInit;
	this.y2 = yInit;
	this.x3 = xInit;
	this.y3 = yInit;
	this.x4 = xInit;
	this.y4 = yInit;
	this.rateInitial = rateInit;
	this.controllable = controllable;
	this.zTarget = zTarget;
	this.hTarget = hInit;
	this.vTarget = vInit;
	this.typeInLabel = typeInLabel;
	this.listOfTargetPoints = [];
	this.indexCurrentTarget = 0;
    // Par defaut suit ses target points
    this.suivreTarget = 1;
    this.end = 0;
	this.color = "blue";

	// GETTERS d'attributs privés
	if( typeof Avion.initialized == "undefined" ) {

		Avion.prototype.getNameOfPlane = function() { return this.nameOfPlane;}
		Avion.prototype.getTypeOfPlane = function() { return this.typeOfPlane;}

		Avion.prototype.getXInitial = function() { return this.xInitial;};
		Avion.prototype.getYInitial = function() { return this.yInitial;};
		Avion.prototype.getVInitial = function() { return this.vInitial;};
		Avion.prototype.getZInitial = function() { return this.zInitial;};
		Avion.prototype.getHInitial = function() { return this.hInitial;};
		Avion.prototype.getX = function() { return this.xCurrent;};
		Avion.prototype.getY = function() { return this.yCurrent;};
		Avion.prototype.getV = function() { return this.vCurrent;};
		Avion.prototype.getZ = function() { return this.zCurrent;};
		Avion.prototype.getH = function() { return this.hCurrent;};
		Avion.prototype.getX1 = function() { return this.x1;};
		Avion.prototype.getY1 = function() { return this.y1;};
		Avion.prototype.getX2 = function() { return this.x2;};
		Avion.prototype.getY2 = function() { return this.y2;};
		Avion.prototype.getX3 = function() { return this.x3;};
		Avion.prototype.getY3 = function() { return this.y3;};
		Avion.prototype.getX4 = function() { return this.x4;};
		Avion.prototype.getY4 = function() { return this.y4;};
		Avion.prototype.getRateInitial = function() { return this.rateInit;};
		Avion.prototype.isControllable = function() { return this.controllable;};
		Avion.prototype.getZTarget = function() { return this.zTarget;};
		Avion.prototype.getHTarget = function() { return this.hTarget;};
		Avion.prototype.getVTarget = function() { return this.vTarget;};
		Avion.prototype.getTypeInLabel = function() { return this.typeInLabel;};
		Avion.prototype.getListOfTargetPoints = function() { return this.listOfTargetPoints;};
		Avion.prototype.getIndexCurrentTarget = function() { return this.indexCurrentTarget;};
        Avion.prototype.getSuivreTarget = function() { return this.suivreTarget;};
        Avion.prototype.getEnd = function() { return this.end;};
		Avion.prototype.getColor = function() { return this.color;};

		//SETTERS
		Avion.prototype.setXInitial = function(x) { this.xInitial = x;};
		Avion.prototype.setYInitial = function(y) { this.yInitial = y;};
		Avion.prototype.setVInitial = function(v) { this.vInitial = v;};
		Avion.prototype.setZInitial = function(z) { this.zInitial = z;};
		Avion.prototype.setHInitial = function(h) { this.hInitial = h;};
		Avion.prototype.setX = function(X) { this.xCurrent = X;};
		Avion.prototype.setY = function(Y) { this.yCurrent = Y;};
		Avion.prototype.setV = function(V) { this.vCurrent = V;};
		Avion.prototype.setZ = function(Z) { this.zCurrent = Z;};
		Avion.prototype.setH = function(H) { this.hCurrent = H;};
		Avion.prototype.setHTarget = function(h) { this.hTarget = h;};
		Avion.prototype.setZTarget = function(z) { this.zTarget = z;};
		Avion.prototype.setVTarget = function(v) { this.vTarget = v;};
		Avion.prototype.setX1 = function(X) { this.x1 = X;};
		Avion.prototype.setY1 = function(Y) { this.y1 = Y;};
		Avion.prototype.setX2 = function(X) { this.x2 = X;};
		Avion.prototype.setY2 = function(Y) { this.y2 = Y;};
		Avion.prototype.setX3 = function(X) { this.x3 = X;};
		Avion.prototype.setY3 = function(Y) { this.y3 = Y;};
		Avion.prototype.setX4 = function(X) { this.x4 = X;};
		Avion.prototype.setY4 = function(Y) { this.y4 = Y;};
		Avion.prototype.setIndexCurrentTarget = function(i) { this.indexCurrentTarget = i;};
        Avion.prototype.setSuivreTarget = function(i) { this.suivreTarget = i;};
        Avion.prototype.setEnd = function(i) { this.end = i;};
		Avion.prototype.setColor = function(c) {this.color = c};
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

Avion.getPerformancesPerType = function(){
	return Avion.performancesParType;
}

Avion.setPerformancesPerType = function(performances) {
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

	this.x = x;
	this.y = y;
	this.label = label;

	this.getX = function(){ return this.x;}
	this.getY = function(){ return this.y;}
	this.getLabel = function() {return this.label;}
}
