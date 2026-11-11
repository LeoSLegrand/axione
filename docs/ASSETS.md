# Inventaire des assets

Inventaire de framer-reference/ (local, ignoré par git) réalisé le 2026-11-11. Il sert de référence pour reconstruire le site sans importer de code Framer (DEC-001). Chaque asset réutilisé dans le projet est copié après optimisation et sa ligne passe au statut "Intégré", avec son chemin dans le dépôt.

## 1. Contenu de framer-reference/

| Élément | Contenu | Remarque |
|---|---|---|
| app/ | Export Next.js du site Framer : page d'accueil (Home.tsx, environ 38 Ko), page 404, composants (boutons, vidéo, curseur, texte riche), styles (globals.css, styles.module.css) | Code généré, jamais copié |
| app/_components/RevealWatcher.tsx | Apparition des blocs au défilement (IntersectionObserver, attribut `data-in`) | Animation à réécrire, avec respect de `prefers-reduced-motion` (absent de l'export) |
| m1-slides/ | 7 slides du M1 (PNG) | Voir §4 |
| package.json, next.config.mjs | Next 15, React 19 | Les images sont servies par le CDN de Framer |

Constat important : l'export ne contient aucun fichier média. Vidéo, images, logos et polices sont chargés depuis framerusercontent.com, fonts.gstatic.com et Fontshare. Ils doivent être récupérés (idéalement les originaux auprès des DA), optimisés, puis hébergés dans le projet.

## 2. Médias référencés par le site Framer

Préfixe des sources : `https://framerusercontent.com/`.

| Asset | Source | Dimensions | Usage sur le site Framer | Statut |
|---|---|---|---|---|
| Vidéo du header | assets/QvmojdNEGvUeU6PNv0mNLLDjtFI.mp4 | inconnue | Header de l'accueil (lecture auto, muette, en boucle) | À récupérer (original des DA de préférence), compresser en WebM et MP4 (DEC-016) |
| Image d'attente de la vidéo | images/iDLPC0URlXv9s4w3dOiSMybIRg.png | 2880 x 1032 | Poster du header | À convertir en AVIF ou WebP |
| Logo blanc (navigation) | images/xbU68L4ehUPo4yvjltfafpbVUDY.png | 4992 x 998 | Barre de navigation | Raster : demander le SVG aux DA |
| Logo (pied de page) | images/xpf4ajhnWVoguAwQrFJabuOJ1Q.png | 1198 x 240 | Pied de page | Raster : demander le SVG aux DA |
| Visuel produit 1 | images/I3dvstUgKjn0tkf2qmJRIbM7Ug.png | 1024 x 1536 | Carrousel produits | Image générée par IA (calque nommé "chatgpt-image-11-déc-2025") : statut à décider, sinon placeholder marqué |
| Visuel produit 2 | images/dRD6STLxoI9HRtAuFBeRi0vfNc8.png | 1024 x 1536 | Carrousel produits | Idem |
| Visuel produit 3 | images/uejGaDlPmz0wpWGlWWMVUMEuTY.jpg | 1024 x 1536 | Carrousel produits | Idem |
| Fond de section | images/uXPcWLPQCcH4o4ZRXAEHYBDAp8o.jpg | 1920 x 1080 | Section bénéfices | Origine et droits à vérifier |
| Fond de la section avis | images/O9rUsnOuvRVIKF5to3Kd4eja8A.jpg | 1920 x 1080 | Section "Avis de nos clients" | Origine et droits à vérifier |
| Avatar d'avis | images/x8QEYTT4FCkFH0NhCsA7v9XTNg.png | 128 x 128 | Avis client | Ne pas réutiliser sans droits (personne réelle possible) |
| Flèches du carrousel | images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg, images/11KSGbIZoRSg4pjdnUoif6MKHI.svg | SVG | Boutons précédent et suivant | Remplacer par des icônes du projet |
| Pictogrammes des bénéfices | SVG intégrés dans Home.tsx | Vectoriel | Bouclier (sécurité), cœur (confort), soleil (visibilité), flèches de recyclage (environnement) | Redessiner ou utiliser une bibliothèque d'icônes libre |

## 3. Polices

| Police | Source | Usage Framer | Décision |
|---|---|---|---|
| Inter | Google Fonts et CDN Framer | Texte courant | Hors charte, non reprise |
| Roboto | fonts.gstatic.com | Certains textes | Hors charte, non reprise |
| Clash Display | Fontshare via le CDN Framer | Titres | Hors charte, non reprise |

La charte du M1 impose Eurostile Extended (titres) et Futura PT (texte), deux polices commerciales. Licences ou alternatives libres à trancher dans DEC-015, fichiers auto-hébergés dans tous les cas (aucun appel à un CDN tiers).

## 4. Slides du M1 (m1-slides/)

| Fichier | Contenu utile au site |
|---|---|
| 01-logotype.png | Logotype AXIONE ATHLETICS (blanc, noir, avec pictogramme), versions colorées (violet, cyan, bleu, rose), pictogramme seul en 5 couleurs (favicon, icône) |
| 02-chartes.png | Couleurs #2A015B, #00CFFF, #6D85FF, #F91DBF, dégradé cyan vers rose, Eurostile Extended (regular, medium, black), Futura PT (light, medium, bold) |
| 03-conseils-backgrounds.png | Logo blanc sur fond noir, gris, couleur foncée, photo foncée ; logo sombre sur fond blanc, couleur claire, cyan vif, photo claire |
| 04-templates-posts.png | Ton marketing : offre de lancement -10 %, "Changez de couleur à volonté", six bénéfices en pictogrammes, concept de partenariat Strava (marque tierce, à présenter comme fictif) |
| 05-arborescence.png | Accueil, Connexion compte, Gammes puis Produits, À propos, Avis, F.A.Q puis Poser une question, Newsletter |
| 06-maquettes-mobile.png | Quatre écrans de l'application (inscription, connexion, tableau de bord du vêtement, suivi) |
| 07-moodboard.png | Ambiance (néon, dégradés, nuit). Contient des images et logos de tiers : jamais réutilisés sur le site |

Ces images ne sont pas des assets de production : le logo et le pictogramme doivent être obtenus en SVG auprès des DA.

## 5. Textes relevés sur le site Framer

| Emplacement | Texte |
|---|---|
| Header, accroche | "Explorez notre gamme de vêtements offrant visibilité et confort dans les environnements difficiles." |
| Header, boutons | "Découvrez nos gammes", "Découvrir la marque" |
| Bénéfice | "Visibilité Maximale" : "Notre technologie intégrée assure une visibilité optimale et un confort inégalé dans toutes les conditions." |
| Bénéfice | "Sécurité" : "Courez l'esprit libre. Nos vêtements réduisent de 80% les risques d'accident liés au manque de visibilité nocturne" |
| Bénéfice | Confort : "Tissus respirants et coutures ergonomiques pour un ajustement parfait." |
| Bénéfice | "Environnement" : "Nos vêtements privilégient des tissus responsables et moins polluants, afin de réduire notre impact environnemental." |
| Section | "Les équipements de sport réfléchissants" |
| Avis | "Avis de nos clients", "Découvrez ce que nos clients disent de l'expérience Axione.", "Lire les avis", exemple : "Le confort de ces vêtements est incroyable, je les adore!" |
| FAQ | "Questions Fréquentes", "Trouver des réponses à vos questions concernant nos produits.", exemple : "Les vêtements sont-ils lavables en machine ?" |
| Newsletter | "Restez informé !", "Inscrivez-vous à notre newsletter pour recevoir des conseils de sécurité et profiter de -10% sur votre première commande.", champ "Entrez votre adresse email", bouton "S'inscrire" |
| Pied de page | "INFORMATIONS D'ENTREPRISE" (Qui sommes-nous ? Application mobile), "Inscription Newsletter", "Contactez-nous : contact@axione.com", "SUIVEZ-NOUS SUR LES RÉSEAUX", "Mentions légales", "CGV", "CGU" |

Points d'attention avant réutilisation :
- L'allégation "réduisent de 80% les risques d'accident" n'est pas sourcée : la reformuler ou la présenter comme fictive (risque de pratique commerciale trompeuse).
- L'avis client affiché est un exemple : tout avis de démonstration doit être marqué comme tel (F-16).
- L'adresse contact@axione.com ne correspond pas au domaine fictif axione.fr, et axione.com peut appartenir à un tiers réel : l'application ne doit jamais y envoyer de courriels réels (adresse de test en développement).

## 6. Assets intégrés au projet

| Asset | Chemin dans le dépôt | Source | Optimisation | Licence |
|---|---|---|---|---|
| (aucun pour l'instant) | | | | |
