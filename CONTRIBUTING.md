# Messages de commit

## Types

- `feat` Ajoute, ajuste ou retire une fonctionnalité du backend ou du frontend
- `fix` Corrige un bug backend ou frontend, quelle que soit son ancienneté
- `perf` Améliore la réactivité ou la rapidité (ex : ajout de lazy loading)
- `refactor` Réécrit ou restructure le code sans modifier le comportement du backend ou du frontend
- `style` Concerne le style du code (espaces, formatage, points-virgules manquants) sans effet sur le comportement de l'application
- `test` Ajoute des tests manquants ou corrige des tests existants
- `docs` Concerne uniquement la documentation
- `build` Concerne les outils de build, les dépendances, la version du projet, ...
- `ops` Concerne l'infrastructure (IaC), les scripts de déploiement, les pipelines CI/CD, les sauvegardes, le monitoring, les procédures de reprise, ...
- `chore` Représente les tâches diverses comme le commit initial, la modification du `.gitignore`, ...

## Description

La description est à l'impératif présent, commence par une minuscule et ne se termine pas par un point.

## Exemples

- ```
  feat: add email notifications on new direct messages
  ```
- ```
  feat(shopping cart): add the amazing button
  ```
- ```
  feat!: remove ticket list endpoint

  refers to JIRA-1337

  BREAKING CHANGE: ticket endpoints no longer supports list all entities.
  ```

- ```
  fix(shopping cart): prevent order an empty shopping cart
  ```
- ```
  fix(api): fix wrong calculation of request body checksum
  ```
- ```
  fix: add missing parameter to service call

  The error occurred due to <reasons>.
  ```

- ```
  perf: decrease memory footprint for determine unique visitors by using HyperLogLog
  ```
- ```
  perf(product list): lazy load product images
  ```
- ```
  refactor: implement fibonacci number calculation as recursion
  ```
- ```
  style: remove empty line
  ```
- ```
  test: add missing tests for email validation
  ```
- ```
  docs: add setup instructions to readme
  ```
- ```
  build: update dependencies
  ```
- ```
  build(release): bump version to 1.0.0
  ```
- ```
  ops: add ci workflow
  ```
- ```
  chore: init
  ```
- ```
  chore: update gitignore
  ```

# Branches

Une branche par tâche majeure, nommée `phaseN/slug` (minuscules, tirets), créée depuis `main` et fusionnée dans `main` par pull request une fois la CI verte.

Exemples : `phase0/setup`, `phase1/landing-page`, `phase2/shop`, `phase3/accounts`.

Pour une correction isolée hors phase : `fix/slug`. Pour la documentation seule : `docs/slug`.
