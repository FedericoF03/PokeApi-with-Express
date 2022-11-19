import arrow from './arrow.js'

let $templatePokemon = document.getElementById('template').content,
    $background = document.getElementById('backPoke'),
    $fragment = document.createDocumentFragment(),
    $favAnchor = document.getElementById('LinkFav'),
    $icon = document.getElementById('iconFav');

const fav = () => {
    $background.innerHTML = "";
    let pokemons = localStorage.getItem('fav');
        pokemons = JSON.parse(pokemons);

    if (pokemons !== null ) { 
        if(pokemons.length > 0) {
            pokemons.forEach( pokemon => {
                $templatePokemon.getElementById('namePoke').textContent = `${pokemon.name}/N°${pokemon.id}`
                $templatePokemon.getElementById('imgPoke').src = pokemon.img
                $templatePokemon.getElementById('imgPoke').alt = pokemon.name
                $templatePokemon.getElementById('linkPoke').href = `/pokemon/${pokemon.name}`
                let clone = document.importNode($templatePokemon, true)
                $fragment.appendChild(clone)
            });
            return $background.appendChild($fragment)     
        }    
    }

    let error = document.createElement('p');
    error.textContent = 'There are no saved favorite pokemons';
    error.classList.add('box-poke__name-poke', 'center');
    $background.appendChild(error);
}

fav();
if (location.pathname === '/Fav') $favAnchor.href = location.hostname + '/Pokedex';

document.addEventListener('click', e => {
    if(e.target.id === $icon.id) {
        let name = e.target.previousSibling.textContent.split('/'),
        pokemons = JSON.parse(localStorage.getItem('fav')),
        PokemonLength = pokemons.filter(pokemon => pokemon.name === name[0] ).length;

        if ( PokemonLength > 0) pokemons = pokemons.filter(pokemon => pokemon.name !== name[0]) 
        pokemons = JSON.stringify(pokemons)
        localStorage.setItem('fav', pokemons)
        fav()
    }
})

