import { Pokemon, DetailPokemon } from './Schemas.js'

export class PokemonModel{

    getAllMongo = async (offset, limit) => {
        let result = await Pokemon.find({});
        if (result.length <= 0) return result = null;
        let count = result.length - 1;
        limit = parseInt(offset) + parseInt(limit);
        result = result.slice(offset, limit);
        return {
            result,
            count
        }
    }

    getCountMongo = async () => {
        let result = await Pokemon.count({})
        return result
    }
    getTypeMongo = async (type, offset, limit) => {
        let result = await Pokemon.find( { types: { $elemMatch: { _type: { name: type } } } } );
        if (result.length <= 0) return result = null;
        let count = result.length - 1;
        limit = parseInt(offset) + parseInt(limit);
        result = result.slice(offset, limit);
        return {
            result,
            count
        }
    }

    saveMongo = async (form, count) => {
       const pokemon = new Pokemon({
            name: form.pokemoName,
            height: form.height,
            weight: form.weight,
            sprites: {
                front_default: form.sprites[0].trim(),
                front_shiny: form.sprites[1].trim(),
                back_default: form.sprites[2].trim() !== ''? form.sprites[2] : null,
                back_shiny: form.sprites[3].trim() !== ''? form.sprites[3] : null
            },
            types: [],
            stats: [ {base_stat: form.stats[0], stat: { name: 'hp'}},
                { base_stat: form.stats[1], stat: { name: 'attack'}},
                { base_stat: form.stats[2], stat: { name: 'defense'}},
                { base_stat: form.stats[3], stat: { name: 'special-attack'}},
                { base_stat: form.stats[4], stat: { name: 'special-defense'}},
                { base_stat: form.stats[5], stat: { name: 'speed'}},
            ],
            abilities: [],
            moves: [],
            id: parseInt(count) + 1,
            id_chain: []
        });

        form.types = form.types.filter(type => type.trim() !== '');
        pokemon.types = form.types.map( element => { return { _type: { name: element } } } );
       
        if(Array.isArray(form.abilities)) {
            let obj;
            pokemon.abilities = form.abilities
                .filter( ability => ability.trim() !== '')
                .map( (element, index) => obj = { 
                    ability: { name: element }, 
                    is_hidden: form.ability[index] === 'Ability Ocult' 
                    ? true
                    : false 
                });     
        } else pokemon.abilities.push( { 
            ability: { name: form.abilities }, 
            is_hidden: form.ability === 'Ability Ocult' 
            ? true 
            : false });

        if(Array.isArray(form.moves)) {
            let obj;
            pokemon.moves = form.moves
                .filter( move => move.trim() !== '')
                .map( element => obj = { move: { name: element } });
        } else pokemon.moves.push({ move: { name: form.moves } });
        
        if(Array.isArray(form.evoChainName)) {
            let obj;
            pokemon.id_chain = form.evoChainName
                .filter( name => name.trim() !== '')
                .map( element => obj = { name: element });
        } else pokemon.id_chain.push({ name: form.evoChainName });  

        const result = await pokemon.save();
        return result
    }

    findOneMongo = async (nameOrId) => {
        const result = await Pokemon.findOne( {$or: [{name: nameOrId}, {id: nameOrId}]} );
        return result
    }
}

export class DetailModel {
    
    saveMongo = async (form, count) => {
       const detailPokemon = new DetailPokemon({
            id: parseInt(count) + 1,
            name: form.pokemoName,
            rate: form.rate,
            description: form.description,
            varierities: [],
            habitat: { name: form.habitat.trim() !== '' ? form.habitat : null  },
            legendary: form.legendary === 'on' ? true : false,
            mythical: form.mythical === 'on' ? true : false
        });

        if(Array.isArray(form.varierities)) {
            let obj;
            detailPokemon.varierities = form.varierities
                .filter( varierity => varierity.trim() !== '')
                .map( element => obj = { 
                    is_default: element === form.pokemoName? true : false, 
                    pokemon: { name: element } });
        } else detailPokemon.varierities.push({ 
            is_default: form.varierities === form.pokemoName? true : false, 
            pokemon: { name: form.varierities } });
        const result = await detailPokemon.save();
        return result
    }

    findOneMongo = async (nameOrId) => {
        const result = await DetailPokemon.findOne( {$or: [{name: nameOrId}, {id: nameOrId}]} );
        return result
    }
}