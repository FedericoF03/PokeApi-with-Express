import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import homeRoute from './Routes/Home.js'
import pokedexRoute from './Routes/Pokedex.js'
const app = express()

app
    .use(homeRoute)
    .use(pokedexRoute)
    .use(express.static(path.join(__dirname, '/')))
app.listen(3000)