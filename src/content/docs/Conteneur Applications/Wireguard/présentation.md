---
title: "Présentation"
description: "Présentation de WireGuard"
---

## Qu'est-ce que WireGuard ?

WireGuard est un protocole VPN moderne, réputé pour sa simplicité, ses performances et la robustesse de son chiffrement. Contrairement à des solutions plus anciennes comme OpenVPN, il repose sur une base de code réduite, ce qui facilite son audit et limite sa surface d'attaque.

## Rôle dans mon homelab

WireGuard me permet d'accéder à distance à mon homelab de façon sécurisée, comme si j'étais physiquement connecté à mon réseau local, sans avoir à exposer directement mes services sur Internet. C'est la porte d'entrée que j'utilise pour administrer mon infrastructure ou accéder à certaines applications lorsque je ne suis pas chez moi.

## Fonctionnalités clés

- Chiffrement moderne et performant (Curve25519, ChaCha20, Poly1305)
- Configuration simple basée sur des paires de clés publiques/privées
- Faible latence et bonnes performances, y compris sur des machines modestes
- Compatible avec la plupart des systèmes d'exploitation et des routeurs
- Réduction de la surface d'exposition des services internes sur Internet