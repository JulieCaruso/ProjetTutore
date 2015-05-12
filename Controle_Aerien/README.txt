
Lien : https://ensiwiki.ensimag.fr/index.php/G%C3%A9rer_des_branches_avec_Git
=======
Les Branches avec GIT :

https://ensiwiki.ensimag.fr/index.php/G%C3%A9rer_des_branches_avec_Git

R�partition travail : 

PHU THANH = fonctions tests (d�crites un peu au dessus et dans le document)

JULIEC = D�placement de l'avion : d�placement usuel

ALEX = Changements avions + r�cup�re fichier perfo + calcul nouvelles positions

JULIER = Barre lat�rale : click avion maj donnees etc, barre, deslectionner avion click ou bouton, vitesse jeu blabla, img fond canvas

Classes javascript:
http://t-templier.developpez.com/tutoriel/javascript/javascript-poo1/

-------------------
Conception du jeu :
 
-------------------

--> Chargement, lancement : OK
--> Regles (setInterval, quand le joueur ne fait rien) ( Mouvements, �v�nements par d�faut)
	Table des performances: en fonction d'un avion donn�: ce qu'il est capable de faire (autre fichier : fichier des perfos � loader aussi .txt)
	Donner un d�lai � un avion (partir apr�s 10s par ex)
	5 positions pass�es
	Etiquette radar: 2 lignes : nom, vitesse courante, altitude courante et cible. A Afficher sur le canvas. 
	A chq instant : fonctions de test : entre avion et zone obstacle // entre avion et zone de fin de jeu // pour v�rifier les distances 
		horizontales entre avions, puis si oui test de v�rification verticale ==> modification de la couleur des 2 avions
	Temps de jeu enregistr�
	Nombre d'�v�nements de type AirProc : Lorsque 2 avions se rapprochent, changent de couleur, s'�loignent, rechangent de couleur
	Test temps limite
	D�placement avion : en fonction de sa table de performance : description pr�cise dans le document
	Rafraichissement : toutes les 10s
	D�placement � h constant : sur le document
	Zone : alteration � definir?
	EndGameTarget (= zone) : ligne (voir xml)
	fond du jeu : possible d'importer une image dans le canvas : puis dessiner dessus
	Si collision?
		D�finir le nombre d'AirProc autoris�
		Lors d'un airproc : popup
	Target point : mettre le nom de l'�tiquette
	En fonction de l'�chelle de la carte, les x et y...
	
--> Fonctionnalit�s (g�rer par des listeners)
	Bouton pause : arret du jeu, play: reprise, stop: fin de jeu
	Clic avion: affichage infos de l'avion : panneau propri�t�s: (JYP: objet controlInterface), rafraichissement d�s mises � jour
		+ on affiche sa route en couleur (ce qui lui reste a faire: en lineaire entre les target points)
		+ indiquer le focus sur l'avion (focus qui disparait sur les autres) : couleur, taille ==> a voir
	(avion suppos� toujours controllable)
	Propri�t�s: modification cap: XBox now : a faire : cercle � cliquer + case a cocher : virage a droite ou a gauche (ou par d�faut ) : 
		precision du joueur. Il existe aussi un r�glage qui calcule le virage le plus court : peut etre un reglage a cocher
	Lors de modification de la part du joueur : v�rification ordre transmis: popup ou petite ligne en bas ==> a voir
	Changement du facteur d'acc�l�ration (du jeu)
	Vent : on ne fait pas
	Virage de l'avion : rayon de virage calcul dans le doc

=> Attributs (Avion) : couleur, X3, X4, H = Head = Cap, cap courant et cap voulu

=> Dossier : a la place du dossier xml: dossier import ou ..

Fichier performances: type = avion; inclinaison, inclinaison max et cassure = on n'en fait rien

17/03 � 15h30 : point

==================================================================

seance du 31/03 :

todo : 

- verifier la maj des donn�es : P
- utiliser le fichier de config : JC (en cours, pas important)
- bouton pause (|| puis > apr�s clic, et vice-versa) : var booleenne test�e dans setInterval a D de quitter
- afficher temps en bas a D
- mettre le curseur de vitesse de jeu au min par defaut
- avion passe au dessus de tout : JC
- pb couleur avions ! : JC
- l'avion C12345 ne parvient pas � rejoindre CFA : il passe juste � c�t� |
- l'avion D67890 a un comportement bizarre / ses points de route         | => A
- zone de fin de jeu? arret du jeu + les afficher
- calculer le score sur l'�cran de fin de jeu : JR
- affichage de tous les logs sur l'�cran de fin de jeu (par niveau?)
- mettre Nouvelle Cible � la valuer de IndexCurrentTarget dans le menu d�roulant : JR
- lorsque l'on clique sur un avion pour voir sa route, ce serait bien qu'elle apparaisse 
  aussit�t et non lors de la prochaine it�ration (vous devriez pouvoir forcer l'affichage du canvas) : JR


fait : 
- vitesses possibles : JR
- r�initialisation quand on clique sur quitter : J�
- pouvoir cliquer sur les targets pour avoir des infos : J� (recuperer + visualiser)
- maj dynamique des valeurs du panneau d'affichage : JR
- mettre les noms des avions et des targets : A
- arranger fenetre logs : A
- faire fct changement cible : A
- niveau a choisir : JC
- faire tous les tests avant affichage (test airproc entre avion, avec lim carte et avec target) : JC
- mettre a jour l'interface pour prendre en compte le chemin le plus court (en cours)
- prendre en compte le changement de vitesse / altitude progressif : A
- afficher la route (en cliquant sur l'avion) : JR
- suivre le cap : JC
- implementer le vent + calcul nouvelle position : A
- jeux de tests : ci-dessous : A

////////////////////////////////////////////////////////////////////////////////////////////////////////


TESTS:

- un jeu avec un seul avion, pas de route, mais un cap initial et le fond de carte MTL afin de tester 
  le comportement de base : mouvement / sol ; virage
- un jeu avec un seul avion, une route en trois points et une zone de fin de jeu afin de tester le suivi 
  de route, le positionnement des points de route / carte, le d�routage-reroutage
- un jeu avec deux avions, une route en trois points et une zone de fin de jeu afin de tester : les conflits
- un jeu avec un seul avion, pas de route, mais un cap initial, une zone de turbulence et le fond de carte MTL 
  afin de tester le comportement des zones de turbulence

Ces jeux pourraient faire l'objet de 4 d�mos rapides qui structureraient votre pr�sentation.

///////////////////////////////////////////////////////////////

PROCHAINE REUNION : 12 Mai � 15h30



