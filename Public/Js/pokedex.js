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
    
})

document.addEventListener('change', e => {
    if (e.target === $selectOrder) {
        $hiddenOrder.value = e.target.value;
        $form.submit();
    }  
})

if (location.pathname.match('/Pokedex')) $link.href = '/';

$types.forEach(element => element.href = element.href + location.search)