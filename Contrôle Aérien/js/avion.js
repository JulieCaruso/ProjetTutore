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
	var rateInitial = rateInit;
	var controllable = controllable;
	var zTarget = zTarget;
	var typeInLabel = typeInLabel;
	var listOfTargetPoints = [];

	// Getters d'attributs privés
	this.getXInitial = function(){ return xInitial;}
	this.getYInitial = function(){ return yInitial;}
	this.getVInitial = function(){ return vInitial;}
	this.getZInitial = function(){ return zInitial;}
	this.getHInitial = function(){ return hInitial;}
	this.getRateInitial = function(){ return rateInitial;}
	this.isControllable = function(){ return controllable;}
	this.getTypeOfPlane = function(){ return typeOfPlane;}
	this.getNameOfPlane = function(){ return nameOfPlane;}
	this.getZTarget = function(){ return zTarget;}
	this.getTypeInLabel = function(){ return typeInLabel;}
	this.getListOfTargetPoints = function(){ return listOfTargetPoints;}

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