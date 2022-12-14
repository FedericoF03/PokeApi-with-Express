import express from 'express'
import geType, {geTypes} from '../Model/TypesController.js'
import { PokemonController } from '../Controllers/PokemonControllers.js'
const Router = express.Router()
Router
      .get('/types/:types', async (req, res) => {
         const types = await geType();
         let pokemons = {},
         pokemonsDb,
         count
         if(req.query.mode !== 'db') {
            pokemons = await geTypes(req.params.types, req.query.offset, req.query.limit),
            count = pokemons.count 
         }
         if(req.query.mode !== 'api') {  
           
            if(req.query.mode !== 'db') {  
               if(pokemons.pokemonsList.length < pokemons.limit) { 
                  let offset = parseInt(pokemons.offset) - parseInt(pokemons.count) 
                  if (offset < 0) offset = 0
                  pokemonsDb = await PokemonController.getAllTypes(req.params.types, offset, req.query.limit);
                  if(pokemonsDb !== null) {
                     pokemons.pokemonsList = pokemons.pokemonsList.concat(pokemonsDb.result)
                     if(pokemons.pokemonsList.length > req.query.limit) pokemons.pokemonsList.length = req.query.limit
                     count = pokemons.count + pokemonsDb.count
                  }
               }
            } else{
               pokemonsDb = await PokemonController.getAllTypes(req.params.types, req.query.offset, req.query.limit);
               if(pokemonsDb !== null) {
                  pokemons.pokemonsList = pokemonsDb.result;
                  count = pokemonsDb.count
               }
               else {
                  return res.render('null')
               }
            }      
         }
            

        let locals = { 
            allPokemons: pokemons.pokemonsList,
            allTypes: types.results,
            limit: req.query.limit == undefined ? 20 : parseInt(req.query.limit),
            offset: req.query.offset == undefined ? 0 : parseInt(req.query.offset),
            count,
            order: req.query.order == undefined ? 'asc' : req.query.order,
            mode: req.query.mode == undefined ? 'all' : req.query.mode,
            title: 'Pokedex'
         }

         if (req.query.order === 'desc') locals.allPokemons.reverse()
         if (req.query.order === 'a-z') locals.allPokemons.sort((a,b) => {
            if (a.name < b.name) return -1
            else if (a.name > b.name) return 1
            return 0
         })
         if (req.query.order === 'z-a') locals.allPokemons.sort((b,a) => {
            if (a.name < b.name) return -1
            else if (a.name > b.name) return 1
            return 0
         })
        res.render('Pokedex', locals)
    })
export default Router