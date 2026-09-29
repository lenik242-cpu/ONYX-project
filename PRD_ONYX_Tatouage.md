# PRD — Site fictif : ONYX, studio de tatouage réaliste noir & gris

> **Product Requirements Document.** Cahier des charges complet du site : (1) pour te guider dans la génération des visuels, (2) pour donner à Claude Code tout le contexte nécessaire. Règle : plus c'est précis ici, plus le site est signé et fidèle à la vision.

---

## 1. Vision & intention

**Le client fictif :** **ONYX**, un studio de tatouage spécialisé dans le **réalisme noir & gris** (portraits, animaux, détails hyper-réalistes, clair-obscur). Un artiste (ou petit collectif) qui traite le tatouage comme un art de galerie, pas comme une boutique.

**Pour qui :** une clientèle qui cherche une pièce d'exception, réfléchie, réalisée par un vrai artiste — pas un tatouage vite fait. Des gens qui veulent confier leur peau à quelqu'un de très fort.

**Émotion à dégager :** intense, cinématographique, précis. Le site doit inspirer le respect et le désir — « je veux me faire tatouer par cette personne ». Le portfolio est la star absolue.

**Ambition :** niveau Awwwards. Sombre, dramatique, chaque tatouage mis en scène comme une œuvre. 3-4 moments « ouah », le reste sobre et laissant respirer les images.

---

## 2. Direction artistique (VERROUILLÉE)

**Mood en 3 mots :** intense · cinématographique · précis.

**Palette :**
| Rôle | Couleur | Hex | Usage |
|------|---------|-----|-------|
| Fond dominant | Noir profond (froid) | `#0A0A0B` | Fond principal, ~80% du site |
| Texte | Blanc / gris clair | `#EDEDED` | Texte principal |
| Gris moyens | Gamme de gris | `#3A3A3C`, `#6E6E70`, `#9A9A9C` | Textes secondaires, dégradés, rappel du réalisme N&B |
| Accent | Rouge sang | `#8B2E2E` | UNIQUEMENT en touche rare : un mot signature, une ligne, un point, un sceau. Jamais envahissant. |

**Principe couleur :** le noir et les gris dominent totalement (comme l'encre elle-même — c'est un studio N&B, le site EST en noir et gris). Le rouge sang n'apparaît que 2-3 fois sur tout le site, comme une signature, une goutte, un sceau — c'est ce qui crée l'intensité par la rareté. Aucune autre couleur.

**Typographie :**
- **Titres :** `Bespoke Serif` (Fontshare, gratuit) — serif éditoriale à fort contraste, façon magazine d'art / galerie. C'est la signature visuelle.
- **Corps :** `Inter` ou `General Sans` (neutre, lisible).
- **Règle :** Bespoke Serif pour les grands titres seulement. Corps toujours en sans-serif.
- Lien : https://www.fontshare.com (chercher Bespoke Serif, et General Sans)

**Principe directeur :** les tatouages sont les stars. Beaucoup de noir, les images (portraits réalistes) mises en scène comme dans une galerie, un éclairage dramatique (clair-obscur). Textes grands mais au service des images. Grain de film léger possible pour l'ambiance argentique.

---

## 3. Stack technique

- **React 18 + Vite + TypeScript**, **Tailwind CSS**.
- **GSAP + ScrollTrigger** (animations, pinning) + **Lenis** (smooth scroll).
- **framer-motion / motion** si un composant en a besoin.
- Curseur personnalisé sur mesure (idéalement discret, façon viseur/point).
- Préchargeur (preloader) sur mesure.
- Single page, code componentisé, responsive complet (effets avancés dégradent proprement en vertical sur mobile).
- Polices via Fontshare (Bespoke Serif, General Sans) + Google Fonts (Inter repli).

---

## 4. Composants (À COMPLÉTER PAR NIKITA)

> **Nikita : c'est ici que tu colles les composants reactbits.dev que tu vas choisir.** Pour chacun, dis-moi où tu le vois. En me basant sur l'univers, voici les TYPES d'effets qui marcheraient — à toi de trouver les composants correspondants ou de valider mes suggestions :

**Effets recommandés pour cet univers (à sourcer sur reactbits) :**
- **Préloader** (sur mesure) : nom ONYX qui se révèle sur fond noir, fine barre ou compteur.
- **Un effet hero fort** : soit une image/vidéo qui s'ouvre (type ScrollExpand comme l'archi), soit un titre masqué avec une image de tatouage qui transparaît (type MaskedHeading). À décider.
- **Galerie de portfolio** : LE cœur du site. Une galerie de tatouages en noir & gris. Possibilités : accordéon (AccordionGallery), grille avec révélations au scroll, ou galerie horizontale qui défile. À choisir.
- **Révélation de texte au scroll** (type ScrollReveal) : pour une phrase manifeste sur l'art du réalisme.
- **Effet de zoom/détail** : le réalisme, c'est le détail — un effet qui permet de zoomer sur la finesse d'un tatouage serait pertinent (hover zoom, ou image comparison).
- **Curseur custom** : un viseur/réticule discret qui va bien avec la précision du réalisme.

**Note DA (à respecter par Claude Code) :** hiérarchiser les effets, ne pas les empiler. Un moment fort par section, des respirations entre. Le noir domine, le rouge est rarissime.

---

## 5. Structure du site (sections dans l'ordre)

**0. Préloader** — fond noir `#0A0A0B`, « ONYX » en Bespoke Serif qui se révèle, fine barre de chargement (blanche ou rouge sang). Révélation du hero à 100%.

**1. Hero** — plein écran sombre. Une image/vidéo de tatouage réaliste en très gros plan (ou l'artiste au travail, clair-obscur), un grand titre en Bespoke Serif (ex. « L'encre comme mémoire »), le nom ONYX, méta-infos dans les coins. Ambiance dramatique.

**2. Intro / positionnement** — une ou deux lignes fortes qui posent le studio (ex. « Le réalisme noir & gris, poussé au détail près »). Sobre.

**3. Manifeste (révélation de texte)** — la phrase forte sur l'art du studio, qui s'éclaire au scroll. Ex. « Chaque pièce est unique, dessinée pour une peau, une histoire, une seule fois. »

**4. L'artiste / le studio** — présentation de l'artiste (ou du collectif) : son approche, sa spécialité (portraits, animaux, clair-obscur), son exigence. Une belle photo N&B. Section de confiance.

**5. Portfolio (LE CŒUR)** — la galerie des réalisations. Tatouages réalistes N&B mis en scène comme des œuvres. Grand, immersif, avec les titres/zones du corps. C'est la section la plus importante — elle doit être irréprochable.

**6. Le process / l'expérience** — comment ça se passe : consultation, dessin sur-mesure, séance(s), suivi. Rassure le client sur un acte engageant (un tatouage réaliste, c'est plusieurs heures, c'est réfléchi).

**7. Chiffres / preuves (optionnel)** — années d'expérience, pièces réalisées, heures de tattoo… si pertinent, avec un compteur animé.

**8. Contact / prise de RDV** — grand CTA (« Prendre rendez-vous » / « Réserver une consultation »). Le tatouage réaliste se réserve, se discute. Formulaire ou lien de réservation, coordonnées du studio.

**9. Footer** — nom, réseaux (Instagram surtout, essentiel pour un tatoueur), mentions, discret.

---

## 6. Les visuels à générer (À TOI DE JOUER — tes outils / Google Flow)

> Liste des assets avec un prompt prêt à coller, calibré sur la DA sombre N&B. Dépose-les dans `/public/assets/`, Claude Code les référencera. Placeholders en attendant.

### Vidéo hero (optionnelle) — `hero.mp4`
**Prompt :** *Cinematic slow close-up of a tattoo artist working, black and grey realism tattoo on skin, dramatic low-key lighting, chiaroscuro, film grain, moody dark atmosphere, macro detail of the needle and shading. Black, grey, deep shadows. 8-10s seamless loop, no text.*

### Images de portfolio (6-8 tatouages) — `tattoo-1.jpg` … `tattoo-8.jpg`
**Prompt de base :** *Hyper-realistic black and grey tattoo, [SUJET], fine detail, chiaroscuro shading, dramatic lighting on skin, dark background, editorial photography, film grain, no color.*
Variantes pour [SUJET] :
1. *a realistic portrait of a woman's face*
2. *a realistic lion / big cat*
3. *a realistic eye with intricate detail*
4. *a realistic rose with deep shadows*
5. *a realistic hand / anatomical study*
6. *a realistic clock / skull memento mori*
7. *a realistic wolf*
8. *a realistic religious/statue figure*
Format : portrait ou carré, haute résolution, VRAIMENT noir & gris (pas de couleur).

### Photo de l'artiste / studio — `artist.jpg`
**Prompt :** *Black and white cinematic portrait of a tattoo artist in a dark studio, moody dramatic lighting, focused, professional, film grain, chiaroscuro.*

### Image ambiance / détail — `detail.jpg`
**Prompt :** *Extreme macro of black and grey realism tattoo shading detail on skin, dramatic light, dark, film grain.*

**Conseil :** cohérence totale — TOUT en noir & gris, éclairage dramatique, grain de film. C'est cette cohérence qui fait le site premium. Le seul point de couleur du site sera le rouge sang de l'accent (dans le code, pas dans les images).

---

## 7. Contenu réel (textes en français)

- **Nom :** ONYX
- **Baseline :** Studio de tatouage — réalisme noir & gris.
- **Hero titre :** « L'encre comme mémoire. » (ou « Graver la lumière et l'ombre. »)
- **Intro :** « Le réalisme noir & gris, poussé au détail près. »
- **Manifeste :** « Chaque pièce est unique — dessinée pour une peau, une histoire, une seule fois. »
- **Spécialités :** Portraits · Animaux · Clair-obscur · Pièces sur-mesure.
- **Process :** Consultation / Dessin sur-mesure / Séance(s) / Suivi & cicatrisation.
- **CTA :** « Réserver une consultation. »
- **Réseaux :** Instagram (essentiel).

---

## 8. Contraintes & priorités

1. **Le portfolio est roi** — les tatouages doivent être mis en valeur de façon irréprochable.
2. **Fluidité du scroll** — Lenis + GSAP, zéro saccade.
3. **Sobriété dramatique** — noir dominant, rouge rarissime, effets hiérarchisés.
4. **Grain de film / ambiance argentique** léger pour l'atmosphère.
5. **Responsive** — effets avancés dégradent proprement sur mobile.
6. **Instagram bien visible** — le nerf de la guerre d'un tatoueur.
7. **Code propre et itérable.**

---

*Fin du PRD. Nikita : colle tes composants reactbits, je les assigne aux sections et je monte le prompt Claude Code final.*
