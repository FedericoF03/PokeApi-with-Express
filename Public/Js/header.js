let $SELECTMODE = document.getElementById('selectMode'),
    $QUERY = document.getElementById('searchPokemon'),
    $SEARCH = document.getElementById('inputSearch')
    
document.addEventListener('change', e => {
    if (e.target === $SELECTMODE) {
        if(location.pathname.match('/Pokemon')) location.href = `${location.hostname}/pokedex?mode=${e.target.value}`
        else location.href = `${location.pathname}?mode=${e.target.value}`;
    }
})
document.addEventListener('click', e => {
    if (e.target === $SEARCH) if ($QUERY.value.trim() !== '') location.pathname = `Pokemon/${$QUERY.value.trim().toLowerCase()}`;
})


document.addEventListener('keydown', e => { 
    if ( e.keyCode === 13 ) if ($QUERY.value.trim() !== '') location.pathname = `Pokemon/${$QUERY.value.trim().toLowerCase()}`;
})
export default './header.js'