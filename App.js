import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url';
import homeRoute from './Routes/Home.js'
import pokedexRoute from './Routes/Pokedex.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

app
    .set('view engine', 'pug')
    .set('views', path.join(__dirname, '/Public/views'))
    .use(homeRoute)
    .use(pokedexRoute)
    .use(express.static(path.join(__dirname, '/')))
app.listen(3000)