import fetch from "node-fetch";

export const geType = async () => {
    let getData = await fetch(`https://pokeapi.co/api/v2/type`),
        resData = await getData.json();

    return resData
}