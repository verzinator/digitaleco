---
name: Digital Eco
description: Agenzia di marketing digitale italiana — raffinata, radicata, viva.
colors:
  primary: "#0A5C44"
  accent: "#2ECC71"
  bg: "#F8F9FA"
  surface: "#FFFFFF"
  surface-offset: "#F1F3F5"
  divider: "#E2E5E9"
  text: "#1A1A2E"
  text-muted: "#6C757D"
  text-faint: "#ADB5BD"
  text-inverse: "#F8F9FA"
typography:
  display:
    fontFamily: "'Libre Baskerville', Georgia, serif"
    fontSize: "clamp(3rem, 0.5rem + 7vw, 7rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Libre Baskerville', Georgia, serif"
    fontSize: "clamp(2.5rem, 1rem + 4vw, 5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Libre Baskerville', Georgia, serif"
    fontSize: "clamp(2rem, 1.2rem + 2.5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.22em"
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  pill: "999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
  20: "80px"
  24: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.sm}"
    padding: "13px 24px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "#084a37"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.sm}"
    padding: "13px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "13px 24px"
  button-cta-pill:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-cta-pill-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
---

# Design System: Digital Eco

## 1. Overview

**Creative North Star: "Lo Studio dell'Artigiano Digitale"**

Digital Eco si presenta come uno studio dove ogni decisione visiva è intenzionale e ogni elemento ha guadagnato il proprio posto. Il sistema rifiuta l'ornamento gratuito: la raffinatezza emerge dalla disciplina, non dalla decorazione. Come un artigiano che sceglie il legno giusto per ogni giuntura, ogni token qui esiste per una ragione precisa.

La palette è radicata nel Mediterraneo: verde oliva profondo, superfici carta, tipografia che porta il peso della tradizione editoriale italiana. Il verde primario — Verde Oliva Scuro — compare come firma deliberata, mai come sfondo. Il verde acido dell'accent è riservato ai momenti di energia: la CTA, un'etichetta, un dettaglio che sveglia la pagina.

Questo sistema rifiuta esplicitamente: gradienti viola su sfondo bianco, card identiche in griglia infinita, font-size uniformi, qualsiasi cosa che sembri generata in 30 secondi. Se qualcuno può guardarlo e dire "AI ha fatto questo", è un fallimento.

**Key Characteristics:**
- Serif per display e titoli, sans per body e label — contrasto di carattere, non di rumore
- Spazio abbondante come segnale di qualità
- Verde come firma, non decorazione
- Ombre diffuse e basse, mai drammatiche
- Gerarchia tipografica a tre livelli minimi tra ogni step

## 2. Colors: La Palette Mediterranea

Una palette radicata nella terra, non nel neon.

### Primary
- **Verde Oliva Scuro** (`#0A5C44`): il colore dell'identità. Usato per CTA primaria, headline accent (italic), elementi che richiedono massima autorevolezza. Mai come sfondo di sezione.
- **Verde Foglia** (`#2ECC71`): l'energia della crescita. Riservato a micro-dettagli: pill CTA nella navbar, decorazioni lineari, indicatori di stato positivo. Uso massimo: 10% della superficie visiva.

### Neutral
- **Carta Italiana** (`#F8F9FA`): sfondo pagina. Non bianco puro — il tinting minimo verso il verde lo rende umano.
- **Superficie** (`#FFFFFF`): componenti elevated (card, form, modale). Solo uno step sopra lo sfondo.
- **Superficie Offset** (`#F1F3F5`): sezioni alternate, input background, superfici secondarie.
- **Divider** (`#E2E5E9`): separatori orizzontali, bordi tabella. Usato con parsimonia.
- **Inchiostro** (`#1A1A2E`): testo principale. Tinto leggermente verso il blu-verde — mai nero puro.
- **Inchiostro Attenuato** (`#6C757D`): testo secondario, caption, label descrittive.
- **Inchiostro Tenue** (`#ADB5BD`): placeholder, testo disabilitato, dettagli fantasma.
- **Testo Inverso** (`#F8F9FA`): testo su sfondi primari scuri.

**La Regola della Firma Verde.** Il verde primario compare su ≤10% di qualsiasi schermata. La sua rarità è il punto. Appare dove il brand deve farsi sentire — non dove vuole riempire spazio.

**La Regola dell'Offset Minimo.** Nessuna superficie è puro `#fff` isolata su puro sfondo. Carta Italiana (`#F8F9FA`) come base, Superficie (`#FFFFFF`) come elevazione. Lo scarto è sottile, ma la profondità si sente.

## 3. Typography: Serif come Voce, Sans come Strumento

**Display Font:** Libre Baskerville (Georgia, serif)
**Body Font:** DM Sans (Helvetica Neue, sans-serif)

**Character:** Libre Baskerville porta autorevolezza editoriale italiana — non accademica, non decorativa. DM Sans è lo strumento preciso: leggibile, neutro, rispettoso. Insieme creano tensione produttiva tra tradizione e modernità, tra calore e chiarezza.

### Hierarchy
- **Display** (700 italic, `clamp(3rem, 0.5rem + 7vw, 7rem)`, lh 0.95): hero headline unico per pagina. Quasi sempre con una parola chiave in italic verde primario.
- **Headline** (700, `clamp(2.5rem, 1rem + 4vw, 5rem)`, lh 1.05): titoli di sezione. Letter-spacing `-0.025em`.
- **Title** (400 italic, `clamp(2rem, 1.2rem + 2.5vw, 3.5rem)`, lh 1.15): sottotitoli, nomi progetto. L'italic in Baskerville è il calore del sistema.
- **Body** (400, `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)`, lh 1.7): massimo 65ch per riga. DM Sans, mai Baskerville per il corpo testo.
- **Label** (600, `10px`, ls `0.22em`, uppercase): eyebrow, tag, metadati navigazione. Il maiuscoletto è il codice di accesso alle informazioni secondarie.

**La Regola del Contrasto di Registro.** Display e Headline usano Baskerville. Body e Label usano DM Sans. Non mescolare: niente Baskerville piccolo, niente DM Sans come headline. Il contrasto di registro è il sistema.

**La Regola dell'Italic come Accento.** L'italic di Baskerville non è enfasi generica — è calore, è la parola che il brand vuole che tu ricordi. Usato in headline (la parola chiave), nei nomi progetto, nei sottotitoli. Mai su body text normale.

## 4. Elevation

Il sistema usa ombre soft e diffuse — basse, ambientali, mai drammatiche. La profondità si sente, non si vede. Un componente elevated non deve gridare "sono sopra" — deve semplicemente sentirsi più vicino.

### Shadow Vocabulary
- **Ambient Low** (`0 2px 12px rgba(26,26,46,0.06)`): card a riposo, pannelli.
- **Ambient Medium** (`0 4px 12px rgba(26,26,46,0.08)`): card in hover leggero, dropdown.
- **Ambient High** (`0 12px 32px rgba(26,26,46,0.12)`): modale, floating pill navbar, elementi in focus.

**La Regola Flat-by-Default.** Le superfici sono piatte a riposo. Le ombre appaiono come risposta allo stato (hover, elevazione contestuale, focus). Una card a griglia non ha ombra — la riceve quando l'utente ci va sopra.

## 5. Components

Ogni componente è raffinato e trattenuto. Nessun gesto decorativo non giustificato.

### Buttons
- **Shape:** angoli leggermente arrotondati (8px) — non sharp, non pill. La pill è riservata alla CTA della navbar.
- **Primary:** Verde Oliva Scuro (`#0A5C44`) + testo Carta Italiana. Padding `13px 24px`. Label uppercase 600, ls `0.02em`. Hover: `translateY(-1px)` + `#084a37`. Nessuna ombra, nessun glow.
- **Secondary / Ghost:** sfondo trasparente, bordo `1px solid #E2E5E9`, testo Verde Oliva. Hover: bordo diventa `#0A5C44`, testo intensificato. Segnala possibilità senza competere col primary.
- **CTA Pill (navbar):** Verde Foglia (`#2ECC71`), pill `999px`, testo Verde Oliva Scuro. `10px 20px`. Esclusivo alla navbar — non replicare altrove.

### Cards / Containers
- **Corner Style:** arrotondati medi (16px) — percepiti come accoglienti, non spigolosi.
- **Background:** Superficie (`#FFFFFF`) su Carta Italiana — differenza minima ma presente.
- **Shadow Strategy:** Ambient Low a riposo. Ambient Medium on-hover con `scale(1.02)`.
- **Border:** `1px solid rgba(26,26,46,0.08)` — quasi invisibile, solo per definire il bordo.
- **Internal Padding:** `24px`.

### Inputs / Fields
- **Style:** sfondo Superficie Offset (`#F1F3F5`), bordo `1px solid #E2E5E9`, radius 8px.
- **Focus:** bordo diventa `#0A5C44` + `box-shadow: 0 0 0 3px rgba(10,92,68,0.12)`. Segnale chiaro senza aggressività.
- **Error:** bordo rosso tenue, messaggio in DM Sans 14px sotto il campo.
- **Label:** DM Sans 500 14px, sopra il campo, mai placeholder-only.

### Navigation
- **Style:** pill floating centrata, `56px` altezza, sfondo `#F1F3F5`, bordo `1px solid #C8CDD4`, radius `28px`. Box-shadow Ambient High.
- **Logo:** sinistra. CTA pill: destra. Zero voci di navigazione — la one-page non ne ha bisogno.
- **Mobile:** stesso pill, full-width con 16px margin laterali.

### Progetto Card (componente firma)
Card a larghezza piena per la sezione Progetti. Layout a due colonne: immagine (aspect-ratio 4:3, overflow hidden, radius 12px) + contenuto testuale. Alternanza sinistra/destra per ritmo visivo. Title in Baskerville italic 700. Descrizione in DM Sans body. Link "Scopri il progetto" con ArrowRight che trasla su hover.

## 6. Do's and Don'ts

### Do:
- **Do** usare Libre Baskerville italic per la parola chiave in ogni headline principale — è la firma emotiva del sistema.
- **Do** lasciare spazio. Padding di sezione minimo `96px` verticale. Lo spazio non è spreco, è qualità.
- **Do** usare il Verde Oliva Scuro come momento, non come sfondo. La sua rarità è il punto.
- **Do** alternare l'immagine sinistra/destra nelle card progetto — crea ritmo senza aggiungere elementi.
- **Do** applicare ombre solo come risposta allo stato (hover, focus, elevazione contestuale).
- **Do** mantenere le label in uppercase DM Sans con `0.22em` letter-spacing — è il codice che introduce le sezioni.
- **Do** usare `clamp()` per tutte le dimensioni tipografiche — il sistema è fluido, non breakpoint-dipendente.

### Don't:
- **Don't** usare gradienti viola su sfondo bianco, card identiche in griglia infinita, font Inter ovunque — il sito deve sentirsi progettato, non generato.
- **Don't** replicare l'estetica Allianz Bank: sovraccarico di informazioni, corporate grigio uniforme, nessuna gerarchia visiva.
- **Don't** costruire un hero con big number + small label + supporting stats + gradient accent — è il template SaaS più abusato del settore.
- **Don't** usare il Verde Foglia (`#2ECC71`) come sfondo di sezione o elemento dominante — è riservato alla CTA navbar e a micro-accenti.
- **Don't** usare `border-left` colorato come decorazione su card o list item — mai. Usa bordi completi, tint di sfondo, o niente.
- **Don't** usare `background-clip: text` con gradiente — testo solido sempre.
- **Don't** scrivere copy che ripete il titolo della sezione. Ogni parola guadagna il suo posto.
- **Don't** usare Libre Baskerville per il body text — appartiene agli heading. Il contrasto di registro è il sistema.
- **Don't** creare card con icona + titolo + testo ripetute identiche in griglia — è densità senza ritmo.
