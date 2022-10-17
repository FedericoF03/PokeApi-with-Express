import express from 'express';
import { getAllPokemon } from '../Model/PokemonsApiModel.js';
import { geType } from '../Model/TypesModel.js';

const Router = express.Router();
    
Router
     .get('/Pokedex', async (req, res) => {
      let types = await geType(),
         pokes = await getAllPokemon(req.query.offset, req.query.limit),
         locals = { 
            allPokes: pokes.data,
            allTypes: types.results,
            limit: pokes.limit,
            offset: pokes.offset,
            count: pokes.count,
            order: req.query.order == undefined ? 'asc' : req.query.order,
            mode: req.query.mode,
            title: 'Pokedex'
         }
        res.render('Pokedex', locals)
     });

export default Router 