import header from './header.js'
import arrow from './arrow.js'
const $HIDDENORDER = document.getElementById('hiddenOrder'),

$HIDDENLIMIT = document.getElementById('hiddenLimit'),
$HIDDENOFFSET = document.getElementById('hiddenOffset'),
$SELECTORDER = document.getElementById('selectOrder'),
$SELECTTYPE = document.getElementById('selectType'),
$MENU = document.getElementById('menu'),
$FORM = document.getElementById('createForm'),
$ARROWTYPE = document.getElementById('imgArrow'),
$LINK = document.getElementById('link'),
$typos = document.querySelectorAll('#typesH')

document.addEventListener('click', e => {

    if(e.target.id === 'inputLimit') {
        $HIDDENLIMIT.value = e.target.textContent;
        $HIDDENOFFSET.value = 0;
        $FORM.submit();
    }

    if (e.target.id === 'pag') {
        $HIDDENOFFSET.value = e.target.value;
        $FORM.submit();
    }   

    if ($ARROWTYPE.classList.contains('sus')) {
        $MENU.classList.add('nones')
        $MENU.classList.remove('flex')
        $ARROWTYPE.classList.remove('sus')
    }
    if (e.target === $SELECTTYPE) {
        if($MENU.classList.contains('nones')) {
            $MENU.classList.toggle('flex')
            $MENU.classList.toggle('nones')
        } else if ($MENU.classList.contains('flex')) {
            $MENU.classList.toggle('flex')
            $MENU.classList.toggle('nones')
        }   
        $ARROWTYPE.classList.toggle('sus')
    }

    if (e.target.id === 'pag') {
        $HIDDENOFFSET.value = e.target.value;
        $FORM.submit();
    }   
    
})

document.addEventListener('change', e => {
    if (e.target === $SELECTORDER) {
        $HIDDENORDER.value = e.target.value;
        $FORM.submit();
    }  
})

if (location.pathname.match('/Pokedex')) $LINK.href = '/';

$typos.forEach(element => {
    element.href = element.href + location.search
})