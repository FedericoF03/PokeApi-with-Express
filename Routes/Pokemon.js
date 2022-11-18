import  express  from "express";
import { DetailController, PokemonController } from "../Controllers/PokemonControllers.js";
import PokeApiController from '../Controllers/PokeApiControllers.js';

const Router = express.Router();

Router
    .get('/pokemon/:poke', async (req, res) => {
       let pokemonData = await PokeApiController.getPokeApiController(req.params.poke);
        if (pokemonData === null) {
            let evolutionList = [],
                pokemon = await PokemonController.findOneController(req.params.poke);
            if(pokemon === null) { 
                let locals = {
                    pokemonData: req.params.poke
                }
                return res.render('notFound', locals); 
            }
            let detail = await DetailController.findOneController(req.params.poke),   
                locals = {
                    pokemonData: {
                        ...pokemon._doc,
                        ...detail._doc
                    } 
                }
            for (const value of locals.pokemonData.id_chain) {
                let data = await PokemonController.findOneController(value.name) 
                evolutionList.push(data)
            }
            evolutionList.filter(element => element !== null).sort((a, b) => parseInt(a.id) - parseInt(b.id) )
            locals.pokemonData.evolution_chain = evolutionList
            return res.render('Pokemon', locals)
        }
        let chain = await PokeApiController.getEvolutionChainController(pokemonData.evolution_chain);
        pokemonData.evolution_chain = chain;
        let locals = { pokemonData }
        res.render('Pokemon', locals)
    })

export default Router