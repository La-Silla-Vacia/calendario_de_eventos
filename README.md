Source files for calendario_de_eventos
=====

## Description

Please provide a short description of this project

## Data
Please link to any external data used, as well as scripts for cleaning and analyzing that data, all of which should live in the `/data` directory.

## Installation
After cloning the repository run:
```
npm install
```

To start watching the project and opening in the browser run:
```
npm start
```

To deploy to GitHub pages run:
```
npm run deploy
```

---

## Embeding on LSV
To embed on a webpage use this code:
```html
<!-- START OF OUR INTERACTIVE -->
<script type="text/javascript">
window.calendario_de_eventos_data = {
  "name": "calendario_de_eventos"
}
</script>
<div class="lsv-interactive" id="calendario_de_eventos">
<img src="https://la-silla-vacia.github.io/calendario_de_eventos/screenshot.png" class="screenshot" style="width:100%;">
</div>
<script defer type="text/javascript" src="https://la-silla-vacia.github.io/calendario_de_eventos/script.js"></script>
<!-- END OF OUR INTERACTIE -->
```