import header from "./header.js";
const $FORM = document.getElementById("form"),
    $AL = document.getElementById('arrowLeft'),
    $AR = document.getElementById('arrow_Right'),
    $CONTEINER = document.getElementById("conteinerForm"),
    $ERRORS = document.createElement('p'),
    $EVOINPUT = document.getElementById('evoButton'),
    $ABILITIESINPUT = document.getElementById('abilitiesButton'),
    $MOVESINPUT = document.getElementById('movesButton'),
    $VARIERITIESINPUT = document.getElementById('varieritiesButton');

let count = 1,
    arrowLimits = [1, 11];

const validation = validate => {
    for(let key in validate) {     
        if($CONTEINER.children.length > 3) $CONTEINER.removeChild($CONTEINER.lastChild);
        if (validate[key] === '') {
            $ERRORS.textContent = `Campo obligatorio: "${key.match("_") ? key.slice(1).replace("_", " ") : key.slice(1)}" vacio, por favor rellenar`;
            $ERRORS.classList.add('errform')
            return $CONTEINER.appendChild($ERRORS);
        }
    }
    return true;
}

const directionals = array => {
    $FORM.children[count].hidden = true;
    array[0] === 11 ? $FORM.children[count++] : $FORM.children[count--];
    $FORM.children[count].hidden = false;
    if(count === 0) count = 11
    else if (count === 12) count = 1;
    $FORM.children[count].hidden = false;
}

const addInput = (conteiner, type, placeholder, limits, name) => {
    let input = document.createElement('input');
    conteiner = document.getElementById(conteiner);
    input.setAttribute('type', type);
    if(type === 'select') {
        input = document.createElement('select');
        let option = document.createElement('option');
        option.setAttribute('value', 'Ability');
        option.textContent = 'Ability';
        let option2 = document.createElement('option');
        option2.setAttribute('value', 'Ability Ocult');
        option2.textContent = 'Ability Ocult';
        input.appendChild(option);
        input.appendChild(option2);
    }
    input.setAttribute('name', name);
    if(type === 'text') {
        input.classList.add('text-form')
        input.setAttribute('placeholder', placeholder);
    }
    
    if(conteiner.children.length < limits) conteiner.appendChild(input);
}

$FORM.addEventListener("submit", e => {
    e.preventDefault();
    let validates = {
        $name: document.getElementById('name').value,
        $height: document.getElementById('height').value,
        $weight: document.getElementById('weight').value,
        $img: document.getElementById('img').value,
        $imgShiny: document.getElementById('imgShiny').value,
        $hp: document.getElementById('hp').value,
        $attack: document.getElementById('attack').value,
        $defense: document.getElementById('defense').value,
        $special_Attack: document.getElementById('specialAttack').value,
        $special_Defense: document.getElementById('specialDefense').value,
        $speed: document.getElementById('speed').value,
        $moves: document.getElementById('moves').value,
        $habitat: document.getElementById('habitat').value,
        $rate: document.getElementById('rate').value,
        $type: document.getElementById('type').value,
        $descrp: document.getElementById('descrp').value
    };
    if(validation(validates) === true) $FORM.submit();       
})

document.addEventListener('click', e => {
    arrowLimits.sort((a,b) => a - b);
    if (e.target.id === $AL.id) directionals(arrowLimits);
    arrowLimits.sort((a,b) => b - a);
    if (e.target.id === $AR.id) directionals(arrowLimits);
    if (e.target.id === $EVOINPUT.id) addInput('evoChainName', 'text', 'Chain evolve', 4, 'evoChainName');
    if (e.target.id === $ABILITIESINPUT.id) {
        addInput('abilities', 'select', '', 99, 'ability')
        addInput('abilities', 'text', 'Pokemon abilitie', 99, 'abilities')
    }
    if (e.target.id === $MOVESINPUT.id) addInput('moves', 'text', 'Pokemon moves', 99, 'moves');
    if (e.target.id === $VARIERITIESINPUT.id) addInput('varierities', 'text', 'Pokemon Varieritie', 99, 'varierities');
})