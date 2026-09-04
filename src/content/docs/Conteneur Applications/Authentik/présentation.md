---
title: "Présentation"
description: "Présentation d'Authentik"
---

## Qu'est-ce qu'Authentik ?

Authentik est un fournisseur d'identité (Identity Provider) open source. Il permet de centraliser l'authentification et de mettre en place du Single Sign-On (SSO) grâce aux protocoles standards du marché : OAuth2, OpenID Connect, SAML et LDAP.

## Rôle dans mon homelab

Authentik constitue le point d'entrée d'authentification pour l'ensemble des applications de mon homelab qui le supportent. Au lieu de gérer un compte et un mot de passe différents pour chaque service, je me connecte une seule fois via Authentik, qui peut aussi imposer une double authentification (MFA) pour renforcer la sécurité globale de l'infrastructure.

## Fonctionnalités clés

- Authentification unique (SSO) via OAuth2, OIDC, SAML et LDAP
- Prise en charge de l'authentification multifacteur (MFA)
- Gestion centralisée des utilisateurs, groupes et politiques d'accès
- Interface d'administration complète pour créer des flux d'authentification personnalisés
- Intégration avec un grand nombre d'applications self-hosted