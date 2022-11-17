import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import {fileURLToPath} from 'url';
import homeRoute from './Routes/Home.js';
import pokedexRoute from './Routes/Pokedex.js';
import PokemonRoute from './Routes/Pokemon.js';
import PokeAddRoute from './Routes/PokeAdd.js';
import TypesRoute from './Routes/Types.js';
import FavRoute from './Routes/Fav.js';
const __filename = fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename),
    app = express(),
    port = process.env.PORT || 3000

app
    .set('view engine', 'pug')
    .set('views', path.join(__dirname, 'Public', 'views'))
    .use(favicon(path.join(__dirname, 'Public', 'Assets', 'icon.ico')))
    .use(homeRoute)
    .use(TypesRoute)
    .use(pokedexRoute)
    .use(PokemonRoute)
    .use(PokeAddRoute)
    .use(FavRoute)
    
    
    .use(express.static(path.join(__dirname, '/')))
app.listen(port, () => {
    console.log(`run in the port ${port}`)
})