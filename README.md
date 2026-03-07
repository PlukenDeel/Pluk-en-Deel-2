# Pluk & Deel — Jekyll website

## Technische stack
- **Jekyll 4** — statische sitegenerator
- **Netlify** — hosting + gratis formulierverwerking
- **Decap CMS** — web-based bewerkinterface (in `/admin`)
- **GitHub** — versiebeheer en Netlify-trigger

---

## Lokaal draaien

```bash
# Vereisten: Ruby + Bundler
gem install bundler
bundle install
bundle exec jekyll serve
# → http://localhost:4000
```

---

## Bestanden die je aanpast

Alle inhoud zit in `_data/`. Je hoeft nooit HTML aan te raken.

| Bestand | Wat je aanpast |
|---|---|
| `_data/algemeen.yml` | Seizoen, goed doel, vrijwilligersaantal, impact-cijfers |
| `_data/agenda.yml` | Data, locaties, beschrijvingen per activiteit |
| `_data/werkgroep.yml` | Namen van werkgroepleden |
| `_data/tijdlijn.yml` | Titels, omschrijvingen en foto-namen per tijdlijnstap |

### Nieuw seizoen instellen

1. Zet `seizoen: "2027"` in `_data/algemeen.yml`
2. Pas alle datums + `iso:` velden aan in `_data/agenda.yml`
3. Update `goed_doel` en `goed_doel_uitleg`
4. Push naar GitHub → Netlify bouwt automatisch

### Agenda — verlopen datums

De agenda-kaarten worden automatisch lichter weergegeven zodra de datum voorbij is. Dit werkt via het `iso:` veld in `_data/agenda.yml`. Zorg dat elk agenda-item een correct ISO-datum heeft in het formaat `YYYY-MM-DD`.

---

## Netlify instellen (eerste keer)

1. Maak een gratis account op netlify.com
2. "Add new site" → "Import from GitHub"
3. Kies deze repository
4. Build command: `jekyll build`
5. Publish directory: `_site`
6. Deploy!

### Formulieren activeren

Voeg `netlify` toe als attribuut aan het `<form>` element in `index.html`:
```html
<form netlify name="aanmelden">
```
Netlify verwerkt dan alle aanmeldingen gratis en stuurt een e-mail notificatie.

### DNS instellen (plukendeel.nl)

Voeg bij je domeinnaam-provider toe:
```
CNAME  www  [jouw-netlify-naam].netlify.app
```

---

## Foto's toevoegen

Zet foto's in `/images/uploads/`. Voor de tijdlijn: gebruik de bestandsnamen zoals ingesteld in `_data/tijdlijn.yml`. Als een foto ontbreekt, toont de tijdlijn automatisch het emoji-icoon als fallback.

Aanbevolen formaten:
- Tijdlijn: 800×600 px (4:3 verhouding)
- OG-image: 1200×630 px (sla op als `og-image.jpg`)
