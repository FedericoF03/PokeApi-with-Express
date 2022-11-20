import header from './header.js'
import arrow from './arrow.js'

const $hiddenOrder = document.getElementById('hiddenOrder'),
$hiddenLimit = document.getElementById('hiddenLimit'),
$hiddenOffset = document.getElementById('hiddenOffset'),
$selectOrder = document.getElementById('selectOrder'),
$selectType = document.getElementById('selectType'),
$menu = document.getElementById('menu'),
$form = document.getElementById('createForm'),
$arrowType = document.getElementById('imgArrow'),
$link = document.getElementById('link'),
$conteiner = document.getElementById('conteiner'),
$iconFav = document.getElementById('iconFav'),
$types = document.querySelectorAll('#typesH');

document.addEventListener('click', e => {

    if(e.target.id === 'inputLimit') {
        $hiddenLimit.value = e.target.textContent;
        $hiddenOffset.value = 0;
        $form.submit();
    }

    if (e.target.id === 'pag') {
        $hiddenOffset.value = e.target.value;
        $form.submit();
    }   

    if ($arrowType.classList.contains('sus')) {
        $menu.classList.add('nones')
        $menu.classList.remove('flex')
        $arrowType.classList.remove('sus')
    }
    if (e.target === $selectType) {
        if($menu.classList.contains('nones')) {
            $menu.classList.toggle('flex')
            $menu.classList.toggle('nones')
        } else if ($menu.classList.contains('flex')) {
            $menu.classList.toggle('flex')
            $menu.classList.toggle('nones')
        }   
        $arrowType.classList.toggle('sus')
    }

    if (e.target.id === 'pag') {
        $hiddenOffset.value = e.target.value;
        $form.submit();
    }   
    
    if (e.target.id === $iconFav.id) {
        
        let nameToSave = e.target.previousSibling.textContent,
        text = document.createElement('p')
        nameToSave = nameToSave.split('/');
        text.classList.add('fav')
        
    let id = nameToSave[1].split('N°'),
        arrayPoke = [],
        pokemon = { name : nameToSave[0], id : id[1], img: e.target.parentElement.parentElement.children[1].src}
        if (localStorage.getItem('fav') !== null) {
            let poke = JSON.parse(localStorage.getItem('fav'));
            if (poke.filter(element => element.name === nameToSave[0] ).length > 0) {
                poke = poke.filter(element => element.name !== nameToSave[0])
                text.textContent = `Se elimino el pokemon ${pokemon.name}`
                text.classList.add('remove-fav')
                $conteiner.appendChild(text)
                setTimeout(() =>  {$conteiner.removeChild($conteiner.lastChild)}, 2000)
            } else {
                poke.push(pokemon)
                text.textContent = `Se agrego el pokemon ${pokemon.name}`
                text.classList.add('add-fav')
                $conteiner.appendChild(text)
                setTimeout(() =>  {$conteiner.removeChild($conteiner.lastChild)}, 2000)
            }
            poke = JSON.stringify(poke)
            localStorage.setItem('fav', poke )
        } else {
            arrayPoke.push(pokemon)
            arrayPoke = JSON.stringify(arrayPoke)
            localStorage.setItem('fav', arrayPoke )
            text.textContent = `Se agrego el pokemon ${pokemon.name}`
            text.classList.add('add-fav')
            $conteiner.appendChild(text)
            setTimeout(() =>  {$conteiner.removeChild($conteiner.lastChild)}, 2000)
        } 
    }   
})

document.addEventListener('change', e => {
    if (e.target === $selectOrder) {
        $hiddenOrder.value = e.target.value;
        $form.submit();
    }  
})

if (location.pathname.match('/Pokedex')) $link.href = '/';

$types.forEach(element => element.href = element.href + location.search)