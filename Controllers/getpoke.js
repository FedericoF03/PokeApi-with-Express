import fetch from "node-fetch"

const getPokemon = async (pokemon) => {
        let resData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`),
        getData = await resData.json(),
        specieData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${getData.species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '')}`),
        getSpecie = await specieData.json(),
        evoSpecie = { 
            'rate': getSpecie.capture_rate,
            'description':getSpecie.flavor_text_entries[0].flavor_text,
            'varierities': getSpecie.varieties,
            'habitat': getSpecie.habitat !== null ? getSpecie.habitat.name : 'Unknown',
            'legendary': getSpecie.is_legendary,
            'legendary': getSpecie.is_mythical
        },
        evoChain = [];
        if (getSpecie.evolution_chain !== null) {
         
            let resChain = await fetch(getSpecie.evolution_chain.url),
            getChain = await resChain.json(),
            evoData = getChain.chain;
            do {
              evoChain.push({species_name: evoData.species.name, img: evoData.species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '')} );
              evoData = evoData['evolves_to'][0];
              
            } while (evoData && evoData.hasOwnProperty('evolves_to'));
        } else {
            evoChain = null;
        }
    return {getData, evoChain, evoSpecie}   
}

export default getPokemon
