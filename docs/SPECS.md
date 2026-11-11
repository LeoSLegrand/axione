# Spécifications

Version 0.1 du 2026-11-11, à affiner avec l'auteur. Les identifiants F-xx et NF-xx servent à la traçabilité : tests, commits, recette. Priorités : M (Must, indispensable au prototype), S (Should, visé), C (Could, si le temps le permet).

## 1. Vision et périmètre

Livrer un prototype déployé et fonctionnel : vitrine Axione, boutique de 3 gammes, comptes clients, paiement Stripe en mode test, newsletter, mesure d'audience respectueuse du RGPD, avec une chaîne de production complète. Le jury évalue la démarche et la qualité autant que l'étendue.

### Hors périmètre
- Contrôle réel des LED (Bluetooth, firmware). L'application mobile reste une maquette, sauf objectif secondaire Expo.
- Paiements réels, logistique, gestion de stock réelle, TVA multi-pays, multi-devises.
- Catalogue étendu : environ 10 produits en 3 gammes, car chaque produit demande des visuels aux DA.
- Site multilingue (français uniquement).

## 2. Acteurs

- Visiteur : parcourt, s'inscrit à la newsletter, achète.
- Client connecté : compte, historique, adresses, suppression du compte.
- Administrateur : gère produits et commandes (back-office minimal).
- Marketing : consomme les statistiques de conversion.

## Arborescence cible (reprise du M1, voir docs/CONTEXTE.md)

| Page | Contenu | Exigences |
|---|---|---|
| Accueil | Header vidéo, bénéfices, newsletter, accès à la connexion | F-01, F-04, F-20 |
| Gammes | Liste des 3 gammes, filtres | F-10 |
| Produits | Fiches produit | F-11 |
| À propos | Qui sommes-nous | F-02 |
| Avis | Avis clients | F-16 |
| F.A.Q | Questions fréquentes, puis "Poser une question" | F-09, F-07 |
| Connexion compte | Inscription, connexion, espace client | F-20 à F-25 |
| Panier et commande | Tunnel d'achat (absent de l'arborescence du M1, nécessaire à la boutique) | F-12 à F-15 |
| Pages légales | Mentions légales, CGV, CGU, confidentialité, cookies | F-06 |

## 3. Exigences fonctionnelles

### Vitrine
| ID | Exigence | Prio | Phase |
|---|---|---|---|
| F-01 | Page d'accueil fidèle au M1 : header vidéo, accroche, bénéfices (visibilité, sécurité, style), appels à l'action vers la boutique | M | 1 |
| F-02 | Section "Qui sommes-nous" | S | 1 |
| F-03 | Section "Application mobile" présentant les maquettes du M1 | S | 1 |
| F-04 | Inscription newsletter avec double opt-in (email de confirmation) | M | 1 |
| F-05 | Code promo -10% unique, envoyé après confirmation de l'inscription, valable sur la première commande | S | 3 |
| F-06 | Pages légales : mentions légales, CGV, CGU, politique de confidentialité, politique cookies | M | 4 |
| F-07 | "Poser une question" : formulaire lié à la FAQ, envoyé à contact@axione.com | S | 4 |
| F-08 | Pied de page avec réseaux sociaux et contact | M | 1 |
| F-09 | Page F.A.Q (questions fréquentes sur les LED, l'entretien, la batterie, la livraison, les retours) | S | 1 |

### Boutique
| ID | Exigence | Prio | Phase |
|---|---|---|---|
| F-10 | Catalogue par gammes (running, cyclisme, trail) avec filtres (gamme, genre, taille) | M | 2 |
| F-11 | Fiche produit : visuels, description, matières et impact, tailles, caractéristiques LED, disponibilité | M | 2 |
| F-12 | Panier persistant (visiteur et client connecté) | M | 2 |
| F-13 | Tunnel de commande avec paiement Stripe en mode test | M | 3 |
| F-14 | Confirmation de commande (page et email) | M | 3 |
| F-15 | Application d'un code promo au panier | S | 3 |
| F-16 | Page "Avis" et avis sur les fiches produit : dépôt réservé aux clients ayant acheté, modération avant publication. Les avis de démonstration sont clairement marqués comme tels | C | 4 |

### Comptes
| ID | Exigence | Prio | Phase |
|---|---|---|---|
| F-20 | Inscription, connexion, déconnexion | M | 3 |
| F-21 | Vérification de l'adresse email | S | 3 |
| F-22 | Réinitialisation du mot de passe | S | 3 |
| F-23 | Profil et adresses de livraison | S | 3 |
| F-24 | Historique des commandes | M | 3 |
| F-25 | Suppression du compte et export des données personnelles (droits RGPD) | M | 4 |

### Administration et mesure
| ID | Exigence | Prio | Phase |
|---|---|---|---|
| F-30 | Back-office minimal : produits, stock, commandes | C | 4 |
| F-40 | Suivi d'événements pour le marketing : clic sur appels à l'action, inscription newsletter, ajout au panier, achat, dans le respect du consentement | M | 4 |
| F-41 | Tableau de bord marketing (via l'outil d'analytics retenu) | C | 4 |

### Objectif secondaire
| ID | Exigence | Prio | Phase |
|---|---|---|---|
| F-50 | Application mobile Expo : périmètre à redéfinir à partir des maquettes du M1 (connexion et inscription, tableau de bord avec choix de couleur des LED simulé, suivi d'activités simulé), réutilisant les cas d'usage de packages/core via une API REST (chemin d'extraction décrit dans docs/ARCHITECTURE.md) | C | 6 |

## 4. Exigences non fonctionnelles

Les seuils sont des cibles proposées, à valider par l'auteur.

| ID | Domaine | Exigence |
|---|---|---|
| NF-01 | Performance | Lighthouse mobile, performance de 90 ou plus sur la landing page (vidéo du header optimisée : poster, chargement différé, formats compressés) |
| NF-02 | Accessibilité | Visée WCAG 2.2 AA et RGAA. Zéro violation axe critique ou sérieuse sur les parcours clés. Lighthouse accessibilité de 95 ou plus. Navigation clavier complète, focus visible, `prefers-reduced-motion` respecté |
| NF-03 | Sécurité | OWASP Top 10 pris en compte : mots de passe hachés (argon2id ou bcrypt), HTTPS uniquement, en-têtes de sécurité (CSP, HSTS), limitation de débit sur authentification et newsletter, validation des entrées côté serveur, protection CSRF, secrets hors dépôt, audit des dépendances |
| NF-04 | RGPD | Voir docs/RGPD.md : minimisation, consentement, droits des personnes, durées de conservation, sous-traitants documentés |
| NF-05 | Scalabilité | Application sans état, configuration par variables d'environnement (12 facteurs), médias hors du serveur applicatif, cache HTTP, pagination, index en base. Montée en charge décrite dans docs/DEPLOIEMENT.md |
| NF-06 | Qualité de code | TypeScript strict, lint sans erreur, formatage automatique, couverture de tests de 80 % ou plus sur la logique métier (seuil bloquant en CI) |
| NF-07 | Observabilité | Logs structurés, endpoint de santé `/api/health`, suivi des erreurs |
| NF-08 | SEO | Rendu serveur, métadonnées, sitemap, Open Graph |
| NF-09 | Compatibilité | Navigateurs récents, conception mobile d'abord |
| NF-10 | CI | Pipeline complet en moins de 8 minutes pour pouvoir le montrer en direct |
| NF-11 | Éco-conception | Budget de poids de page suivi (cohérent avec la sensibilité écologique d'Alex) |
| NF-12 | Identité visuelle | Charte du M1 appliquée via des variables de thème centralisées (couleurs, typographies, dégradé). Polices auto-hébergées. Combinaisons texte et fond conformes aux contrastes calculés dans docs/CONTEXTE.md |

## 5. Parcours critiques (base des tests e2e et de la recette)

- P1 : un visiteur s'inscrit à la newsletter, confirme son email, reçoit son code promo.
- P2 : un visiteur parcourt une gamme, ouvre une fiche, ajoute au panier, crée un compte, paie (carte de test Stripe), voit la confirmation.
- P3 : un client connecté retrouve sa commande dans l'historique, puis supprime son compte.
- P4 : un administrateur modifie un stock (si F-30 retenu).

## 6. Modèle de données (conceptuel)

User, Address, Collection (gamme), Product, Variant (taille, couleur, stock), Cart et CartItem, Order et OrderItem, Payment, PromoCode, NewsletterSubscriber, ConsentRecord.

## 7. Phases et calendrier

Remise du dossier et du code : lundi 1er mars 2027. Début : 11 novembre 2026, soit environ 15 semaines. Une branche par phase (`phaseN/slug`).

| Phase | Contenu | Période indicative |
|---|---|---|
| 0 | Walking skeleton : décisions techniques, monorepo, lint, tests, CI, déploiement d'une page minimale | 12 nov au 29 nov |
| 1 | Landing page, newsletter avec double opt-in, pied de page | 30 nov au 20 déc |
| 2 | Catalogue, fiches produit, panier | 21 déc au 17 jan |
| 3 | Comptes, paiement Stripe test, commandes, code promo | 18 jan au 7 fév |
| 4 | Pages légales, analytics et consentement, droits RGPD, back-office minimal | 8 fév au 17 fév |
| 5 | Durcissement : couverture, accessibilité, performance, recette, documentation utilisateur | 18 fév au 26 fév |
| Gel | Gel du code le 26 fév, finalisation du dossier, dépôt passé en public | 26 fév au 1er mars |
| 6 | Application mobile Expo (objectif secondaire, seulement si les phases 1 à 3 sont terminées en avance) | Hors chemin critique |

Les périodes de fêtes (phase 2) sont comptées plus légères. Si un retard apparaît, couper dans l'ordre : F-50, F-41, F-30, F-16, F-07, F-02.

## 8. Définition du walking skeleton (phase 0)

Le plus petit système de bout en bout : monorepo installé, une page web minimale et un endpoint `/api/health` de l'application Next.js, un test unitaire, un test d'intégration, un test e2e de fumée, lint et typecheck, CI GitHub Actions verte, image Docker construite, déploiement automatique sur un environnement de test accessible. Tout ce qui suit s'appuie dessus : on ne développe pas de fonctionnalité avant qu'il soit vert.

## 9. Questions ouvertes

- Gammes, produits, prix et tailles du catalogue fictif : à fournir ou à inventer avec les DA.
- Nom du produit LED et caractéristiques techniques à afficher (autonomie, lavage, etc.).
- Back-office : F-30 retenu ou remplacé par un script de seed et d'administration en ligne de commande ?
- Contenus rédactionnels (Qui sommes-nous, FAQ, mentions légales fictives) : qui les rédige ?
- Application mobile (F-50) : garder les maquettes du M1 telles quelles, les corriger (langue, libellés, contrastes), ou ne les présenter que comme visuels dans la section "Application mobile" du site ?
- Avis (F-16) : vrai système d'avis modéré, ou page statique de démonstration clairement marquée comme telle ?
- Fichiers vectoriels (SVG) du logo et du pictogramme, et fichiers ou licences des polices Eurostile Extended et Futura PT : à demander aux DA.
