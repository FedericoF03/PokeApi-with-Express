import fetch from "node-fetch";

const geType = async () => {
  let getData = await fetch(`https://pokeapi.co/api/v2/type`),
    resData = await getData.json();
  return resData;
};

export const geTypes = async (type = "normal", offset = 0, limit = 20) => {
  let getData = await fetch(`https://pokeapi.co/api/v2/type/${type}`),
    resData = await getData.json(),
    pokemonsList = [];

  for (const value of resData.pokemon) {
    let getPokemon = await fetch(value.pokemon.url),
      resPokemon = await getPokemon.json(),
      front_default =
        resPokemon.sprites.other.home.front_default ||
        resPokemon.sprites.front_default ||
        resPokemon.sprites.other["official-artwork"].front_default;

    pokemonsList.push({
      name: resPokemon.name,
      id: resPokemon.id,
      sprites: { front_default },
    });
  }
  let count = pokemonsList.length;
  limit = parseInt(offset) + parseInt(limit);

  pokemonsList = pokemonsList.slice(offset, limit);
  return {
    pokemonsList,
    count,
    limit,
    offset,
  };
};

export default geType;
