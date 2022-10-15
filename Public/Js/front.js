
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
query = document.getElementById('searchPokemon')

document.addEventListener('click', e => {

    if(e.target.id === 'click') {
        hiddenLimit.value = e.target.textContent
        hiddenOffset.value = 0
        form.submit()
    }

    if (e.target === search) { 
        if (query.value.trim() !== '') location.href = `Pokemon/${query.value.trim().toLowerCase()}`};

    if (e.target === arrow) cont.scrollTop = 0;

    if (e.target.id === 'pag') {
        hiddenOffset.value = e.target.value 
        form.submit()
    }   
})

document.addEventListener('change', e => {

    if (e.target === selectMode) location.href = e.target.value;
    
    if (e.target === selectOrder) {
        hiddenOrder.value = e.target.value
        form.submit()
    }

    if (e.target === selectType) location.href = `/${e.target.value}`; 
})

cont.addEventListener('scroll', () => { if (cont.scrollTop > 500) arrow.style.display = 'block'} )

document.addEventListener('keydown', e => { 
    if ( e.keyCode === 13 ) if (query.value.trim() !== '') location.href = `Pokemon/${query.value.trim().toLowerCase()}`;
})