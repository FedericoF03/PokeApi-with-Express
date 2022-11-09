const $HIDDENORDER = document.getElementById('hiddenOrder'),
$HIDDENMODE = document.getElementById('hiddenMode'),
$HIDDENLIMIT = document.getElementById('hiddenLimit'),
$HIDDENOFFSET = document.getElementById('hiddenOffset'),
$SELECTORDER = document.getElementById('selectOrder'),
$SELECTMODE = document.getElementById('selectMode'),
$SELECTTYPE = document.getElementById('selectType'),
$FORM = document.getElementById('createForm'),
$ARROW = document.getElementById('arrow'),
$CONT = document.getElementById('conteiner'),
$SEARCH = document.getElementById('inputSearch'),
$QUERY = document.getElementById('searchPokemon'),
$SHINY = document.getElementById('shiny'),
$IMGPOKE = document.getElementById('imgPoke'),
$IMGSHINY = document.getElementById('imgShiny'),
$INFO = document.getElementById('info'),
$MODALDISPLAY = document.getElementById('modal'),
$FAVINPUT = document.getElementById('fav'),
$LINK = document.getElementById('link');

document.addEventListener('click', e => {

    if(e.target.id === 'inputLimit') {
        $HIDDENLIMIT.value = e.target.textContent;
        $HIDDENOFFSET.value = 0;
        $FORM.submit();
    }
    if (e.target === $SEARCH) if ($QUERY.value.trim() !== '') location.pathname = `Pokemon/${$QUERY.value.trim().toLowerCase()}`;

    if (e.target === $ARROW) $CONT.scrollTop = 0;

    if (e.target.id === 'pag') {
        $HIDDENOFFSET.value = e.target.value;
        $FORM.submit();
    }   
        
    if (e.target.id === 'shiny') {
        if ($IMGPOKE.hasAttribute('hidden')) $IMGPOKE.removeAttribute('hidden')
        else  $IMGPOKE.setAttribute('hidden','hidden')
        if ($IMGSHINY.hasAttribute('hidden')) $IMGSHINY.removeAttribute('hidden')
        else  $IMGSHINY.setAttribute('hidden','hidden')    
    }
   
    if(e.target.id === 'info' || e.target.id === 'modal' ) {
        $MODALDISPLAY.style.display == 'flex' 
        ? $MODALDISPLAY.style.display = 'none' 
        :  $MODALDISPLAY.style.display = 'flex'
    }

    if(e.target.id === $FAVINPUT.id ) {
        let nameToSave = document.getElementById('namePoke').textContent;
        nameToSave = nameToSave.split('/');
        let id = nameToSave[1].split('N°'),
            arrayPoke = [],
            pokemon = { name : nameToSave[0], id : id[1], img: $IMGPOKE.src }

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
    
    
})
if (location.pathname.match('/Pokedex')) $LINK.href = '/';
document.addEventListener('change', e => {
    if (e.target === $SELECTMODE) {
        if(location.pathname.match('/Pokemon')) location.href = `http://localhost:3000/pokedex?mode=${e.target.value}`
        else location.href = `http://localhost:3000${location.pathname}?mode=${e.target.value}`;
    }
    
    if (e.target === $SELECTORDER) {
        $HIDDENORDER.value = e.target.value;
        $FORM.submit();
    }
    
    if (e.target === $SELECTTYPE) {
        if (e.target.value === 'all')  location.href = `/Pokedex?mode=${e.target.value}`
        else location.href = `/types/${e.target.value}?mode=${$HIDDENMODE.value}`; 
        
    }
})

$CONT.addEventListener('scroll', () => $CONT.scrollTop > 500 ? $ARROW.style.display = 'block' : $ARROW.style.display = 'none');

document.addEventListener('keydown', e => { 
if ( e.keyCode === 13 ) if ($QUERY.value.trim() !== '') location.pathname = `Pokemon/${$QUERY.value.trim().toLowerCase()}`;
})

