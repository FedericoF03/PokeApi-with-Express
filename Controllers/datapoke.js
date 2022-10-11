import fetch from "node-fetch"

const sendAllPoke = async (offset = 0, limit = 20) => {
    let getData = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    let resData = await getData.json()
    let data = []
    for(let key of resData.results) {
        let sesData = await fetch(key.url),
            susData = await sesData.json()
        data.push({
            names: susData.name,
            sprites: [susData.sprites.other.home.front_default, susData.sprites.other.home.front_shiny],
            types: [...susData.types]
        })
    }
    
    return {
        data, 
        count: resData.count,
        offset,
        limit
    }
}

export default sendAllPoke

export const sendType = async () => {
    let getData = await fetch(`https://pokeapi.co/api/v2/type`)
    let resData = await getData.json()
    return resData
}

