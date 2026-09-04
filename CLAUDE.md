# SPOBU — deploy repo (app.spobu.lt)

Šis repas yra **deploy** repas: GitHub Pages rodo `main` šaką adresu app.spobu.lt.
Šaltinio kodas gyvena atskirame repe **spobu-src** (čia jo nėra). Deploy botas iš spobu-src
perrašo `index.html`, `styles.css`, `app.js` commit'ais „Deploy vNNN (spobu-src <sha>)“,
todėl ilgalaikius pakeitimus reikia daryti ir spobu-src, kitaip kitas deploy juos perrašys.

## Savininko nurodymas dėl šakų ir sujungimo (2026-09-04)

Savininkas nenori nieko sujungti rankomis (nei per PC, nei telefone). Todėl kiekviena
Claude sesija, padariusi pakeitimą:

1. Commit'ina į savo sesijos šaką (`claude/...`) ir ją push'ina, kaip įprasta.
2. Pati sujungia tą šaką į `main` ir push'ina `main`, be atskiro klausimo ir be PR laukimo.
   Pirmiausia `git fetch origin main && git merge --ff-only origin/main` savo šakoje, tada
   `git push origin HEAD:main` (fast-forward). Jei fast-forward neįmanomas, paprastas merge
   commit. Niekada `--force` į `main`.
3. Po push'o patikrina, ar app.spobu.lt jau rodo naują versiją:
   `curl -s https://app.spobu.lt/index.html | grep -o 'id="app-version"[^>]*>v[0-9]*'`

Tai yra aiškus, nuolatinis savininko leidimas push'inti į `main` (duotas 2026-09-04).

## Versijavimas, privaloma su kiekvienu pakeitimu

- `index.html`: `#app-version` tekstas (`vNNN`) didinamas +1.
- `index.html`: `styles.css?v=NNN` ir `app.js?v=NNN` gauna tą patį numerį (kešo apėjimas).
- `index.html` pabaigoje `<!-- build: <unix laikas> -->` atnaujinamas.
- Versijos ženkliukas paslėptas visiems, išskyrus admin (`body.portal-a`), žr. `styles.css`
  (savininko sprendimas 08-24). Rodyti visiems tik laikinam deploy testui ir po jo vėl paslėpti.
- Programa pati tikrina `index.html` versiją (`checkForNewVersion` app.js) ir siūlo atsinaujinti.
