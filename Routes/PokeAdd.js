import express  from "express";
import { DetailController, PokemonController } from "../Controllers/PokemonControllers.js";
import geType from '../Model/TypesController.js';
import fetch from 'node-fetch';
const Router = express.Router();

Router 
    .get('/PokemonAdd', async (req, res) => {
        let locals = { types: await geType() }
        res.render('Add', locals)
    })
    .use(express.urlencoded({extended: true}))
    .post('/PokemonAdd', async (req, res) => {
       let getCountApi = await fetch('https://pokeapi.co/api/v2/pokemon?limit=0&offset=0'),
            resCountApi = await getCountApi.json(),
            getTheLastPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=0&offset=${resCountApi.count - 1}`),
            resTheLastPokemon = await getTheLastPokemon.json(),
            getCount = await fetch(resTheLastPokemon.results[0].url),
            resCount = await getCount.json(),
            countDb = await PokemonController.countController(),
            count = countDb + parseInt(resCount.id),
            body = req.body,
            pokemon = null,
            detail = null;
        try {
            pokemon = await PokemonController.saveOneController({body, count})
            detail = await DetailController.saveOneController({body, count})
        } catch (error) {
            let locals = {
                error: error,
                code: error.code,
                keyValue: JSON.stringify(error.keyValue),
                message: 'Error for duplicate key'
            }
            if(error.code === 11000) return res.render('404', locals)    
        } finally {
            let locals = {
                pokemon,
                detail
            }
        return res.render('great', locals)
        }                   
    });

export default Router