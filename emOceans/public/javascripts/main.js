// Palette as class ====================================================================>

class Palette{
    constructor(hue) {
        this.hue = hue;
        this.originalColor = hue;
        this.warm = null;
        this.cool = null;
        this.name = null;
        this.element = document.querySelector('.palette')
        this.updateElement();
        this.resetElement();
    }
    setHue(hue) {
        this.hue = hue;
        this.updateElement();
    }
    setWarm(warm) {
        this.warm = warm;
    }
    setCool(cool) {
        this.cool = cool;
    }
    setName(name) {
        this.name = name;
    }
    setOriginalColor(hue){
        this.originalColor = hue;
    }
    updateElement() {
        if (this.element){
            this.element.style.backgroundColor = this.hue;
        }
    }
    resetElement() {
        if (this.element) {
            this.element.style.backgroundColor = this.originalColor;
        }
    }
    lighten() {
        let total;
        if (typeof this.hue == 'object'){
            total = this.hue._rgb[0] + this.hue._rgb[1] + this.hue._rgb[2]
        }
        if (!total || total < 650){
            this.hue = chroma(this.hue).brighten(1)
            this.updateElement()
        }
    }
    darken() {
        let total;
        if (typeof this.hue == 'object') {
            total = this.hue._rgb[0] + this.hue._rgb[1] + this.hue._rgb[2]
        }
        if (!total || total > 100) {
            this.hue = chroma(this.hue).darken(1)
            this.updateElement()
        }
    }
    sat() {
        this.hue = chroma(this.hue).saturate(1)
        this.updateElement()
    }
    desat() {
        this.hue = chroma(this.hue).desaturate(2)
        this.updateElement()
    }
    warmer() {
        this.hue = chroma.mix(this.hue, this.warm, 0.25)
        this.updateElement()
    }
    cooler() {
        this.hue = chroma.mix(this.hue, this.cool, 0.25)
        this.updateElement()
    }
    reset() {
        this.hue = this.originalColor
        this.updateElement()
    }
    sendToForm() {
        this.hue = formColor.value
    }
}

// Palette object declaration ==========================================================>

let colorPalette = new Palette('rbg(255, 255, 255)')

// Color as class ======================================================================>

class Color{
    constructor(name, hue, warm, cool, paletteToChange) {
        this.name = name;
        this.hue = hue;
        this.warm = warm;
        this.cool = cool;
        this.originalColor = hue;
        this.element = document.createElement('div')
        this.element.classList.add('swatch')
        this.updateElement();
        this.element.addEventListener('click',(event) => {
            paletteToChange.setHue(this.hue);
            paletteToChange.setCool(this.cool);
            paletteToChange.setWarm(this.warm);
            paletteToChange.setOriginalColor(this.hue);
            paletteToChange.setName(this.name)
            document.querySelector(".editorContainer").style.display = 'flex';
            document.querySelector(".paletteContainer").style.display = 'flex';
            document.querySelector(".swatchContainer").classList.add('mobileHide');
            document.getElementById("desat").disabled = false;
        })
        document.querySelector('.swatchContainer').appendChild(this.element)
    }
    updateElement() {
        this.element.style.backgroundColor = this.hue;
    }
}

// Color object declarations ==========================================================>
// These aren't final, we need to tweak color codes for hue esp, but also warm/cool,
// and adjust the ratio for .mix() to slow down the warming/cooling process

let reds = new Color('red','rgb(220, 20, 60)', 'rgb(139, 69, 19)', 'rgb(102, 51, 153)', colorPalette)
let oranges = new Color('orange', 'rgb(245, 155, 6)', 'brown', 'blue', colorPalette)
let yellows = new Color('yellow', 'rgb(245, 234, 6)', 'orange', 'green', colorPalette)
let greens = new Color('green', 'rgb(11, 149, 74)', 'yellow', 'blue', colorPalette)
let turquoises = new Color('turquoise', 'rgb(18, 175, 197)', 'yellow', 'blue', colorPalette)
let blues = new Color('blue', 'rgb(16, 79, 225)', 'rebeccapurple', 'navy', colorPalette)
let purples = new Color('purple', 'rgb(101, 36, 239)', 'red', 'blue', colorPalette)
let magentas = new Color('magenta','rgb(218, 112, 214)', 'red', 'blue', colorPalette)
let browns = new Color('brown', 'rgb(113, 70, 18)', 'red', 'blue', colorPalette)
let whites = new Color('white', 'rgb(255, 255, 255)', 'burlywood', 'aliceblue', colorPalette)
let grays = new Color('gray', 'rgb(169, 169, 169)', 'palevioletred', 'lightskyblue', colorPalette)
let blacks = new Color('black', 'rgb(0, 0, 0)', 'red', 'blue', colorPalette)

// Event listeners for color adjust buttons ============================================>
// Work on putting into for loop!

lightenButton.addEventListener('click', (event) => {
    colorPalette.lighten()
})

darkenButton.addEventListener('click', (event) => {
    colorPalette.darken()
})

satButton.addEventListener('click', (event) => {
    colorPalette.sat()
    document.getElementById("desat").disabled = false;
})

desatButton.addEventListener('click', (event) => {
    colorPalette.desat()
    document.getElementById("desat").disabled = true;
})

warmButton.addEventListener('click', (event) => {
    colorPalette.warmer()
})

coolButton.addEventListener('click', (event) => {
    colorPalette.cooler()
})

resetButton.addEventListener('click', (event) => {
    colorPalette.reset()
    document.getElementById("desat").disabled = false;
})

// JS for getting color INTO FORM to be posted============================>

saveButton.addEventListener('click', (event) => {
    let savedColor = palette.style.backgroundColor 
    formColor.value = savedColor
    document.querySelector('.swatchContainer').style.display = 'none';
    document.querySelector(".editorContainer").style.display = 'none'
    document.querySelector(".textContainer").style.display = 'flex';
    document.querySelector(".submitContainer").style.display = 'flex';
    document.querySelector("#today").valueAsDate = new Date();
})

