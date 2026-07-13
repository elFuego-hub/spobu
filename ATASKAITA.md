# SPOBU ikonų diegimas — 0 + 1 partija (v371)

## Kas padaryta (failai šiame aplanke pakeičia tavo repo failus)
- **index.html** — įterptas 145 ikonų sprite po <body>; versija pakelta į v371 (app.js?v=371, styles.css?v=371, v371 žymė).
- **styles.css** — gale pridėta .ico / .ico-duo / .dot sistema.
- **app.js** — viršuje ico() helperis; _renderToast automatiškai keičia pradinį ✅/✓/❌/⚠/🔒 į SVG (dengia ~300 showToast vietų); 534 emoji pakeisti SVG ikonomis HTML šablonuose.

## Kas pakeista (534 vietos)
✕→uzdaryti(92) ✅→patvirtinta(80) ✓→atlikta(58) 🔔→pranesimai(44) ⚙️→nustatymai(38) ⚠️→ispejimas(34) 🚫/⛔→isjungta(26) ✏️→redaguoti(25) ❌→klaida(24) ➕→prideti(16) 🗑→trinti(16) 💾→issaugoti(13) 🔄→atnaujinti(11) 🔍→paieska(5) 🔁→kartoti(4) ✗→uzdaryti(5) · statusų taškai 🟢🟡🔴🔵⚪⚫→.dot (43)

## Kas SĄMONINGAI neliesta (liko emoji — 470 eilučių)
- push pranešimų tekstai, confirm()/alert(), console.log, kodo komentarai
- textContent/innerText priskyrimai (SVG ten neveiktų — 3 etapo spec, keičiama 2-6 partijose)
- navigator.share / clipboard / CSV / placeholder tekstai
- showToast() kvietimų VIDURIO emoji (pradinį dengia centralizuotas lopas)
- diržo spalvų '⚪' ir kt. domeniniai (2-6 partijos)

## Diegimas
1. Pakeisk repo failus šiais trimis (index.html, app.js, styles.css).
2. Deploy → patikrink v371 žymę kairiame viršuje.
3. QA: prisijungimas, toast'ai (sėkmės/klaidos), modalų ✕, nustatymai, vaiko nav, 366px plotis.
4. Jei kas nors negerai — grįžti prie v370 backup'o ir parašyk man.

## Kitos partijos (po QA)
2: vaiko portalas (🎯🏆⚡🔥 konfliktų išskaidymas) · 3: tėvai · 4: treneris · 5: klubas · 6: admin + textContent→innerHTML (37 vietos)
