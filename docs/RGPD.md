# RGPD

Squelette à compléter au fil des phases. Les durées de conservation et bases légales sont des propositions à valider par l'auteur. Le projet est un prototype fictif : aucune vraie donnée personnelle ne doit y figurer, mais l'application est conçue comme si elle traitait des données réelles.

## 1. Principes appliqués dès la conception

- Minimisation : on ne collecte que ce qui sert une finalité précise.
- Consentement explicite et séparé pour la newsletter (double opt-in) et pour tout suivi qui l'exige.
- Données hébergées dans l'Union européenne (DEC-004). Les sous-traitants hors UE sont listés avec leur cadre de transfert.
- Sécurité : mots de passe hachés, transport chiffré, accès restreint, sauvegardes chiffrées.
- Droits des personnes réalisables dans le produit (accès, rectification, effacement, portabilité, opposition).

## 2. Registre des traitements (proposition)

| Traitement | Finalité | Données | Base légale | Durée proposée | Destinataires |
|---|---|---|---|---|---|
| Compte client | Gérer l'accès et l'historique | Email, mot de passe haché, nom, adresses | Exécution du contrat | Durée du compte, suppression à la demande, inactivité de 3 ans | Hébergeur |
| Commandes et facturation | Livrer, facturer, respecter les obligations comptables | Commande, adresse, montant | Exécution du contrat et obligation légale | 10 ans pour les pièces comptables (à valider) | Hébergeur, Stripe |
| Paiement | Encaisser | Données de carte traitées par Stripe, jamais stockées par Axione | Exécution du contrat | Selon Stripe | Stripe |
| Newsletter | Informer et promouvoir | Email, date et preuve du consentement | Consentement | Jusqu'au désabonnement, 3 ans après le dernier contact | Service d'email |
| Mesure d'audience et événements marketing | Statistiques de parcours et de conversion | Événements anonymisés ou pseudonymisés | Exemption ou consentement selon l'outil et sa configuration (DEC-020) | 13 mois au plus pour les données de mesure | Outil d'analytics |
| Contact | Répondre aux demandes | Nom, email, message | Intérêt légitime | 1 an après la réponse (à valider) | Service d'email |
| Journaux techniques | Sécurité et diagnostic | Adresse IP, requêtes | Intérêt légitime | 3 mois (à valider) | Hébergeur |

## 3. Sous-traitants et transferts

| Sous-traitant | Rôle | Localisation | Garanties | Statut |
|---|---|---|---|---|
| Hébergeur (DEC-013) | Serveurs, sauvegardes | UE | Contrat de traitement | À compléter |
| Stripe | Paiement | UE et États-Unis | Clauses contractuelles types, accord de traitement | À vérifier |
| Service d'email (DEC-017) | Newsletter et emails transactionnels | À préciser | Accord de traitement | À compléter |
| Outil d'analytics (DEC-020) | Mesure d'audience | À préciser | À préciser | À compléter |
| GitHub | Code et CI, sans donnée personnelle de production | États-Unis | Aucune donnée personnelle de production dans la CI | À documenter |

## 4. Cookies et traceurs

À renseigner après DEC-020 : liste des traceurs, finalité, durée, exemption ou consentement. Si seuls des traceurs strictement nécessaires et une mesure d'audience exemptée sont utilisés, aucune bannière de consentement n'est requise. Dans tous les cas, la politique cookies décrit ce qui est déposé.

## 5. Droits des personnes dans le produit

| Droit | Implémentation | Exigence |
|---|---|---|
| Accès et portabilité | Export des données du compte | F-25 |
| Rectification | Page de profil | F-23 |
| Effacement | Suppression du compte et anonymisation des commandes conservées pour obligation légale | F-25 |
| Opposition et retrait du consentement | Lien de désabonnement dans chaque newsletter, gestion des préférences de suivi | F-04, F-40 |

## 6. Sécurité et violations

Mesures techniques : voir NF-03 dans docs/SPECS.md. Procédure en cas de violation : évaluer, consigner, notifier l'autorité (CNIL) dans les 72 heures si un risque existe, informer les personnes concernées si le risque est élevé. Référent données personnelles : l'auteur (pas de délégué à la protection des données requis pour ce prototype, à justifier).

## 7. Pages à rédiger

Mentions légales, politique de confidentialité, politique cookies, CGV, CGU (F-06). Contenus fictifs mais réalistes.
