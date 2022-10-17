import express from 'express'
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename),
    Router = express.Router();

Router.get('/', (req, res) => res.sendFile( 'Home.html', { root: path.join(__dirname, '../Public/Views/') } ) )

export default Router