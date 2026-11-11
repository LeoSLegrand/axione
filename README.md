# Axione Athletics

[![CI](https://github.com/LeoSLegrand/axione/actions/workflows/ci.yml/badge.svg)](https://github.com/LeoSLegrand/axione/actions/workflows/ci.yml)
[![Main](https://github.com/LeoSLegrand/axione/actions/workflows/main.yml/badge.svg)](https://github.com/LeoSLegrand/axione/actions/workflows/main.yml)

Site vitrine et boutique de vêtements de sport connectés (LED intégrées) pour la pratique nocturne : running, cyclisme, trail.

Prototype réalisé dans le cadre du MBA Développeur Full Stack (M2).

## Documentation

- [Contexte produit](docs/CONTEXTE.md)
- [Spécifications](docs/SPECS.md)
- [Livrables et preuves](docs/LIVRABLES.md)
- [Déploiement, CI/CD et coûts](docs/DEPLOIEMENT.md)
- [Stratégie de tests](docs/TESTS.md)
- [RGPD](docs/RGPD.md)
- [Conventions de contribution](CONTRIBUTING.md)

- [Architecture technique](docs/ARCHITECTURE.md)
- [Inventaire des assets](docs/ASSETS.md)

## Démarrage rapide

Prérequis : Node.js 24 LTS (voir `.nvmrc`), pnpm 11 (`npm install -g pnpm@11`), Docker.

```bash
pnpm install
cp .env.example .env
docker compose -f compose.dev.yaml up -d   # PostgreSQL 18 sur le port 54329
pnpm db:generate
pnpm db:migrate                            # applique les migrations (dont les 3 gammes)
pnpm dev                                   # http://localhost:3100
```

## Commandes utiles

| Commande | Rôle |
|---|---|
| `pnpm lint`, `pnpm format:check`, `pnpm typecheck` | Qualité statique |
| `pnpm check:boundaries` | Vérifie que packages/core reste indépendant du framework |
| `pnpm test` | Tests unitaires |
| `pnpm test:integration` | Tests d'intégration sur une base PostgreSQL de test (créée automatiquement) |
| `pnpm test:coverage` | Unitaires et intégration avec couverture (seuil de 80 % sur packages/core) |
| `pnpm build` puis `pnpm test:e2e` | Tests de bout en bout Playwright et audit axe |
| `docker compose -f compose.prod.yaml up -d` | Pile de production locale (voir docs/DEPLOIEMENT.md) |
