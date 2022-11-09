import { PokemonModel, DetailModel } from "../Model/PokeMongoModel.js";

export class PokemonController {

    static getAllController = async (offset = 0, limit = 20) => {
        const pokemon = new PokemonModel,
        result = await pokemon.getAllMongo(offset,limit);
        return result
    }

    static getAllTypes = async (type, offset= 0, limit = 20) => {
        const pokemon = new PokemonModel,
        result = await pokemon.getTypeMongo(type, offset, limit);
        return result
    }

    static saveOneController = async (formData) => {
        const pokemon = new PokemonModel,
        result = await pokemon.saveMongo(formData.body, formData.count);
        return result
    }

    static findOneController = async (query) => {
        const pokemon = new PokemonModel,
        result = await pokemon.findOneMongo(query);
        return result
    }

    static countController = async () => {
        const pokemon = new PokemonModel,
        result = await pokemon.getCountMongo();
        return result
    }
}

export class DetailController {
    static saveOneController = async (formData) => {
        const detail = new DetailModel,
        result = await detail.saveMongo(formData.body, formData.count);
        return result
    }

    static findOneController = async (query) => {
        const detail = new DetailModel,
        result = await detail.findOneMongo(query);
        return result
    }
}