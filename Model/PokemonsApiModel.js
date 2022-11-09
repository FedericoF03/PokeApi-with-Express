import fetch from "node-fetch"

export default class PokeApiModel {
    getAllPokedex = async (offset = 0, limit = 20) => {
        let getPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`),
            resPokemons = await getPokemons.json(),
            pokemonsList = [];
            
        for(let pokemon of resPokemons.results) {
            let getPokemon = await fetch(pokemon.url),
                resPokemon = await getPokemon.json(),
                front_default = resPokemon.sprites.other.home.front_default || resPokemon.sprites.front_default || resPokemon.sprites.other['official-artwork'].front_default

            pokemonsList.push({
                id: resPokemon.id,
                name: resPokemon.name,
                sprites: { front_default },
                types: [...resPokemon.types]
            });
        }
        
        return {
            pokemonsList, 
            count: resPokemons.count,
            offset,
            limit
        }
    }
    
    getPokemon = async (pokemon) => { 
        const getPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        let resPokemon = null;
        if (getPokemon.status === 404) return resPokemon;
        resPokemon = await getPokemon.json();

        let getSpecieData = await fetch(resPokemon.species.url),
        reSpecieData = await getSpecieData.json(),
        front_default = resPokemon.sprites.other.home.front_default || resPokemon.sprites.front_default || resPokemon.sprites.other['official-artwork'].front_default || null,
        front_shiny = resPokemon.sprites.other.home.front_shiny || resPokemon.sprites.front_shiny || null;
        resPokemon = { 
                'id': resPokemon.id,
                'name': resPokemon.name,
                'height': resPokemon.height,
                'weight': resPokemon.weight,
                'sprites': {
                    front_default,
                    front_shiny,
                    back_default: resPokemon.sprites.back_default || null,
                    back_shiny: resPokemon.sprites.back_shiny || null
                },
                'abilities': [...resPokemon.abilities].length === 0 ? null : [...resPokemon.abilities],
                'moves': [...resPokemon.moves].length === 0 ? null : [...resPokemon.moves],
                'types': [...resPokemon.types].length === 0 ? null : [...resPokemon.types],
                'stats': [...resPokemon.stats].length === 0 ? null : [...resPokemon.stats],
                'rate': reSpecieData.capture_rate,
                'description':reSpecieData.flavor_text_entries[0].flavor_text,
                'varierities': reSpecieData.varieties,
                'habitat': { name: reSpecieData.habitat !== null ? reSpecieData.habitat.name : null},
                'legendary': reSpecieData.is_legendary,
                'mythical': reSpecieData.is_mythical,
               'evolution_chain': reSpecieData.evolution_chain === null ? null : reSpecieData.evolution_chain.url
            }
            
        return resPokemon 
    }
    
    getEvolutionChain = async (chainUrl) => {
        let evolutionList = [];
        if (chainUrl !== null ) {
            let getChain = await fetch(chainUrl),
                resChain = await getChain.json(),
                evoChainArray = resChain.chain;
    
            do {
                let pokeImg = evoChainArray.species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', "").replace('/', '');
                evolutionList.push( { name: evoChainArray.species.name, img: pokeImg, id: pokeImg } );
                evoChainArray = evoChainArray['evolves_to'][0]; 
            } while (evoChainArray && evoChainArray.hasOwnProperty('evolves_to'));

            if (evolutionList.length < 1) return evolutionList = null;
            
            return evolutionList
        } else return evolutionList = null;
    }
}

