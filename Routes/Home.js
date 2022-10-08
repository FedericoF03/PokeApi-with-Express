import express from 'express'
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Router = express.Router()
Router
    .get('/', (req, res) => {
        res.set('Content-Type', 'text/html')
        res.sendFile('Home.html', { root: path.join(__dirname, '../Public/Views/')})
    })

export default Router