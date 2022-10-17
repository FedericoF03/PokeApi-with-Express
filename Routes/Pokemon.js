import  express  from "express";
import {getPokemon} from "../Model/PokemonsApiModel.js";

const Router = express.Router()

Router
    .get('/pokemon/:poke', async (req, res) => {
        let locals = await getPokemon(req.params.poke);
        res.render('Pokemon', locals)
    })
    .get('/test',(req, res) => {
        let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        console.log(ip)
        res.send('sdus')
    })

export default Router