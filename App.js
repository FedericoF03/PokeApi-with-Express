import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url';
import homeRoute from './Routes/Home.js'
import pokedexRoute from './Routes/Pokedex.js'
// import PokemonRoute from './Routes/Pokemon.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
const port = process.env.PORT || 3000
app
    .set('view engine', 'pug')
    .set('views', path.join(__dirname, 'Public', 'views'))
    // .set('trust proxy', true)
    // .use(morgan('dev'))
    // .use(favicon(__dirname + '/public/Assets/icon.ico'))
    .use(homeRoute)
    .use(pokedexRoute)
    // .use(PokemonRoute)
    
    .use(express.static(path.join(__dirname, '/')))
app.listen(port, () => {
    console.log(`run in the port ${port}`)
})