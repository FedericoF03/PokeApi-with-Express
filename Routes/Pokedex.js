import express from 'express'
import sendAllPoke, { sendType } from '../Controllers/datapoke.js';

const Router = express.Router()
    
Router
     .get('/pokedex', async (req, res) => {
      let types = await sendType(),
         pokes = await sendAllPoke(req.query.offset, req.query.limit),
         locals = { 
            allPokes: pokes.data,
            allTypes: types.results,
            limit: pokes.limit,
            offset: pokes.offset,
            count: pokes.count,
            order: req.query.order,
            mode: req.query.mode
         }
        res.render('Pokedex', locals)
     })

export default Router 