# DBL — Récapitulatif des modifications

Site de la Dynamique Bapa de Libreville.
Aucun changement de design global : couleurs, typographies (Syne / DM Sans),
espacements et structure d'origine conservés. Uniquement des ajouts et
des corrections dans le style existant.

---

## Fichiers ajoutés

| Fichier | Rôle |
|---|---|
| `chants.html` | Nouvelle page « Chants » |
| `chants.js` | Données des chants + lecteur audio réutilisable |
| `audio/LISEZ-MOI.txt` | Où déposer les MP3 et sous quels noms |
| `images/fondateurs/LISEZ-MOI.txt` | Où déposer les portraits et sous quels noms |

## Fichiers modifiés

`index.html`, `a-propos.html`, `actualites.html`, `organisation.html`,
`statuts.html`, `style.css`, `nav-common.js`

---

## 1) Accueil

- **Drapeaux Cameroun + Gabon placés au-dessus** du texte
  « Communauté Camerounaise · Libreville, Gabon ». Les drapeaux existaient
  déjà mais étaient sur la même ligne que le texte. `.eyebrow-hero` passe en
  colonne, drapeaux légèrement agrandis (19 px) avec un séparateur discret.
  Une balise `</br>` invalide a été supprimée au passage.
- **Bouton « Écouter l'hymne BAPA »** ajouté dans le groupe de boutons du
  hero, style identique à « Découvrir l'association ». Il lance l'hymne et
  fait défiler vers la section chants.
- **Nouvelle section « Consulter les chants »** (`id="chants"`) : bandeau
  `--bg2` comme la section solidarité, hymne mis en avant + 3 chants du
  répertoire + lien vers la page complète.
- **Carte « Chants »** ajoutée dans la grille des rubriques et dans la
  navigation du pied de page.
- **« Un filet de sécurité pour chaque membre » : tous les montants retirés.**
  Les 6 tuiles chiffrées sont remplacées par des tuiles solidarité (même
  surface, bordure, rayon et effet de survol) : icône + intitulé + une ligne.
  Deuil d'un adhérent · Deuil d'un parent · Maladie & hospitalisation ·
  Mariage · Naissance · Engagement mutuel.
  Le lien devient « Découvrir nos engagements de solidarité ».
- Correction de la coquille « solidarity » → « solidarité ».

> La section « Tontines & caisse mutuelle », juste en dessous, conserve ses
> montants : la demande portait uniquement sur le bloc « filet de sécurité ».

## 2) À Propos

- Les 26 membres fondateurs passent d'une simple liste à une **grille de
  cartes avec photo**, format uniforme (ratio 3:4), survol identique aux
  cartes du Bureau, responsive (2 colonnes sur mobile → 6 sur grand écran).
- **Si une photo manque**, les initiales du membre s'affichent dans le même
  cadre aux couleurs du site : la grille reste uniforme dès maintenant.
  Déposer `01.jpg` … `26.jpg` dans `images/fondateurs/` (voir le LISEZ-MOI).

## 3) Actualités

- Catégories renommées et réaffectées : **Nouvelles des membres · Tontines ·
  Divers · Événements**. Les 9 articles existants ont été redistribués
  (3 / 2 / 2 / 2).
- Le filtrage lisait auparavant l'attribut `onclick` sous forme de chaîne de
  caractères ; il s'appuie maintenant sur des attributs `data-filtre`.
- Le style des filtres a été déplacé dans `style.css` (composant partagé avec
  la page Chants) — apparence inchangée.

## 4) Chants

Nouvelle page dans la continuité du design :

- **Hymne mis en avant** dans une carte à en-tête vert, reprenant le style
  de l'en-tête du modal « Info de la semaine ».
- **Filtres** identiques à ceux des actualités : Tous · Traditionnels · Fête · Deuil.
- **Cartes de chants** reprenant `.actu-card` / `.overview-card` (surface,
  bordure, rayon 16 px, survol translaté), avec :
  - lecteur audio par chant : lecture/pause, barre de progression cliquable,
    déplacement au clavier (flèches), temps courant et durée ;
  - **un seul chant joue à la fois** ;
  - paroles repliables ;
  - si le fichier audio est absent : mention **« Audio à venir »**, bouton
    désactivé, aucune erreur visible.
- Un aperçu de cette section est repris sur l'accueil.

### À compléter par l'association

- Les **fichiers audio** : à déposer dans `/audio` (voir le LISEZ-MOI).
- Les **titres et paroles** sont des propositions à faire valider par le
  Chargé Culturel & Protocole. Tout se modifie dans `chants.js` : chaque
  chant y est décrit par un bloc (titre, catégorie, description, paroles,
  fichier audio).

## 5) Responsivité — corrections

- **Menu mobile désaligné** : il était en `position: absolute` sur toute la
  largeur alors que la navbar fait 94 % centrée. Il épouse maintenant la
  navbar, devient scrollable si l'écran est court, se ferme au clic sur un
  lien, au clic extérieur, avec Échap et au retour en affichage desktop.
  Le burger se transforme en croix.
- **Navbar à 7 onglets** : les liens se compactent sous 1200 px et basculent
  en menu burger sous 1100 px (au lieu de 768 px) pour éviter tout
  débordement. Navbar compactée sous 380 px (écrans 320 px).
- **Grilles `1fr 1fr` écrites en style inline** qui ne s'effondraient pas sur
  mobile (les styles inline l'emportent sur les media queries) : passées en
  classes (`.apropos-intro`, `.mini-stats`, `.objectifs-grid`, `.grid-2`,
  `.aide-tiles`, `.tontine-row`, `.overview-grid`, `.org-card`).
- **Tableaux des statuts** : encadrés dans un conteneur à défilement
  horizontal contrôlé au lieu de déborder.
- **Padding** réduit sur mobile pour le viewer des statuts et les fiches
  d'organes ; **modal Bureau** qui empile la photo sous 620 px.
- Ajout d'un `overflow-wrap: break-word` de confort et d'un filet de sécurité
  si le CDN AOS est injoignable (le site ne s'interrompt plus sur une erreur JS).

### Tests effectués

154 combinaisons vérifiées automatiquement (11 largeurs de 320 à 1920 px
× thèmes clair et sombre × 7 pages) : **aucun débordement horizontal,
aucune erreur JavaScript**. Filtres, lecteur audio, seek, exclusivité de
lecture, paroles, menu mobile et liens internes testés.

> Note : le déplacement dans la piste audio nécessite un serveur qui gère les
> requêtes HTTP Range — c'est le cas de Netlify. Testé et validé.
