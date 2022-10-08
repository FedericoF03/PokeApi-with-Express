

import fetch from 'node-fetch';
const getAllPoke = async () => {
    let data = await fetch('https://pokeapi.co/api/v2/pokemon/')
    let res = await data.json()
    return res
}

export default getAllPoke


