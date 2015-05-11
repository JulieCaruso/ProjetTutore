/*********************************************************************************************


Contient les classes d'objets de type :
- Ordre
- Enumération des changements possibles

Lien permettant d'obtenir une idée des vrais dialogues venant d'une tour de contrôle : http://atcwiki.jonckers.org/index.php?n=Basic.AreaControl



********************************************************************************************/

// Permet de construire un objet de type Ordre, changements un objet de type tableau d'objet CHANGEMENT
function Ordre(avion,changements){
	// Attribut statique, sa méthode statique associée est définie à la suite de ce constructeur (à part)
	Ordre.total = ++Ordre.total || 1;
	Ordre.listeOrdres = Ordre.listeOrdres || [this];

	// Attributs public
	this.type = "Ordre";
	this.message = "";

	// Attributs privés
	var changements = changements;


	// Getters d'attributs privés

	if( typeof Ordre.initialized == "undefined" ) { 

		Ordre.prototype.getMessage = function() { return this.message;}

		Ordre.prototype.getTabChangements = function() { return changements;}
        

        Ordre.initialized = true; 
    }

    // Permet de définir quelles modifications ont été faites et seront à afficher dans le this.message
    Ordre.prototype.processShowChangements = function() {
		this.message = "<br /><b>"+avion.getNameOfPlane()+"</b>";
		var changement = -1, choice = -1;
		// On observe tous les changements dans le tableau, c'est ici que l'on détaille ici toutes les possiblités
		for(var i = 0; i < changements.length; i++){

			changement = changements[i];

			switch(changement){
				case(Ordre.Changement.INCREASE_SPEED):
					choice = randomChoice(2);
					switch(choice){
						case(1):
							this.message += ", increase speed to <font color=\"red\">"+avion.getVTarget()+"</font> knots"
						break;
						case(2):
							this.message += ", raise your speed to <font color=\"red\">"+avion.getVTarget()+"</font> knots"
						break;
					}
					break;
				case(Ordre.Changement.DECREASE_SPEED):
					choice = randomChoice(2);
					switch(choice){
						case(1):
							this.message += ", reduce speed to <font color=\"red\">"+avion.getVTarget()+"</font> knots"
						break;
						case(2):
							this.message += ", decrease speed to <font color=\"red\">"+avion.getVTarget()+"</font> knots"
						break;
					}
					break;
				case(Ordre.Changement.INCREASE_ALTITUDE):
					choice = randomChoice(4);
					switch(choice){
						case(1):
							this.message += ", climb to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
						case(2):
							this.message += ", climb immediately to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
						case(3):
							this.message += ", ascend to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
						case(4):
							this.message += ", go up to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
					}
					
					break;
				case(Ordre.Changement.DECREASE_ALTITUDE):
					choice = randomChoice(4);
					switch(choice){
						case(1):
							this.message += ", descend to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
						case(2):
							this.message += ", descend immediately to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
						case(3):
							this.message += ", go down to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
						case(4):
							this.message += ", come down to <font color=\"red\">FL "+avion.getZTarget()+"</font>"
						break;
					}
					break;
				case(Ordre.Changement.CHANGE_HEAD_BETTER_WAY):
					var betterWay = calculateBetterWayToReachTargetHead(avion);
					if (betterWay == 0){
						changement = Ordre.Changement.CHANGE_HEAD_BY_LEFT;
					}
					else if (betterWay == 1 ){
						changement = Ordre.Changement.CHANGE_HEAD_BY_RIGHT;
					}
					else
					{
						console.debug("[Erreur] Impossible de trouver la meilleure direction pour atteindre le cap visé");
					}
				case(Ordre.Changement.CHANGE_HEAD_BY_LEFT):
					if (changement == Ordre.Changement.CHANGE_HEAD_BY_LEFT){
						choice = randomChoice(2);
						switch(choice){
							case(1):
								this.message += ", <font color=\"red\">turn left</font> heading <font color=\"red\">"+(avion.getHTarget()<100?"0"+avion.getHTarget():avion.getHTarget())+"</font>";
							break;
							case(2):
								this.message += ", <font color=\"red\">turn left "+(avion.getHTarget()<100?"0"+avion.getHTarget():avion.getHTarget())+"</font> degrees";
							break;
						}
						break;
					}
				case(Ordre.Changement.CHANGE_HEAD_BY_RIGHT):
						choice = randomChoice(2);
						switch(choice){
							case(1):
								this.message += ", <font color=\"red\">turn right</font> heading <font color=\"red\">"+(avion.getHTarget()<100?"0"+avion.getHTarget():avion.getHTarget())+"</font>";
							break;
							case(2):
								this.message += ", <font color=\"red\">turn right "+(avion.getHTarget()<100?"0"+avion.getHTarget():avion.getHTarget())+"</font> degrees";
							break;
						}
					break;
				case(Ordre.Changement.STORM_ZONE_ENTRY_WARNING):

					break;
				case(Ordre.Changement.STORM_ZONE_LEAVING):

					break;
				case(Ordre.Changement.LEAVE_CONTROL_ZONE):

					break;
				case(Ordre.Changement.MODIFY_TARGET_POINT):
						// On va chercher le prochain target point
						var targetPointAvion = avion.getListOfTargetPoints()[avion.getIndexCurrentTarget()];
						var A = new Point(avion.getX(),avion.getY()), B = new Point(targetPointAvion.getX(),targetPointAvion.getY());
						var orientation = calculateOrientation(A,B);
						choice = randomChoice(2);
						switch(choice){
							case(1):
								this.message += ", leading new target point <font color=\"red\">"+targetPointAvion.getLabel()+"</font> following <font color=\"red\">"+orientation+" degrees</font>";
							break;
							case(2):
								this.message += ", please, following <font color=\"red\">"+targetPointAvion.getLabel()+"</font> heading <font color=\"red\">"+orientation+" degrees</font>";
							break;
						}
					break;
				default:
					console.debug("[Erreur] Un ordre de changement inconnu a été passé : "+changement);
					break; 
			}

		}

	}

    // Permet d'ajouter le this.message à la zone d'ordres envoyés
	var showOrder = (function(ordre){ 
		ordre.processShowChangements();
		if (Ordre.total !== 1)
		{
			if (Ordre.total == 11)
			{
				Ordre.total--;
				Ordre.listeOrdres.unshift(ordre);
				Ordre.listeOrdres.pop();
			}
			else
			{
				Ordre.listeOrdres.unshift(ordre);
			}
		}
		var historique = "";
		for(var ord in Ordre.listeOrdres)
		{
			historique += Ordre.listeOrdres[ord].getMessage();
		}
		$('#zoneOrdres').html(historique);})(this);

	
}

Ordre.Changement = {
    INCREASE_SPEED : 0,
    DECREASE_SPEED : 1,
    INCREASE_ALTITUDE : 2,
    DECREASE_ALTITUDE : 3,
    CHANGE_HEAD_BETTER_WAY : 4,
    CHANGE_HEAD_BY_LEFT : 5,
    CHANGE_HEAD_BY_RIGHT : 6,
    STORM_ZONE_ENTRY_WARNING : 7,
    STORM_ZONE_LEAVING : 8,
    LEAVE_CONTROL_ZONE : 9,
    MODIFY_TARGET_POINT : 10

}

// Permet d'obtenir un choix aléatoire en passant le nombre de choix en paramètres (utile pour rendre plus vivant les logs des ordres)
function randomChoice(numberOfChoices){
	return parseInt((Math.random()*10000000))%numberOfChoices+1;
}