# Contexte produit

## L'entreprise (fictive, créée au M1)

Axione Athletics est positionnée sur le marché du textile sportif connecté et sécuritaire. Elle conçoit et commercialise des vêtements techniques intégrant des LED intelligentes pour les pratiquants de sports outdoor de nuit (running, cyclisme, trail). Le produit n'est pas seulement réfléchissant : il émet de la lumière, sans sacrifier le style.

Promesse : sécurité, visibilité nocturne, performance, style.

Thème du projet startup : "comment intégrer le digital". Le produit doit être connecté au digital. C'est pourquoi un simple site marchand ne suffit pas et qu'une application mobile (contrôle des LED du vêtement) existe en maquette.

## Ce qui existe (M1)

- Un site vitrine Framer (landing page) : https://jolly-eyes-214103.framer.app/
- Une charte graphique complète, une arborescence de site, des templates de posts, un moodboard et des maquettes d'application mobile. Les slides sont dans framer-reference/m1-slides/ (local, ignoré par git).
- Deux personas, conçus pour justifier l'existence du produit (pas pour décrire l'usage du site).
- Des assets produits par les DA : vidéo du header, images produits, logo.

Le bouton "Découvrez nos gammes" de la landing page ne mène nulle part aujourd'hui. Demain, il mène à la boutique.

## Objectif du M2 (ce dépôt)

Reconstruire le site de zéro en Next.js et Node.js, ajouter comptes clients et boutique, déployer le tout avec une chaîne de production complète (tests, CI/CD, qualité, RGPD, accessibilité). Application mobile Expo : objectif secondaire, seulement si le temps le permet.

## Personas

### Alex Morel, 32 ans, Vannes
Sportif urbain, célibataire, emploi stable dans le numérique. Court tôt le matin ou tard le soir, fait du vélo et de la musculation. Attiré par l'innovation, prêt à payer plus pour la qualité, actif sur les réseaux sociaux, sensible aux marques engagées. Frustrations : confort et performance irréguliers, prix élevés pour une qualité jugée inconstante. Besoins : produits cohérents avec ses valeurs, tenues techniques et respirantes, sensibilité écologique (matériaux responsables, impact limité).

### Stéphanie Rio, 48 ans, Larmor-Plage
Médecin libérale, mariée, sportive régulière (vélo en fin de journée le long de la côte, marche, randonnée). Attachée à la santé, au confort, à l'esthétique et à la féminité de ses tenues. Frustrations : manque de sécurité lors des sorties nocturnes, difficulté à concilier esthétique et technicité. Besoins : se sentir protégée sur route ou piste cyclable, élégance et qualité.

### Conséquences pour le site
- Mettre en avant visibilité, sécurité, confort et style sur chaque fiche produit.
- Informations matériaux et impact environnemental visibles (attente d'Alex).
- Offre lisible pour des pratiques différentes (running, cyclisme, trail) et des publics différents (homme, femme).
- Expérience mobile soignée (usage en déplacement).

## Identité visuelle (source : charte du M1)

La charte du M1 fait foi. Le site Framer actuel s'en écarte par endroits (fonds noirs, pied de page cyan uni) : en cas de doute, suivre la charte. Slides de référence : framer-reference/m1-slides/ (01 logotype, 02 chartes, 03 backgrounds, 04 templates de posts, 07 moodboard).

### Couleurs

| Nom proposé | Hexadécimal | Usage |
|---|---|---|
| Violet nuit | #2A015B | Fond principal sombre |
| Cyan LED | #00CFFF | Accent principal, appels à l'action, pictogrammes |
| Bleu | #6D85FF | Accent secondaire |
| Rose | #F91DBF | Accent vif, mise en avant |
| Blanc et noir | #FFFFFF, #000000 | Texte, logo selon le fond |

Dégradé signature : du cyan (#00CFFF) vers le rose (#F91DBF), en passant par le bleu et le violet. On le retrouve en arrière-plan des slides (coins) et dans les templates. Effets lumineux évoquant les LED (halo, néon, traînées de lumière, voir moodboard).

À centraliser dans des variables de thème (tokens) dès la phase 1, jamais de couleur en dur dans les composants.

### Contrastes calculés (WCAG, ratios calculés en novembre 2026)

Seuils : 4,5 pour le texte courant, 3 pour le grand texte et les éléments d'interface.

| Texte sur fond | Ratio | Verdict |
|---|---|---|
| Blanc sur violet nuit | 16,75 | Conforme |
| Cyan sur violet nuit | 9,07 | Conforme |
| Bleu sur violet nuit | 5,14 | Conforme |
| Rose sur violet nuit | 4,75 | Conforme (limite, éviter le petit texte fin) |
| Blanc sur cyan | 1,85 | Non conforme : utiliser du noir (11,37) ou du violet nuit (9,07) |
| Blanc sur bleu | 3,26 | Insuffisant pour du texte courant : utiliser du noir (6,45) ou du violet nuit (5,14) |
| Blanc sur rose | 3,53 | Insuffisant pour du texte courant, acceptable pour du grand texte gras : sinon noir (5,96) |
| Cyan, bleu ou rose sur noir | 11,37, 6,45, 5,96 | Conformes |

Conséquence : sur fond sombre, la palette passe. Les boutons pleins cyan, bleu ou rose reçoivent un texte sombre. Ces valeurs alimentent docs/ACCESSIBILITE.md.

### Typographies
- Eurostile Extended (regular, medium, black) : titres, logotype, sections. Souvent en majuscules.
- Futura PT (light, medium, bold) : texte courant, interface.
Ce sont deux polices commerciales : licence web à vérifier avant usage (voir DEC-015 dans DECISION.md). Les fichiers de police doivent être auto-hébergés.

### Logo
- Logotype "AXIONE" avec la mention "ATHLETICS" et deux filets, en version blanche et noire.
- Version avec pictogramme (carré arrondi) à gauche du logotype.
- Pictogramme seul (icône d'application, favicon) en blanc, noir, cyan, bleu et rose.
- Versions colorées du logotype : violet foncé, cyan, bleu, rose.
- Règles de fond : logo blanc sur fond noir, gris, couleur foncée et photo foncée. Logo sombre sur fond blanc, couleur claire, cyan vif et photo claire.
- Les slides sont des images : demander aux DA les fichiers vectoriels (SVG) du logo et du pictogramme.

### Ton et contenus marketing (templates de posts du M1)
- Offre de lancement : "-10% sur votre inscription", "Rejoignez les runners visibles de jour comme de nuit", bouton "Inscrivez-vous maintenant !".
- Argument produit : "Changez de couleur à volonté". Six bénéfices en pictogrammes : visibilité 360°, résistant à l'eau, batterie longue durée, contrôle Bluetooth, 16 millions de couleurs, personnalisez votre style.
- Partenariat Strava (post du M1) : sécurité renforcée, performance connectée, communauté motivante, "Éclairons vos performances". Strava est une marque tierce : sur le site public, ne pas utiliser son logo ni laisser croire à un partenariat réel sans le présenter comme un concept fictif.
- Le moodboard (néon, dégradés, scènes nocturnes, traînées de lumière) donne l'ambiance. Il contient des images de tiers : ne jamais les réutiliser sur le site.

### Contenus relevés sur le site Framer actuel
- Navigation minimale : logo à gauche, lien "Boutique" à droite.
- Header avec vidéo (asset des DA). Accroche : "Explorez notre gamme de vêtements offrant visibilité et confort dans les environnements difficiles."
- Section newsletter : "Restez informé !" puis "Inscrivez-vous à notre newsletter pour recevoir des conseils de sécurité et profiter de -10% sur votre première commande." Champ email et bouton "S'inscrire".
- Pied de page : "Informations d'entreprise" (Qui sommes-nous ? Application mobile), "Inscription Newsletter", "Contactez-nous : contact@axione.com", "Suivez-nous sur les réseaux" (X, YouTube, Facebook, Instagram, LinkedIn), mention "© 2025 Axione. Tous droits réservés." (à mettre à jour), liens "Mentions légales", "CGV", "CGU".

## Arborescence prévue au M1 (slide 05)

- Page d'accueil, reliée à "Connexion compte".
- Gammes, puis Produits.
- À propos.
- Avis.
- F.A.Q, puis "Poser une question".
- Newsletter (rattachée à la page d'accueil).

Cette arborescence est plus riche que le site Framer actuel (qui ne montre que "Boutique"). Elle est reprise dans docs/SPECS.md (pages Avis, FAQ, Poser une question en plus).

## Maquettes de l'application mobile (slide 06, statut à décider)

Quatre écrans :
- Inscription (email, mot de passe, confirmation) et connexion, avec un visuel lumineux en bandeau.
- Tableau de bord du vêtement : photo du t-shirt, niveau de batterie (75 %, autonomie estimée), jours de la semaine avec interrupteur et bouton "Add script", roue de couleurs pour choisir la couleur des LED, kilométrage récent (325 km sur deux semaines), lien "Notre site", profil.
- Suivi : bannière de liaison Strava, calories par jour, médailles (lancer une session, connecter un vêtement, lier son compte Strava), scores (plus grande distance), dernières activités avec carte.

Observations pour la décision : textes mélangés français et anglais (Register, Password, Sign up), libellés des deux écrans de connexion incohérents (bouton "Sign up" sur l'écran de connexion), bouton blanc sur bleu clair au contraste insuffisant, et couleur d'exemple #6d85ff conforme à la charte. Si l'application est reprise (F-50), ces points sont à corriger. Un lien réel avec Strava (OAuth, conditions d'usage de l'API) et un vrai contrôle Bluetooth sont hors périmètre : on simule.

Règle de design : l'accessibilité ne doit pas détruire l'identité visuelle. On corrige les contrastes, le focus et le mouvement réduit au cas par cas, sans neutraliser le style.
