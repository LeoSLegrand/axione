# Livrables et preuves

Traduction des attendus du jury en fichiers et preuves du dépôt. Cocher au fil de l'avancement. Les sections du dossier Word (Stack Tech, CI/CD, Tests, Hosting, etc.) sont rédigées par l'auteur à partir de DECISION.md (local) et de ces documents.

Rendu : lundi 1er mars 2027, dossier et accès au code source. Dépôt GitHub privé au départ, public pour le jury.

## 1. Conception du prototype

| Attendu | Preuve dans le dépôt | Statut |
|---|---|---|
| Spécifications techniques couvrant l'expression des besoins | docs/SPECS.md (exigences F-xx et NF-xx, parcours, modèle de données) | [ ] |
| Architecture technique évolutive et scalable | docs/ARCHITECTURE.md (à créer en phase 0 : schéma, composants, flux, stratégie de montée en charge) | [ ] |
| Synthèse des choix techniques justifiés | DECISION.md (local, repris dans le Word) | [ ] |
| Schéma de l'infrastructure de déploiement | docs/DEPLOIEMENT.md (schéma Mermaid, à valider après DEC-012 et DEC-013) | [ ] |
| Choix justifié de la plateforme de test et d'intégration et déploiement continus | DEC-003 et DEC-014, pipeline dans .github/workflows | [ ] |

## 2. Test et recettage

| Attendu | Preuve dans le dépôt | Statut |
|---|---|---|
| Scénarios de test (unitaires, intégration, utilisateurs) fondés sur l'expression des besoins | docs/TESTS.md (matrice de traçabilité F-xx vers tests) | [ ] |
| Rapport d'exécution : couverture et non-régression | Rapport de couverture et résultats générés par la CI (artefacts), badge dans README | [ ] |
| Synthèse du recettage final | docs/RECETTE.md (à produire en phase 5, rejouant les parcours P1 à P4) | [ ] |
| Documentation utilisateur | docs/GUIDE-UTILISATEUR.md (parcours client, compte, commande, newsletter, droits RGPD) | [ ] |

## 3. Développement et déploiement

| Attendu | Preuve dans le dépôt | Statut |
|---|---|---|
| Environnement de déploiement pour les tests et le CI/CD | docs/DEPLOIEMENT.md, .github/workflows, scripts de déploiement | [ ] |
| Document décrivant la mise en application du RGPD | docs/RGPD.md (registre, droits, sous-traitants, durées, consentement) | [ ] |
| Lien vers l'intégralité du code source | Dépôt GitHub public à partir du gel du code | [ ] |
| Implémentation de l'accessibilité | docs/ACCESSIBILITE.md (mesures prises, résultats axe et Lighthouse, limites connues) | [ ] |

## 4. Soutenance individuelle

À défendre : une approche globale de la chaîne de production logicielle (conception, test, développement, déploiement), la pertinence des choix face au besoin, la qualité du prototype (couverture du besoin, couverture des tests, métriques de qualité de code).

À présenter :
1. Spécifications, architecture et infrastructure, avec une vision synthétique et justifiée.
2. Démonstration en direct du déploiement continu : push, rejeu systématique des tests (non-régression), réévaluation de la qualité du code (métriques), déploiement.
3. Retour d'expérience et analyse des problèmes rencontrés (section "Problèmes rencontrés" de DECISION.md, à tenir à jour pendant tout le projet).

### Scénario de démonstration à préparer (phase 5)
- Modifier un élément visible mais sans risque (texte ou couleur), sur une branche.
- Montrer la pull request : lint, typecheck, tests, couverture, analyse qualité.
- Fusionner dans main : déploiement automatique sur l'environnement de test, tests e2e, accessibilité.
- Promouvoir en production (validation manuelle) et montrer le changement en ligne.
- Plan B : captures et vidéo d'un déroulé réussi, au cas où le réseau ou la CI échoue le jour J.

## 5. Dossier Word : correspondance des sections

| Section du dossier | Sources |
|---|---|
| Stack technique et architecture | DECISION.md (DEC-001, 002, 006 à 009, 015 à 019), docs/ARCHITECTURE.md |
| CI/CD | DECISION.md (DEC-003, 005, 011, 012, 014), docs/DEPLOIEMENT.md |
| Tests | docs/TESTS.md, rapports de la CI, DECISION.md (DEC-010) |
| Hosting et coûts | docs/DEPLOIEMENT.md, DECISION.md (DEC-004, 013, 022, 023) |
| RGPD | docs/RGPD.md |
| Accessibilité | docs/ACCESSIBILITE.md, DECISION.md (DEC-021) |
| Retour d'expérience | DECISION.md, section "Problèmes rencontrés" |
