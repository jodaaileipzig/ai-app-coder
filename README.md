# ⚡ AI App Coder v2

**Beschreibe deine App. Erhalte sofort lauffähigen Code.**

Eine installierbare Progressive Web App (PWA), die Ideen in komplette Web-Apps verwandelt — mit 12 Vorlagen, Design-Wahl und optionalem KI-Modus. Läuft zu 100 % im Browser, komplett offline-fähig.

![Icon](icons/icon-192.png)

## ✨ Features

- **12 App-Vorlagen**: To-Do, Notizen, Ausgaben-Tracker, Habit-Tracker, Taschenrechner, Einheitenumrechner, Passwort-Generator, Pomodoro-Timer, Quiz, Memory, Landingpage, Wetter-Dashboard (Live-Daten via Open-Meteo)
- **Design-Optionen**: 6 Farbschemata (dunkel & hell) × 4 Schriftarten
- **Optionaler KI-Modus**: eigener OpenAI-kompatibler API-Key für beliebige Freitext-Apps, mit automatischem Offline-Fallback
- **PWA**: installierbar auf dem Homescreen, offline nutzbar (Service Worker)
- **Privatsphäre-first**: Ideen und API-Key verlassen den Browser nicht

## 📁 Dateistruktur

```
├── index.html          # Die App (Hauptdatei)
├── landing.html        # Marketing-/Präsentationsseite
├── manifest.json       # PWA-Manifest (inkl. Screenshots für die Installations-Ansicht)
├── sw.js               # Service Worker (Offline-Cache + Update-Signal)
├── .github/workflows/
│   └── deploy.yml      # GitHub Actions: Auto-Deployment auf Pages
├── screenshots/        # Installations-Screenshots (Desktop + Mobil)
└── icons/
    ├── favicon-32.png
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-maskable-192.png
    └── icon-maskable-512.png
```

## 🚀 Deployment auf GitHub Pages

### Variante A: Über die GitHub-Website (ohne Kommandozeile)

1. Neues Repository auf [github.com/new](https://github.com/new) erstellen (z. B. `ai-app-coder`)
2. **Add file → Upload files** — alle Dateien aus diesem Ordner hochladen (inkl. `icons/`-Ordner)
3. **Settings → Pages** öffnen
4. Unter **Build and deployment**: Source = `Deploy from a branch`, Branch = `main`, Ordner = `/ (root)` → **Save**
5. Nach ca. 1–2 Minuten ist die App erreichbar unter:
   `https://<dein-username>.github.io/ai-app-coder/`

### Variante B: Über die Kommandozeile

```bash
git init
git add .
git commit -m "AI App Coder v2 — PWA"
git branch -M main
git remote add origin https://github.com/<dein-username>/ai-app-coder.git
git push -u origin main
```

Danach wie in Variante A Schritt 3–5: **Settings → Pages** aktivieren.

### ✅ Hinweise für GitHub Pages

- **HTTPS ist inklusive** — Voraussetzung für PWA-Installation und Service Worker ✅
- Alle Pfade sind **relativ** (`./manifest.json`, `./icons/…`) — die App funktioniert daher auch in einem Unterverzeichnis wie `/ai-app-coder/` ✅
- `index.html` im Root wird automatisch als Startseite ausgeliefert; die Landingpage ist unter `landing.html` erreichbar. Wer die Landingpage als Startseite möchte, benennt einfach die Dateien um (`landing.html` → `index.html` und umgekehrt).

### ⚙️ Variante C: Automatisches Deployment (GitHub Actions)

Der Workflow `.github/workflows/deploy.yml` ist bereits enthalten und deployt **bei jedem Push auf `main`** automatisch:

1. Repository erstellen und Code pushen (wie Variante B) — der `.github/`-Ordner muss mit hochgeladen werden
2. **Settings → Pages**: Source = **GitHub Actions** (statt „Deploy from a branch")
3. Fertig — jeder weitere Push aktualisiert die Live-App automatisch
4. Manuell starten: **Actions → Deploy → Run workflow**

### 🔄 Update-Benachrichtigung

Die App erkennt automatisch, wenn eine neue Version deployed wurde:

- Nach dem Deployment erscheint in der App unten ein Banner: **„🎉 Neue Version verfügbar!"**
- **Aktualisieren** lädt die neue Version sofort (Service Worker wird per `SKIP_WAITING` aktiviert)
- **Später** blendet den Banner aus — das Update erfolgt dann beim nächsten Start
- Die App prüft zusätzlich **alle 60 Minuten** im Hintergrund auf neue Versionen

### 📸 Screenshots in der Installations-Ansicht

`manifest.json` referenziert zwei Screenshots, die Chrome/Edge im Installationsdialog anzeigt:

- `screenshots/screenshot-desktop.png` (1280×720, `form_factor: wide`)
- `screenshots/screenshot-mobile.png` (390×844, `form_factor: narrow`)

## 📲 Als App installieren

Nach dem Deployment (oder über jeden anderen HTTPS-Host):

- **Android / Chrome**: In der App erscheint oben rechts der Button **„📲 Zum Homescreen hinzufügen"** → tippen → bestätigen
- **iOS / Safari**: Teilen-Symbol → **„Zum Home-Bildschirm"**
- **Desktop (Chrome/Edge)**: Installations-Button in der App oder Icon in der Adressleiste

Danach startet die App im eigenen Fenster — auch **komplett offline**.

## 🔒 Datenschutz

Es gibt keinen Server und kein Tracking. Generierte Apps, Einstellungen und der optionale API-Key bleiben ausschließlich im Browser (localStorage / Cache des Service Workers).

## 📄 Lizenz

Der generierte Code ist frei verwendbar. Diese App ebenso — nutze sie, wie du möchtest.
