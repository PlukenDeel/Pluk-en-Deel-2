# CMS instellen — Sveltia CMS + GitHub Pages

Dit zijn de eenmalige stappen om het CMS werkend te krijgen.
Daarna kunnen werkgroepleden inloggen op `/admin` en de site bewerken zonder GitHub-kennis nodig te hebben voor dagelijks gebruik.

De setup bestaat uit drie delen:
1. Cloudflare Worker deployen (OAuth proxy)
2. GitHub OAuth App registreren
3. `config.yml` bijwerken en pushen

---

## Deel 1 — Cloudflare Worker deployen

De Worker regelt het inloggen via GitHub. Dit doe je eenmalig.

1. Maak een gratis account op [cloudflare.com](https://cloudflare.com)
2. Ga naar [github.com/sveltia/sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)
3. Klik de **"Deploy to Cloudflare"** knop op die pagina
4. Volg de stappen — Cloudflare maakt automatisch een Worker aan
5. Na deployment zie je de Worker URL, bijv.:
   ```
   https://sveltia-cms-auth.JOUWnaam.workers.dev
   ```
   Bewaar deze URL.

---

## Deel 2 — GitHub OAuth App registreren

1. Ga naar [github.com/settings/developers](https://github.com/settings/developers)
2. Klik **"New OAuth App"**
3. Vul in:
   - **Application name:** `Pluk & Deel CMS`
   - **Homepage URL:** `https://plukendeel.github.io/Pluk-en-Deel-2`
   - **Authorization callback URL:** `https://sveltia-cms-auth.JOUWnaam.workers.dev/callback`
4. Klik **"Register application"** → daarna **"Generate a new client secret"**
5. Bewaar de **Client ID** en **Client Secret**

### Worker configureren

1. Cloudflare dashboard → Workers → `sveltia-cms-auth` → **Settings → Variables**
2. Voeg toe:
   - `GITHUB_CLIENT_ID` → jouw Client ID
   - `GITHUB_CLIENT_SECRET` → jouw Client Secret
   - `ALLOWED_DOMAINS` → `plukendeel.github.io`
3. Klik **Save and deploy**

---

## Deel 3 — config.yml bijwerken

Open `admin/config.yml` in de repo en vervang de `base_url`:

```yaml
backend:
  name: github
  repo: plukendeel/Pluk-en-Deel-2
  branch: main
  base_url: https://sveltia-cms-auth.JOUWnaam.workers.dev
```

Push naar GitHub. Het CMS is nu actief op `/admin/`.

---

## Werkgroepleden toegang geven

Werkgroepleden hebben een GitHub-account nodig (gratis, eenmalig aanmaken).

Daarna toevoegen als collaborator:
1. Repo op GitHub → **Settings → Collaborators → Add people**
2. Zij accepteren de uitnodiging per e-mail
3. Klaar — ze kunnen inloggen op `/admin/`

---

## Wat kunnen werkgroepleden bewerken?

| Onderdeel | Wat je aanpast |
|---|---|
| ⚙️ Algemene instellingen | Seizoen, goed doel, impact-cijfers |
| 📅 Agenda | Data via kalender, locaties, beschrijvingen |
| 👥 Werkgroep | Namen toevoegen of verwijderen |
| 📷 Foto's | Foto's uploaden, tijdlijn-teksten aanpassen |

Na opslaan pusht het CMS automatisch een commit naar GitHub. De site is binnen ~1 minuut bijgewerkt.

---

## Later: plukendeel.nl koppelen

1. Voeg een `CNAME`-bestand toe aan de repo met als inhoud: `plukendeel.nl`
2. Stel bij je domeinnaam-provider in: `CNAME www plukendeel.github.io`
3. Update `ALLOWED_DOMAINS` in de Cloudflare Worker naar `plukendeel.nl`
4. Pas eventueel de homepage URL aan in de GitHub OAuth App

---

## Problemen?

**"Not authorized"** → Controleer `ALLOWED_DOMAINS` in Cloudflare.

**"Repo not found"** → Controleer `repo:` in `admin/config.yml`.

**Wijzigingen verschijnen niet** → Wacht 1–2 minuten. Check GitHub → Actions of de build slaagt.
