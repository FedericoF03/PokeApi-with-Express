import header from './header.js'
import arrow from './arrow.js'

let kids = document.getElementById('stats').children,
    father = document.getElementById('stats'),
    $favInput = document.getElementById('fav'),
    $imagePoke = document.getElementById('imgPoke'),
    $imageShiny = document.getElementById('imgShiny'),
    $shiny = document.getElementById('shiny'),
    $modalDisplay = document.getElementById('info'),
    $modal = document.getElementById('modal'),
    $backgroundDinamic = document.querySelector('#backgroundDinamic'),
    $backgroundDataDinamic = document.querySelectorAll('#backDataDinamic'),
    $type = document.querySelectorAll('.types')[0],
    $srcRemove = [`https://pokeapi-with-express-production.up.railway.app/Public/Assets/`, '.png'],
    $typeNow = $type.src.split($srcRemove[0]).join('').split($srcRemove[1]).join(''),
    colors = {
        pink: {
            strong:'#75525C',
            soft:'#CA98A6',
            transparent: '#4b383dd1',
            light: '#cd6aa5'
        },
        orange: {
            strong:'#994025',
            soft:'#EF6239',
            transparent: '#271d14cc',
            light: '#cd8d32'
        },
        blueSoft: {
            strong:'#4A677D',
            soft:'#94B2C7',
            transparent: '#0f1a3fc9',
            light: '#6a95cd'
        },
        purple: {
            strong:'#5E2D89',
            soft:'#9B69DA',
            transparent: '#260f3fc9',
            light: '#956acd'
        },
        brownSoft: {
            strong:'#6E491F',
            soft:'#A8702D',
            transparent: '#3f2e0fc9',
            light: '#cda96a'
        },
        brown: {
            strong:'#48190B',
            soft:'#8B3E22',
            transparent: '#3f180fc9',
            light: '#cd7c6a'
        },
        greenDark: {
            strong:'#1C4B27',
            soft:'#3C9950',
            transparent: '#0f3f15c9',
            light: '#72cd6a'
        },
        blueDark: {
            strong:'#33336B',
            soft:'#906791',
            transparent: '#180f3fc9',
            light: '#af6acd'
        },
        grey: {
            strong:'#60756E',
            soft:'#43BD94',
            transparent: '#404040c9',
            light: '#6acda4'
        },
        red: {
            strong:'#AB1F24',
            soft:'#FD4B5A',
            transparent: '#271414cc',
            light: '#cd6a6a'
        },
        blue: {
            strong:'#1552E1',
            soft:'#85A8FB',
            transparent: '#141627cc',
            light: '#6a75cd'
        },
        green: {
            strong:'#157F3E',
            soft:'#27CB50',
            transparent: '#1a2714cc',
            light: '#8bcd6a'
        },
        yellow: {
            strong:'#E2E32B',
            soft:'#FAFA72',
            transparent: '#272614cc',
            light: '#cdcd6a'
        },
        pinkSoft: {
            strong:'#A52A6C',
            soft:'#F71D92',
            transparent: '#251427cc',
            light: '#cd6ac3'
        },
        lightBlue: {
            strong:'#86D2F5',
            soft:'#D8F0FA',
            transparent: '#142327cc',
            light: '#6ac3cd'
        },
        lightBlueHard: {
            strong:'#448A95',
            soft:'#62CAD9',
            transparent: '#142227cc',
            light: '#6aafcd'
        },
        dark: {
            strong:'#040707',
            soft:'#595978',
            transparent: '#010303cc',
            light: '#6d6acd'
        },
        pinkHard: {
            strong:'#961A45',
            soft:'#E91368',
            transparent: '#271419cc',
            light: '#cd6a86'
        }
    },
    types = {
        normal: 'normal',
        fighting: 'fighting',
        flying: 'flying',
        poison: 'poison',
        ground: 'ground',
        rock: 'rock',
        bug: 'bug',
        ghost: 'ghost',
        steel: 'steel',
        fire: 'fire',
        water: 'water',
        grass: 'grass',
        psychic: 'psychic',
        ice: 'ice',
        dragon: 'dragon',
        fairy: 'fairy',
        dark: 'dark',
        electric: 'electric'
    }

const ChangeColor = (colors) => {
    $backgroundDinamic.style.backgroundColor = colors.strong;
    $modal.style.backgroundColor = colors.transparent;
    $modalDisplay.style.backgroundColor = colors.light;
    $backgroundDataDinamic.forEach(element => element.style.backgroundColor = colors.soft);
}

if($typeNow ===  types.normal) ChangeColor(colors.pink)
else if($typeNow ===  types.fighting) ChangeColor(colors.orange)
else if($typeNow ===  types.flying) ChangeColor(colors.blueSoft)
else if($typeNow ===  types.poison) ChangeColor(colors.purple)
else if($typeNow ===  types.ground) ChangeColor(colors.brownSoft)
else if($typeNow ===  types.rock) ChangeColor(colors.brown)
else if($typeNow ===  types.bug) ChangeColor(colors.greenDark)
else if($typeNow ===  types.ghost) ChangeColor(colors.blueDark)
else if($typeNow ===  types.steel) ChangeColor(colors.grey)
else if($typeNow ===  types.fire) ChangeColor(colors.red)
else if($typeNow ===  types.water) ChangeColor(colors.blue)
else if($typeNow ===  types.grass) ChangeColor(colors.green)
else if($typeNow ===  types.electric) ChangeColor(colors.yellow)
else if($typeNow ===  types.psychic) ChangeColor(colors.pinkSoft)
else if($typeNow ===  types.ice) ChangeColor(colors.lightBlue)
else if($typeNow ===  types.dragon) ChangeColor(colors.lightBlueHard)
else if($typeNow ===  types.fairy) ChangeColor(colors.pinkHard)
else ChangeColor(colors.dark)



document.addEventListener('click', (e) => {
    if(e.target.id === $favInput.id ) {
        let nameToSave = document.getElementById('namePoke').textContent;
        nameToSave = nameToSave.split('/');
        let id = nameToSave[1].split('N°'),
            arrayPoke = [],
            pokemon = { name : nameToSave[0], id : id[1], img: $imagePoke.src }
        if (localStorage.getItem('fav') !== null) {
            let poke = JSON.parse(localStorage.getItem('fav'));
            if (poke.filter(element => element.name === nameToSave[0] ).length > 0) {
                poke = poke.filter(element => element.name !== nameToSave[0])
            } else poke.push(pokemon)
            poke = JSON.stringify(poke)
            localStorage.setItem('fav', poke )
        } else {
            arrayPoke.push(pokemon)
            arrayPoke = JSON.stringify(arrayPoke)
            localStorage.setItem('fav', arrayPoke )
        }   
    }

    if (e.target.id === $shiny.id ) {
        if ($imagePoke.hasAttribute('hidden')) $imagePoke.removeAttribute('hidden')
        else  $imagePoke.setAttribute('hidden','hidden')
        if ($imageShiny.hasAttribute('hidden')) $imageShiny.removeAttribute('hidden')
        else  $imageShiny.setAttribute('hidden','hidden')    
    }
   
    if(e.target.id === $modalDisplay.id || e.target.id === $modal.id ) {
        $modalDisplay.classList.toggle('nones')
        $modal.classList.toggle('nones')
        $modal.classList.toggle('flex')
    }
})

const observer = new IntersectionObserver( (entries) => {
   if (entries[0].isIntersecting) {
        for (let kid of kids) {
            let number = kid.textContent.split(' ')
            kid.children[0].style.width = `${(parseInt(number[1]) / 255) * (100) }%`
        }
    }
    
} )
observer.observe(father)



