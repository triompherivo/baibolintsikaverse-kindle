# Définition — importateur de dictionnaires WASI

Programme séparé GPL-3.0-or-later, exécuté dans un Worker WASI sans accès au réseau,
au système de fichiers réel ou aux API de l’extension. Son protocole est JSON sur
stdin/stdout ; les fichiers sélectionnés sont montés en mémoire par le Worker.
Aucun corpus ni dictionnaire tiers n’est inclus.

## Origine et adaptations

Parseurs obtenus depuis le dépôt officiel https://github.com/wuweidict/wudict,
commit `f2c2fdd8e1b0b1fc5b57d53a5202a84b20851ec4` (5 novembre 2026).
Seuls les parseurs et leurs dépendances utiles ont été conservés. Les couches
SQLite, interfaces, audio natif et tests de l’application amont ne font pas
partie de cet outil. `main.go` et `internal/format/bgl/embedded.go` fournissent
l’adaptateur BaibolintsikaVerse ; l’extraction des ressources BGL dérive du
parseur amont. `dsl/abbrev.go` remplace le helper SQLite par une fonction locale.
Les sources des dépendances Go exactes sont dans `vendor/`, avec leurs licences.
Les notices intégrales amont sont conservées dans THIRD-PARTY-NOTICES.md ; elles
mentionnent aussi des composants de l’application amont absents de ce sous-ensemble.

## Reconstruction

Go 1.27.3 a été utilisé (SDK officiel Apple Silicon, SHA-256 de l’archive :
`dd3908cf20959d798c1e06ebe5b72213f0505ce01373b40ce3110975a6cd99c2`).
Le SDK et ses bibliothèques standard ne sont pas embarqués dans l’application.
Depuis ce répertoire :

```sh
GO=/chemin/vers/go sh build.sh /chemin/Extension/vendor/dictionaries
```

Le script compile les sources locales vendoriées pour `wasip1/wasm`, sans
résolution réseau des modules, et joint `CORRESPONDING_SOURCE.tar.gz` contenant
ce répertoire complet, ses scripts, dépendances et licences. La reconstruction
est indépendante des chemins de cette machine et conserve les versions go.sum.

Formats : StarDict/dictzip, DSL, MDX/MDD, BGL, SLOB, ZIM, Yomitan JSON ; archives
ZIP/7z non chiffrées. Certains fichiers chiffrés/protégés ou variantes inconnues
peuvent être refusés explicitement. Limites du Worker : 256 Mio de données et
10 000 fichiers ; conversion locale actuelle : 100 000 entrées, JSON normalisé
20 Mio. Aucun fichier original n’est modifié. Les corpus doivent être fournis
par l’utilisateur avec leurs droits d’utilisation.

Validation réelle du binaire WASI dans WebKit : fixtures créées pour cette
intervention (hébreu niqqud, synonymes, HTML, PNG exacts, MDX/MDD, BGL gzip,
SLOB zlib, ZIM brut/zlib/zstd et offsets 64 bits), archives et erreurs tronquées.
Tests d’intégration conservés dans le projet Safari personnel, `tests/definition-dictionary*.cjs`.
