# Klubų logotipai

## Svarbiausia: ką įkelti į klubo profilį

Kad share kortelės (postai) atrodytų gerai, į klubo profilį reikia įkelti **šiuos du failus**:

| Klubas | Failas |
|---|---|
| Baltas Vilkas | `baltas-vilkas/baltas-vilkas-JUOSTAI-ikelti.png` |
| Shodan | `shodan/shodan-JUOSTAI-ikelti.png` |

**Kur įkelti:** prisijungus klubo paskyra → Profilis → „Klubo funkcijos ir logotipas" → keisti logo.

**Kodėl būtent šie:** postų apačioje yra juoda juosta (SPOBU · | · klubo logo), logotipas joje
rodomas 72 px aukščio. Todėl reikia **balto varianto su permatomu fonu** — juodas logotipas
ant juodos juostos būtų nematomas. Failai jau paruošti 512 px (tiek pat, kiek appsas ir taip
sumažina įkeliant), su permatomu fonu.

Baltam Vilkui palikta tik viršutinė eilutė (vilkas + BALTAS VILKAS), be „KARATĖ MOKYKLA" —
su ja visas logotipas juostoje susitraukia ir tampa neįskaitomas.

---

## Kiti failai (jei prireiks kitur)

Paruošta ir daugiau variantų — Facebook/Instagram profiliui, plakatams, nuotraukoms:

| Failas | Kam |
|---|---|
| `*-logo-tamsiam-fonui.png` | Baltas logotipas ant tamsaus fono ar nuotraukos |
| `*-logo-sviesiam-fonui.png` | Juodas / originalių spalvų logotipas ant balto fono |
| `*-logo-kortele.png` | Kai fonas margas — logotipas ant plokštės su apvaliais kampais |
| `*-avataras-1024.png` | Facebook / Instagram profilio nuotrauka |
| `*-vandenzenklis.png` | Pusiau permatomas ženklas nuotraukų kampui |
| `baltas-vilkas-zenklas-*` | Tik vilko galva — kai vietos mažai |
| `*-originalas.*` | Klubų atsiųsti originalai (nepaliesti) |

### Baltas Vilkas turi ir SVG

Logotipas atkurtas kaip vektorius, todėl tinka bet kokiam dydžiui be pikselių —
nuo ikonos iki banerio. `baltas-vilkas-logo.svg` naudoja `fill="currentColor"`
(spalvą nustato CSS, tinka dėti tiesiai į HTML); `-baltas.svg` / `-juodas.svg` —
fiksuotos spalvos, dizaineriui ar Canva.

### Shodan — tik rastras

Klubo atsiųstas failas mažos raiškos (447×447 JPG), paruoštas 4× padidintas PNG.
Postams pakanka. Bet baneriui, marškinėliams ar plakatui verta iš klubo paprašyti
**originalaus vektorinio failo (SVG, AI, EPS ar PDF)**. Automatiškai vektorizuoti neverta —
kaligrafija ir auksinis apskritimas persidengia, atkūrimas iškraipytų logotipą.
