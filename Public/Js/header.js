let $selectMode = document.getElementById('selectMode'),
    $query = document.getElementById('searchPokemon'),
    $search = document.getElementById('inputSearch');
    
document.addEventListener('change', e => {
    if (e.target === $selectMode) {
        if(location.pathname.match('/Pokemon')) location.href = `${location.hostname}/pokedex?mode=${e.target.value}`
        else location.href = `${location.pathname}?mode=${e.target.value}`;
    }
})

document.addEventListener('click', e => {
    if (e.target === $search) if ($query.value.trim() !== '') location.pathname = `Pokemon/${$query.value.trim().toLowerCase()}`;
})


document.addEventListener('keydown', e => { 
    if ( e.keyCode === 13 ) if ($query.value.trim() !== '') location.pathname = `Pokemon/${$query.value.trim().toLowerCase()}`;
})

export default './header.js'