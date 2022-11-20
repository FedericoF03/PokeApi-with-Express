
let $conteiner = document.getElementById('conteiner')

const fav = ($text, img, conteinerLength) => {
    let nameToSave = $text,
    text = document.createElement('p')
    nameToSave = nameToSave.split('/');
    text.classList.add('fav')
    
    let id = nameToSave[1].split('N°'),
        arrayPoke = [],
        pokemon = { name : nameToSave[0], id : id[1], img: img.src }

    if($conteiner.children.length < conteinerLength) {
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
    
}

export default fav 