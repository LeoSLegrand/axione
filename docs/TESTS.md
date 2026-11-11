# Stratégie de tests

Document tenu à jour au fil du développement. Outils retenus : Vitest 5, Playwright et axe (DEC-010), SonarQube Cloud pour les métriques (DEC-011). Le jury attend : scénarios fondés sur l'expression des besoins, rapport de couverture, preuve de non-régression, synthèse de recette.

## 1. Niveaux de test

| Niveau | But | Outils | Où | Quand |
|---|---|---|---|---|
| Unitaire | Logique métier isolée (prix, panier, codes promo, validation) | Vitest, fichiers `*.test.ts` | À côté du code, surtout packages/core | Chaque push |
| Intégration | Cas d'usage de packages/core et Route Handlers sur base réelle jetable | Vitest, fichiers `*.int.test.ts`, PostgreSQL 18 de test (base `axione_test`, migrations rejouées avant chaque exécution) | packages/core, apps/web | Chaque push |
| Composants | Rendu et accessibilité des composants | Testing Library, axe | apps/web | Chaque push |
| End-to-end | Parcours P1 à P4 dans un vrai navigateur | Playwright | e2e/ | Chaque push sur main, contre la pile Docker éphémère (staging en CI, DEC-014) |
| Accessibilité | Violations automatisables | axe-core dans Playwright, Lighthouse CI | e2e/ | Staging |
| Performance | Budgets Lighthouse sur la landing page et une fiche produit | Lighthouse CI | CI | Staging |
| Sécurité | Dépendances, secrets, analyse statique | Audit npm, CodeQL, analyse de secrets | CI | Chaque pull request et planifié |
| Recette utilisateur | Validation finale des scénarios par l'auteur | Manuel, scénarios ci-dessous | docs/RECETTE.md | Phase 5 |

## 2. Objectifs de couverture (à valider)

- 80 % ou plus (lignes, branches, fonctions, instructions) sur la logique métier (packages/core), seuil bloquant configuré dans vitest.config.ts.
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
| F-01 | La page d'accueil affiche la marque et les gammes | e2e | e2e/tests/smoke.spec.ts | Passe (squelette, à enrichir en phase 1) |
| F-10 | Les gammes sont listées dans l'ordre d'affichage, catalogue vide, slug unique | Intégration | packages/core/src/catalog/collections.int.test.ts | Passe (socle) |
| NF-02 | Aucune violation axe critique ou sérieuse sur l'accueil (WCAG 2.2 AA) | e2e | e2e/tests/smoke.spec.ts | Passe |
| NF-06 | Couverture de packages/core au moins 80 % | Seuil Vitest | vitest.config.ts | 100 % au 2026-11-11 |
| NF-07 | Agrégation de l'état de santé, sonde en échec, délai dépassé, exécution parallèle, aucune fuite d'erreur | Unitaire | packages/core/src/health.test.ts | Passe |
| NF-07 | Sonde base de données joignable et injoignable | Intégration | packages/core/src/database-probe.int.test.ts | Passe |
| NF-07 | `GET /api/health` répond 200, JSON, sans cache | Intégration | apps/web/src/app/api/health/route.int.test.ts | Passe |
| NF-07 | `/api/health` répond 200 dans le navigateur | e2e | e2e/tests/smoke.spec.ts | Passe |

Convention : chaque titre de test commence par l'identifiant de l'exigence couverte (par exemple `[NF-07]`), ce qui permet de retrouver la matrice à partir des rapports de la CI.

## 6. Rapports (à renseigner)

- Exécutions de la CI (workflow ci.yml, cible NF-10 : moins de 8 minutes) :

| Date | Branche | Durée | Résultat |
|---|---|---|---|
| 2026-11-11 | phase0/ci-check (PR #3) | 3 min 32 s | Vert, 13 tests, couverture de packages/core à 100 % |

- Couverture : pourcentage par module.
- Résultats axe et Lighthouse : scores et date.
- Métriques de qualité de code : outil retenu (DEC-011) et valeurs.
