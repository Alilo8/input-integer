module.exports = inputInteger

const sheet = new CSSStyleSheet;
const theme = get_theme();
sheet.replaceSync(theme);

let id = 0;

function inputInteger (opts, protocol) {
    const { min, max } = opts;
    const name = `input-integer-${id++}`;

    const notify = protocol({ from: name }, listen);
    function listen(message){
        const { type, data } = message;
        if (type === 'update'){
            input.value = data;
        }
    }

    const el = document.createElement('div');
    const shadow = el.attachShadow({ mode: 'closed'});
    const input = document.createElement('input');
    input.type = 'number';
    input.min = min;
    input.max = max;
    input.onkeyup = (e) => handle_onkeyup(e, input);
    input.onblur = (e) => handle_onblur(e, input);
    shadow.append(input)
    shadow.adoptedStyleSheets = [sheet]
    return el;
    
    function handle_onkeyup (e, input) {
        const val = Number(e.target.value);
    
        const len = val.toString().length;
        const min_len = input.min.toString().length;
    
        if(val>input.max) input.value = input.max;
        else if(len === min_len && val<input.min) input.value = input.min;
    
        notify({ from: name, type: 'update', data: val});
    }
    function handle_onblur(e, input){
        const val = Number(e.target.value);
        if(val < input.min) input.value = null;
    }
}

function get_theme () {
    return `
        :host {
            --b: 0, 0%;
            --color-white: var(--b), 100%;
            --color-black: var(--b), 0%;
            --color-grey: var(--b), 85%;
            --bg-color: var(--color-grey);
            --shadow-xy: 0 0;
            --shadow-blur: 8px;
            --shadow-color: var(--color-white);
            --shadow-opacity: 0;
            --shadow-opacity-focus: 0.65;
        }
        input {
            text-align: left;
            align-items: center;
            font-size: 1.4rem;
            font-weight: 200;
            color: hsla(var(--color-black), 1);
            background-color: hsla(var(--bg-color), 1);
            padding: 8px 12px;
            box-shadow: var(--shadow-xy) var(--shadow-blur) hsla( var(--shadow-color), var(--shadow-opacity));
            transition: font-size .3s, color .3s, background-color .3s, box-shadow .3s ease-in-out;
            outline: none;
            border: 1px solid hsla(var(--bg-color), 1);
            border-radius: 8px;
        }
        input:focus {
            --shadow-color: var(--color-black);
            --shadow-opacity: var(--shadow-opacity-focus);
            --shadow-xy: 4px 4px;
            box-shadow: var(--shadow-xy) var(--shadow-blur) hsla( var(--shadow-color), var(--shadow-opacity));
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    `
}

