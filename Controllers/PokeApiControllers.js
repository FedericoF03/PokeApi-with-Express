import PokeApiModel from "../Model/PokemonsApiModel.js";

export default class PokeApiController {
    
    static getAllPokeApiController = async (offset = 0, limit = 20) => {
        const pokeApiModel = new PokeApiModel,
        result = await pokeApiModel.getAllPokedex(offset, limit);
        return result
    }
    
    static getPokeApiController = async (pokemon) => {
        const pokeApiModel = new PokeApiModel,
        result = await pokeApiModel.getPokemon(pokemon);
        return result
    }

    static getEvolutionChainController = async(chainUrl) => {
        const pokeApiModel = new PokeApiModel,
        result = await pokeApiModel.getEvolutionChain(chainUrl);
        return result
    }
}