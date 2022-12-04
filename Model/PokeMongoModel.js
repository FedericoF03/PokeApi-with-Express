import { Pokemon, DetailPokemon } from "./Schemas.js";

export class PokemonModel {
  getAllMongo = async (offset, limit) => {
    let result = await Pokemon.find({}),
        count = result.length - 1;

    if (result.length <= 0) return (result = null);

    limit = parseInt(offset) + parseInt(limit);
    result = result.slice(offset, limit);
    return {
      result,
      count,
    };
  };

  getCountMongo = async () => {
    let result = await Pokemon.count({});
    return result;
  };

  getTypeMongo = async (type, offset, limit) => {
    let result = await Pokemon.find({
      types: { $elemMatch: { _type: { name: type } } },
    }),
      count = result.length - 1;
    if (result.length <= 0) return (result = null);
    limit = parseInt(offset) + parseInt(limit);
    result = result.slice(offset, limit);
    return {
      result,
      count,
    };
  };

  saveMongo = async ({
      height,
      weight,
      sprites,
      types,
      stats,
      ability,
      abilities,
      moves,
      pokemoName,
      evoChainName,
    }, count ) => {
    const pokemon = await new Pokemon({
      name: pokemoName,
      height: height,
      weight: weight,
      sprites: {
        front_default: sprites[0].trim(),
        front_shiny: sprites[1].trim()
      },
      types: types.map( element => ({ _type: { name: element } })),
      stats: [
        { base_stat: stats[0], stat: { name: "hp" } },
        { base_stat: stats[1], stat: { name: "attack" } },
        { base_stat: stats[2], stat: { name: "defense" } },
        { base_stat: stats[3], stat: { name: "special-attack" } },
        { base_stat: stats[4], stat: { name: "special-defense" } },
        { base_stat: stats[5], stat: { name: "speed" } },
      ],
      abilities: abilities.map( (element, index) => ({ 
          ability: { name: element },
          is_hidden: ability[index] === "Ability Ocult" ? true : false
          }) 
        ),
      moves: moves = moves.map((element) => ({ move: { name: element } })),
      id: parseInt(count) + 1,
      id_chain: evoChainName.map((element) => ({ name: element })),
    });
    return await pokemon.save();
  };

  findOneMongo = async (nameOrId) => {
    const result = await Pokemon.findOne({
      $or: [{ name: nameOrId }, { id: nameOrId }],
    });
    return result;
  };
}

export class DetailModel {
  saveMongo = async ({pokemoName, rate, description, varierities, habitat, legendary, mythical}, count) => {
    const detailPokemon = await new DetailPokemon({
      id: parseInt(count) + 1,
      name: pokemoName,
      rate: rate,
      description: description,
      varierities: varierities.map( element => ({
              is_default: element === pokemoName ? true : false,
              pokemon: { name: element },
            })
        ),
      habitat: { name: habitat.trim() !== "" ? habitat : null },
      legendary: legendary === "on" ? true : false,
      mythical: mythical === "on" ? true : false,
    });
    return await detailPokemon.save();
   
  };

  findOneMongo = async (nameOrId) => {
    const result = await DetailPokemon.findOne({
      $or: [{ name: nameOrId }, { id: nameOrId }],
    });
    return result;
  };
}
