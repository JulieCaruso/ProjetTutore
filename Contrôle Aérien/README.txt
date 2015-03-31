
Lien : https://ensiwiki.ensimag.fr/index.php/G%C3%A9rer_des_branches_avec_Git
=======
Les Branches avec GIT :

https://ensiwiki.ensimag.fr/index.php/G%C3%A9rer_des_branches_avec_Git

Répartition travail : 

PHU THANH = fonctions tests (décrites un peu au dessus et dans le document)

JULIEC = Déplacement de l'avion : déplacement usuel

ALEX = Changements avions + récupère fichier perfo + calcul nouvelles positions

JULIER = Barre latérale : click avion maj donnees etc, barre, deslectionner avion click ou bouton, vitesse jeu blabla, img fond canvas

Classes javascript:
http://t-templier.developpez.com/tutoriel/javascript/javascript-poo1/

-------------------
Conception du jeu :
 
-------------------

--> Chargement, lancement : OK
--> Regles (setInterval, quand le joueur ne fait rien) ( Mouvements, évènements par défaut)
	Table des performances: en fonction d'un avion donné: ce qu'il est capable de faire (autre fichier : fichier des perfos à loader aussi .txt)
	Donner un délai à un avion (partir après 10s par ex)
	5 positions passées
	Etiquette radar: 2 lignes : nom, vitesse courante, altitude courante et cible. A Afficher sur le canvas. 
	A chq instant : fonctions de test : entre avion et zone obstacle // entre avion et zone de fin de jeu // pour vérifier les distances 
		horizontales entre avions, puis si oui test de vérification verticale ==> modification de la couleur des 2 avions
	Temps de jeu enregistré
	Nombre d'évènements de type AirProc : Lorsque 2 avions se rapprochent, changent de couleur, s'éloignent, rechangent de couleur
	Test temps limite
	Déplacement avion : en fonction de sa table de performance : description précise dans le document
	Rafraichissement : toutes les 10s
	Déplacement à h constant : sur le document
	Zone : alteration à definir?
	EndGameTarget (= zone) : ligne (voir xml)
	fond du jeu : possible d'importer une image dans le canvas : puis dessiner dessus
	Si collision?
		Définir le nombre d'AirProc autorisé
		Lors d'un airproc : popup
	Target point : mettre le nom de l'étiquette
	En fonction de l'échelle de la carte, les x et y...
	
--> Fonctionnalités (gérer par des listeners)
	Bouton pause : arret du jeu, play: reprise, stop: fin de jeu
	Clic avion: affichage infos de l'avion : panneau propriétés: (JYP: objet controlInterface), rafraichissement dès mises à jour
		+ on affiche sa route en couleur (ce qui lui reste a faire: en lineaire entre les target points)
		+ indiquer le focus sur l'avion (focus qui disparait sur les autres) : couleur, taille ==> a voir
	(avion supposé toujours controllable)
	Propriétés: modification cap: XBox now : a faire : cercle à cliquer + case a cocher : virage a droite ou a gauche (ou par défaut ) : 
		precision du joueur. Il existe aussi un réglage qui calcule le virage le plus court : peut etre un reglage a cocher
	Lors de modification de la part du joueur : vérification ordre transmis: popup ou petite ligne en bas ==> a voir
	Changement du facteur d'accélération (du jeu)
	Vent : on ne fait pas
	Virage de l'avion : rayon de virage calcul dans le doc

=> Attributs (Avion) : couleur, X3, X4, H = Head = Cap, cap courant et cap voulu

=> Dossier : a la place du dossier xml: dossier import ou ..

Fichier performances: type = avion; inclinaison, inclinaison max et cassure = on n'en fait rien

17/03 à 15h30 : point

==================================================================

seance du 31/03 :

todo : 
- arranger fenetre logs : JR
- faire tous les tests avant affichage : JC
- mettre les noms des avions et des targets : JC + A
- pouvoir cliquer sur les targets pour avoir des infos : J² (recuperer + visualiser)
- vitesses possibles : JR
- verifier la maj des données : P
- mettre a jour l'interface pour prendre en compte le chemin le plus court
- utiliser le fichier de config
- langues + niveau à choisir : JC
- implementer le vent + calcul nouvelle position : A
- faire fct changement cible : A
- prendre en compte le changement de vitesse / altitude progressif : P
- maj dynamique des valeurs du panneau d'affichage : JR
- apporter le café et les croissants : A

POURQUOI LA 4E POSITION EST TJ A L OUEST