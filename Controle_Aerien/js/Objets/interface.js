/*********************************************************************************************


Contient les classes d'objets de type :
- Interface
- Control Panel
- Texts


********************************************************************************************/


// Permet de construire un objet de type : Avion
// Les attributs/méthodes privés sont les attributs/méthodes commençant par "this.....", les attributs/méthodes public sont les attributs/méthodes commençant par "this ..."
function Interface(backgroundImage,backgroundX,backgroundY,maxTime,performancesTable,scale,windOption,normVerticalSeparation,normHorizontalSeparation,normDistanceToZone,tolerance,normLineSeparation,tempo,turnDirectionRequired,zoomScale,controlPanel,texts)
{
	// Attribut statique, sa méthode statique associée est définie à la suite de ce constructeur (à part)

	// Attributs public
	this.type = "Interface";

	// Attributs privés
	this.backgroundImage = backgroundImage;
	this.backgroundX = backgroundX;
	this.backgroundY = backgroundY;
	this.maxTime = maxTime;
	this.performancesTable = performancesTable;
	this.scale = scale;
	this.windOption = windOption;
	this.normVerticalSeparation = normVerticalSeparation;
	this.normHorizontalSeparation = normHorizontalSeparation;
	this.normDistanceToZone = normDistanceToZone;
	this.tolerance = tolerance;
	this.normLineSeparation = normLineSeparation;
	this.tempo = tempo;
	this.turnDirectionRequired = turnDirectionRequired;
	this.zoomScale = zoomScale;
	this.controlPanel = controlPanel;
	this.texts = texts;

	// Getters d'attributs privés
	if( typeof Interface.initialized == "undefined" ) { 

        Interface.prototype.getBackgroundImage = function() { 
            return this.backgroundImage;
        };

        Interface.prototype.getBackgroundX = function() { 
            return this.backgroundX;
        };

        Interface.prototype.getBackgroundY = function() { 
            return this.backgroundY;
        };

        Interface.prototype.getMaxTime = function() { 
            return this.maxTime;
        };

        Interface.prototype.getPerformancesTable = function() { 
            return this.performancesTable;
        };

        Interface.prototype.getScale = function() { 
            return this.scale;
        };

        Interface.prototype.getWindOption = function() { 
            return this.windOption;
        };

        Interface.prototype.getNormHorizontalSeparation = function() { 
            return this.normHorizontalSeparation;
        };

        Interface.prototype.getNormVerticalSeparation = function() { 
            return this.normVerticalSeparation;
        };

        Interface.prototype.getNormDistanceToZone = function() { 
            return this.normDistanceToZone;
        };

        Interface.prototype.getTolerance = function() { 
            return this.tolerance;
        };

        Interface.prototype.getNormLineSeparation = function() { 
            return this.normLineSeparation;
        };

        Interface.prototype.getTempo= function() { 
            return this.tempo;
        };

        Interface.prototype.getTurnDirectionRequired = function() { 
            return this.turnDirectionRequired;
        };

        Interface.prototype.getZoomScale = function() { 
            return this.zoomScale;
        };

        Interface.prototype.getControlPanel = function() { 
            return this.controlPanel;
        };

        Interface.prototype.getTexts = function() { 
            return this.texts;
        };

        Interface.initialized = true; 
    }

}

// Permet de construire un objet du type "ControlPanel"
function ControlPanel(hControl,vControl,rateControl,zControl,directPointControl,waitingControl,tempoControl){

	// Attributs public
	this.type = "ControlPanel";

	// Attributs privés
	this.hControl = hControl;
	this.vControl = vControl;
	this.rateControl = rateControl;
	this.zControl = zControl;
	this.directPointControl = directPointControl;
	this.waitingControl = waitingControl;
	this.tempoControl = tempoControl;

	// Getters d'attributs privés
	if( typeof ControlPanel.initialized == "undefined" ) { 

        ControlPanel.prototype.isHControl = function() { 
            return this.hControl;
        };

        ControlPanel.prototype.isVControl = function() { 
            return this.vControl;
        };

        ControlPanel.prototype.isRateControl = function() { 
            return this.rateControl;
        };

        ControlPanel.prototype.isZControl = function() { 
            return this.zControl;
        };

        ControlPanel.prototype.isDirectPointControl = function() { 
            return this.directPointControl;
        };

        ControlPanel.prototype.isWaitingControl = function() { 
            return this.waitingControl;
        };

        ControlPanel.prototype.isTempoControl = function() { 
            return this.tempoControl;
        };

        ControlPanel.initialized = true; 
    }

}


// Permet de construire un objet du type "Texts"
function Texts(tabTextIntro,tabTextEnd,tabTextHelp){

	// Remarque : ce sont des tableaux vus comme des "map", il suffit d'avoir la clé (code de la langue) pour obtenir le texte (Exemple : tabTextIntro[FR] = ....)
	// Attributs privés
	this.tabTextIntro = tabTextIntro;
	this.tabTextEnd = tabTextEnd;
	this.tabTextHelp = tabTextHelp;

	// Getters d'attributs privés
	if( typeof Texts.initialized == "undefined" ) { 

        Texts.prototype.getTabTextIntro = function() { 
            return this.tabTextIntro;
        };

        Texts.prototype.getTabTextEnd = function() { 
            return this.tabTextEnd;
        };

        Texts.prototype.getTabTextHelp = function() { 
            return this.tabTextHelp;
        };

        Texts.initialized = true; 
    }

}