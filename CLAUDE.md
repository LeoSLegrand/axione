# CLAUDE.md

## Projet

Axione Athletics : textile sportif connecté (LED intégrées) pour le sport de nuit (running, cyclisme, trail). Ce dépôt contient le prototype du M2 du MBA Développeur Full Stack : un site vitrine et boutique sur mesure (Next.js + Node.js) qui remplace le site Framer du M1.

- Développeur : une seule personne (l'utilisateur), évaluée individuellement par un jury de professionnels.
- Échéance : remise du dossier et du code source le 1er mars 2027, soutenance en mars 2027.
- Objectif : un prototype déployé et fonctionnel, pas un produit complet. La qualité de la démarche (choix justifiés, tests, CI/CD, RGPD, accessibilité) compte autant que le nombre de fonctionnalités.

## Documents de référence (à lire avant de travailler)

| Fichier | Contenu |
|---|---|
| docs/CONTEXTE.md | Produit, personas, identité visuelle |
| docs/SPECS.md | Périmètre fonctionnel, exigences (F-xx, NF-xx), phases et calendrier |
| docs/LIVRABLES.md | Ce que le jury attend et où chaque preuve vit dans le dépôt |
| docs/DEPLOIEMENT.md | Hébergement, CI/CD, environnements, coûts |
| docs/TESTS.md | Stratégie de tests et matrice de traçabilité |
| docs/RGPD.md | Registre des traitements de données et mesures |
| CONTRIBUTING.md | Convention des messages de commit et des branches (obligatoire) |
| DECISION.md | Journal local des décisions techniques (ignoré par git) |
| framer-reference/ | Export du site Framer du M1 et slides du M1 (charte, arborescence, maquettes mobile, moodboard) dans m1-slides/, local, ignoré par git |

## Règles de travail

### 1. Décisions techniques : toujours confirmer avant d'agir

- Avant d'adopter une technologie, une bibliothèque structurante, un service externe ou une option d'infrastructure qui n'est pas déjà "Validée" dans DECISION.md, pose la question à l'utilisateur avec l'outil de questions à choix : 2 à 4 options, ta recommandation en premier, avec coût et risque en une ligne chacune.
- Compare réellement les options avant de les présenter. Ne liste jamais une alternative "étudiée" que tu n'as pas évaluée : le jury interrogera ces comparaisons.
- Quand l'utilisateur a validé, mets à jour DECISION.md tout de suite, au format fixe décrit en tête de DECISION.md (contexte, options étudiées, choix, justification, coût, risques), puis seulement ensuite implémente.
- Le backlog des décisions à trancher est dans DECISION.md. Tranche-les au moment où une phase en a besoin, pas toutes d'un coup.
- Les détails d'implémentation (nom de fichier, structure d'un composant) ne sont pas des décisions : agis sans demander.
- DECISION.md est personnel et ignoré par git. Ne le commit jamais et n'en cite pas le contenu dans les messages de commit ni dans la documentation versionnée.

### 2. Git

- Commits : autonome. Suis CONTRIBUTING.md à la lettre (`type(scope): description`, en anglais, impératif présent, minuscule initiale, sans point final). Commits petits et atomiques.
- Branches : une branche par tâche majeure, nommée `phaseN/slug` (exemples : `phase1/landing-page`, `phase2/shop`). Jamais de travail direct sur `main`.
- Merge dans `main` : seulement quand la CI est verte et après accord de l'utilisateur. Préférer une pull request.
- Push : demande confirmation (le fichier .claude/settings.json ne l'autorise pas d'office).
- Jamais : force push, réécriture d'historique partagé, commit de secrets (.env), commit de framer-reference/ ou de DECISION.md.

### 3. Qualité : définition de "terminé"

Une fonctionnalité est terminée quand :
- le code TypeScript strict compile sans erreur et le lint est propre ;
- les tests sont écrits et passent (unitaires et intégration, e2e pour les parcours clés) ;
- l'accessibilité est vérifiée (clavier, contrastes, libellés, axe) ;
- la CI est verte, sans régression ;
- les documents concernés (docs/LIVRABLES.md, docs/TESTS.md, docs/RGPD.md) sont à jour.

Écris les tests en même temps que le code et relie-les aux exigences de docs/SPECS.md (identifiants F-xx et NF-xx) : c'est ce qui alimente la matrice de traçabilité exigée par le jury.

Garde la CI rapide (cible : moins de 8 minutes). Elle sera déclenchée en direct pendant la soutenance pour montrer le déploiement continu, le rejeu des tests (non-régression) et la réévaluation de la qualité du code.

### 4. Produit et design

- Respecte l'identité visuelle de la charte du M1 (couleurs, typographies, logo : voir docs/CONTEXTE.md et framer-reference/m1-slides/). Couleurs et polices passent par des variables de thème centralisées. Texte sombre sur les fonds cyan, bleu et rose. L'accessibilité ne doit pas sacrifier cette identité : ajuste au cas par cas (contrastes, focus visible, `prefers-reduced-motion`) plutôt que de neutraliser le design.
- framer-reference/ est une référence pour les assets, les animations et les textes. N'importe jamais de code Framer. Copie les assets utiles dans le projet après optimisation et inventorie-les dans docs/ASSETS.md.
- Catalogue volontairement réduit (3 gammes, une dizaine de produits) car chaque produit demande des visuels aux DA. N'invente pas de visuels produit : utilise les assets existants ou des placeholders clairement marqués.
- Stripe en mode test uniquement. Aucune vraie donnée personnelle dans les jeux de données.
- Données personnelles : applique docs/RGPD.md dès la conception (minimisation, durées de conservation, suppression de compte, consentement).

### 5. Rédaction

- Langue : documentation, interface et échanges en français ; code, noms de variables et commits en anglais.
- Pas de tirets cadratins dans les textes rédigés (docs, DECISION.md, README) : l'auteur les reprend dans son dossier Word. Reformule avec des virgules, deux-points ou parenthèses.
- DECISION.md sert aussi de journal de retour d'expérience : quand tu rencontres et résous un problème notable (bug difficile, impasse technique, changement d'avis), ajoute une entrée dans la section "Problèmes rencontrés". Le jury demande cette analyse en soutenance.

## Commandes

À compléter par l'agent en phase 0 (installation, dev, test, lint, typecheck, build, e2e) dès que le monorepo existe.

## Par où commencer

1. Lire les documents ci-dessus.
2. Inventorier framer-reference/ (assets, vidéo, animations, textes, couleurs, typographies) dans docs/ASSETS.md. Regarder aussi les slides de framer-reference/m1-slides/. Si l'export Framer est absent, demander à l'utilisateur de le déposer.
3. Poser à l'utilisateur les questions des décisions DEC-006 (architecture), DEC-007 et DEC-008 (base de données, ORM) du backlog.
4. Créer la branche `phase0/setup` et mettre en place le "walking skeleton" décrit dans docs/SPECS.md : monorepo, lint, tests, CI, déploiement d'une page minimale sur un environnement de test.
