# Stratégie de tests

Squelette à compléter au fil du développement. Les outils sont à confirmer (DEC-010 et DEC-011). Le jury attend : scénarios fondés sur l'expression des besoins, rapport de couverture, preuve de non-régression, synthèse de recette.

## 1. Niveaux de test

| Niveau | But | Outils pressentis | Où | Quand |
|---|---|---|---|---|
| Unitaire | Logique métier isolée (prix, panier, codes promo, validation) | Vitest | À côté du code | Chaque push |
| Intégration | API et base de données réelles (jetables) | Vitest et Supertest, PostgreSQL de test | apps/api | Chaque push |
| Composants | Rendu et accessibilité des composants | Testing Library, axe | apps/web | Chaque push |
| End-to-end | Parcours P1 à P4 dans un vrai navigateur | Playwright | e2e/ | Après déploiement sur staging |
| Accessibilité | Violations automatisables | axe-core dans Playwright, Lighthouse CI | e2e/ | Staging |
| Performance | Budgets Lighthouse sur la landing page et une fiche produit | Lighthouse CI | CI | Staging |
| Sécurité | Dépendances, secrets, analyse statique | Audit npm, CodeQL, analyse de secrets | CI | Chaque pull request et planifié |
| Recette utilisateur | Validation finale des scénarios par l'auteur | Manuel, scénarios ci-dessous | docs/RECETTE.md | Phase 5 |

## 2. Objectifs de couverture (à valider)

- 80 % de lignes ou plus sur la logique métier (API et bibliothèques partagées), seuil bloquant en CI.
- Couverture globale suivie et affichée, sans objectif artificiel sur le code d'interface.
- Parcours critiques P1 à P3 couverts en e2e.

## 3. Non-régression

La suite complète est rejouée à chaque push et pull request. Aucune fusion dans main si la CI est rouge. Les rapports (résultats, couverture) sont conservés comme artefacts de CI : ce sont les preuves à montrer au jury.

## 4. Scénarios de recette (graines, à détailler en phase 5)

| ID | Scénario | Exigences | Type |
|---|---|---|---|
| S-01 | Un visiteur s'inscrit à la newsletter, reçoit l'email de confirmation, confirme et reçoit le code promo | F-04, F-05 | e2e et recette |
| S-02 | Un visiteur filtre une gamme, ouvre une fiche produit, ajoute une taille au panier | F-10, F-11, F-12 | e2e |
| S-03 | Un visiteur crée un compte puis paie avec une carte de test Stripe et obtient la confirmation | F-13, F-14, F-20 | e2e |
| S-04 | Un client applique un code promo valide, puis un code invalide ou déjà utilisé | F-15 | intégration |
| S-05 | Un client retrouve sa commande dans l'historique | F-24 | e2e |
| S-06 | Un client exporte ses données puis supprime son compte | F-25 | intégration et e2e |
| S-07 | Navigation clavier complète de l'accueil à la confirmation de commande | NF-02 | recette |
| S-08 | Un visiteur refuse le suivi : aucun événement d'analytics n'est émis | F-40, NF-04 | e2e |

## 5. Matrice de traçabilité

À maintenir par l'agent : une ligne par exigence, avec le ou les tests qui la couvrent.

| Exigence | Test | Type | Fichier | Statut |
|---|---|---|---|---|
| (à remplir) | | | | |

## 6. Rapports (à renseigner)

- Dernière exécution de la CI : lien et date.
- Couverture : pourcentage par module.
- Résultats axe et Lighthouse : scores et date.
- Métriques de qualité de code : outil retenu (DEC-011) et valeurs.
