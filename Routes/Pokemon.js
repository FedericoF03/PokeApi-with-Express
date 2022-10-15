import  express  from "express";
import getPokemon from "../Controllers/getpoke.js";

const Router = express.Router()

Router
    .get('/pokemon/:poke', async (req, res) => {
        let locals = await getPokemon(req.params.poke);
        res.render('Pokemon', locals)
    })


export default Router