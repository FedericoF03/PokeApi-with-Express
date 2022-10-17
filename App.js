import express from 'express'
import morgan from 'morgan';
import path from 'path'
import {fileURLToPath} from 'url';
import homeRoute from './Routes/Home.js'
import pokedexRoute from './Routes/Pokedex.js'
import PokemonRoute from './Routes/Pokemon.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

app
    .set('view engine', 'pug')
    .set('views', path.join(__dirname, '/Public/views'))
    .set('trust proxy', true)
    .use(morgan('dev'))
    .use(homeRoute)
    .use(pokedexRoute)
    .use(PokemonRoute)
    
    .use(express.static(path.join(__dirname, '/')))
app.listen(3000)