const hiddenOrder = document.getElementById('hiddenOrder'),
selectOrder = document.getElementById('selectOrder'),
selectMode = document.getElementById('selectMode'),
selectType = document.getElementById('selectType'),
hiddenLimit = document.getElementById('hiddenLimit'),
hiddenOffset = document.getElementById('hiddenOffset'),
form = document.getElementById('createForm'),
arrow = document.getElementById('arrow'),
cont = document.getElementById('conteiner'),
search = document.getElementById('inputSearch'),
query = document.getElementById('searchPokemon'),
shiny = document.getElementById('shiny'),
imgPoke = document.getElementById('imgPoke'),
info = document.getElementById('info'),
modalDisplay = document.getElementById('modal'),
favInput = document.getElementById('fav');

document.addEventListener('click', e => {

    if(e.target.id === 'click') {
        hiddenLimit.value = e.target.textContent;
        hiddenOffset.value = 0;
        form.submit();
    }

    if (e.target === search) { 
        if (query.value.trim() !== '') location.pathname = `Pokemon/${query.value.trim().toLowerCase()}`};

    if (e.target === arrow) cont.scrollTop = 0;

    if (e.target.id === 'pag') {
        hiddenOffset.value = e.target.value;
        form.submit();
    }   
        
    if (e.target.id === 'shiny') {
        let routeShiny = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/',
            routeNormal = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/';

        let change = imgPoke.src.includes(routeShiny) ? imgPoke.src.replace(routeShiny, routeNormal) : imgPoke.src.replace(routeNormal, routeShiny)
        imgPoke.src = change
    }
   
    if(e.target.id === 'info' || e.target.id === 'modal' ) {
        modalDisplay.style.display == 'flex' ? modalDisplay.style.display = 'none' :  modalDisplay.style.display = 'flex'
    }

    if(e.target.id === 'fav' ) {
        let text = document.getElementById('namePoke').textContent;
        text = text.split('/');
        let number = text[1].split('N°'),
            si = [],
            pokemon = { name : text[0], id : number[1] }

        if (localStorage.getItem('fav') !== null) {
            let lel = JSON.parse(localStorage.getItem('fav'));
            lel.push(pokemon)
            lel = JSON.stringify(lel)
            localStorage.setItem('fav', lel )
        } else {
            si.push(pokemon)
            si = JSON.stringify(si)
            localStorage.setItem('fav', si )
        }
        let lol = localStorage.getItem('fav')
        console.log(JSON.parse(lol))
       
    }
})

document.addEventListener('change', e => {

    if (e.target === selectMode) location.href = e.target.value;
    
    if (e.target === selectOrder) {
        hiddenOrder.value = e.target.value;
        form.submit();
    }

    if (e.target === selectType) location.pathname = `/${e.target.value}`; 
})

cont.addEventListener('scroll', () => { 
    if (cont.scrollTop > 500) arrow.style.display = 'block';
    if (cont.scrollTop < 10) arrow.style.display = 'none';
})

document.addEventListener('keydown', e => { 
    if ( e.keyCode === 13 ) if (query.value.trim() !== '') location.href = `Pokemon/${query.value.trim().toLowerCase()}`;
})

