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
	if( typeof Avion.initialized == "undefined" ) { 

        Avion.prototype.getXInitial = function() { 
            return xInitial;
        }; 

        Avion.prototype.getYInitial = function() { 
            return yInitial;
        }; 

        Avion.prototype.getVInitial = function() { 
            return vInitial;
        }; 

        Avion.prototype.getZInitial = function() { 
            return zInitial;
        }; 

        Avion.prototype.getHInitial = function() { 
            return hInitial;
        }; 

        Avion.prototype.getRateInitial = function() { 
            return rateInit;
        }; 

        Avion.prototype.isControllable = function() { 
            return controllable;
        }; 

        Avion.prototype.getZTarget = function() { 
            return zTarget;
        }; 

        Avion.prototype.getTypeInLabel = function() { 
            return typeInLabel;
        }; 

        Avion.prototype.getListOfTargetPoints = function() { 
            return listOfTargetPoints; 
        };
		
		//SETTERS
		Avion.prototype.setXInitial = function(x) { 
            this.xInitial = x;
        }; 

        Avion.prototype.setYInitial = function(y) { 
            this.yInitial = y;
        }; 

        Avion.prototype.setVInitial = function(v) { 
            this.vInitial = v;
        }; 

        Avion.prototype.setZInitial = function(z) { 
            this.zInitial = z;
        }; 

        Avion.prototype.setHInitial = function(h) { 
            this.hInitial = h;
        }; 

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