import header from "./header.js";
const $form = document.getElementById("form"),
    $arrowLeft = document.getElementById('arrowLeft'),
    $arrowRight = document.getElementById('arrow_Right'),
    $conteiner = document.getElementById("conteinerForm"),
    $error = document.createElement('p'),
    $evolutionInput = document.getElementById('evoButton'),
    $abilitiesInput = document.getElementById('abilitiesButton'),
    $movesInput = document.getElementById('movesButton'),
    $list = document.getElementById('list'),
    $menu = document.getElementById('select'),
    $varieritiesInput = document.getElementById('varieritiesButton'),
    $addIcon = document.getElementById('iconAdd'),
    arrowLimits = [1, 11];
   
let count = 1;

const validation = validate => {
    for(let key in validate) {     
        if($conteiner.children.length > 3) $conteiner.removeChild($conteiner.lastChild);
        if (validate[key] === '') {
            $error.textContent = `Campo obligatorio: "${key.match("_") ? key.slice(1).replace("_", " ") : key}" vacio, por favor rellenar`;
            $error.classList.add('errform')
            return $conteiner.appendChild($error);
        }
    }
    return true;
}

const directionals = array => {
    $form.children[count].hidden = true;
    array[0] === 11 ? $form.children[count++] : $form.children[count--];
    $form.children[count].hidden = false;

    if(count === 0) count = 11
    else if (count === 12) count = 1;
    
    $form.children[count].hidden = false;
}

const addInput = objInput => {
    let input = document.createElement('input'),
    conteiner = document.getElementById(objInput.conteiner);
    input.setAttribute('type', objInput.type);

    if(objInput.type === 'select') {
        input = document.createElement('select');
        let option = document.createElement('option');
        let optionSecondary = document.createElement('option');
        option.textContent = 'Ability';
        optionSecondary.textContent = 'Ability Ocult';
        option.setAttribute('value', 'Ability');
        optionSecondary.setAttribute('value', 'Ability Ocult');
        input.appendChild(option);
        input.appendChild(optionSecondary);
    }
    input.setAttribute('name', objInput.name);

    if(objInput.type === 'text') {
        input.classList.add('text-form')
        input.setAttribute('placeholder', objInput.placeholder);
    }
    
    if(conteiner.children.length < objInput.limits) conteiner.appendChild(input);
}

$form.addEventListener("submit", e => {
    e.preventDefault();
    let validates = {
        name: document.getElementById('name').value,
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value,
        img: document.getElementById('img').value,
        imgShiny: document.getElementById('imgShiny').value,
        hp: document.getElementById('hp').value,
        attack: document.getElementById('attack').value,
        defense: document.getElementById('defense').value,
        special_Attack: document.getElementById('specialAttack').value,
        special_Defense: document.getElementById('specialDefense').value,
        speed: document.getElementById('speed').value,
        moves: document.getElementById('moves').value,
        habitat: document.getElementById('habitat').value,
        rate: document.getElementById('rate').value,
        type: document.getElementById('type').value,
        descrp: document.getElementById('descrp').value
    };
    if(validation(validates) === true) $form.submit();       
})

document.addEventListener('click', e => {
    if (e.target.id === $arrowLeft.id) directionals(arrowLimits.sort((a,b) => a - b));
    if (e.target.id === $arrowRight.id) directionals(arrowLimits.sort((a,b) => b - a));
    if (e.target.id === $evolutionInput.id) addInput({ 
        conteiner:'evoChainName',
        type: 'text',
        placeholder: 'Chain evolve',
        limits: 4,
        name: 'evoChainName'
    });
    if (e.target.id === $abilitiesInput.id) {
        addInput({ 
            conteiner:'abilities',
            type: 'select',
            placeholder: '',
            limits: 99,
            name: 'ability'
        });
        addInput({ 
            conteiner:'abilities',
            type: 'text',
            placeholder: 'Pokemon abilitie',
            limits: 99,
            name: 'abilities'
        });
    }
    if (e.target.id === $movesInput.id) addInput({ 
        conteiner:'moves',
        type: 'text',
        placeholder: 'Pokemon moves',
        limits: 99,
        name: 'moves'
    });
    if (e.target.id === $varieritiesInput.id) addInput({ 
        conteiner:'varierities',
        type: 'text',
        placeholder: 'Pokemon Varieritie',
        limits: 99,
        name: 'varierities'
    });

    if (e.target.parentElement.id === $menu.id) {
        e.preventDefault()
        e.target.parentElement.lastChild.classList.toggle('flex')
        e.target.parentElement.lastChild.classList.toggle('nones') 
        e.target.parentElement.lastChild.previousSibling.classList.toggle('back-arrow--grey')
        
    }
    
    if (e.target.parentElement.id === $list.id) {
        e.target.parentElement.classList.toggle('flex')
        e.target.parentElement.classList.toggle('nones') 
        e.target.parentElement.parentElement.firstChild.textContent = e.target.textContent
        e.target.parentElement.parentElement.firstChild.nextSibling.value = e.target.textContent
    }
   
})

if (location.pathname === '/PokemonAdd') $addIcon.parentElement.pathname =  '/Pokedex';