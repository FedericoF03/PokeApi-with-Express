import fetch from "node-fetch"
export const getAllPokemon = async (offset = 0, limit = 20) => {
    let getPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`),
        resPokemons = await getPokemons.json(),
        data = [];

    for(let pokemon of resPokemons.results) {
        let getPokemon = await fetch(pokemon.url),
            resPokemon = await getPokemon.json()
        data.push({
            names: resPokemon.name,
            sprites: [resPokemon.sprites.other.home.front_default, resPokemon.sprites.other.home.front_shiny],
            types: [...resPokemon.types]
        })
    }
    
    return {
        data, 
        count: resPokemons.count,
        offset,
        limit
    }
}

export const getPokemon = async (pokemon) => {
        let getPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`),
        resPokemon = await getPokemon.json(),
        getSpecie = await fetch(resPokemon.species.url),
        reSpecie = await getSpecie.json(),
        specieData = { 
            'rate': reSpecie.capture_rate,
            'description':reSpecie.flavor_text_entries[0].flavor_text,
            'varierities': reSpecie.varieties,
            'habitat': reSpecie.habitat !== null ? reSpecie.habitat.name : 'Unknown',
            'legendary': reSpecie.is_legendary,
            'mythical': reSpecie.is_mythical
        },
        evoChainData = [];
   
        if (reSpecie.evolution_chain !== null) {
            let getChain = await fetch(reSpecie.evolution_chain.url),
            resChain = await getChain.json(),
            evoChainArray = resChain.chain;
            
            do {
                evoChainData.push({species_name: evoChainArray.species.name, img: evoChainArray.species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', "").replace('/','')} );
                evoChainArray = evoChainArray['evolves_to'][0]; 
                
            } while (evoChainArray && evoChainArray.hasOwnProperty('evolves_to'));

        } else evoChainData = null;
    return {resPokemon, specieData, evoChainData}   
}