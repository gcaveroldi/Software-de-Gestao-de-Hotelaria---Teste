import express from 'express';

import rotaHospede from './Rotas/rotaHospede.js';
import cors from 'cors';

const app = express();

app.use(cors({origin:"*"}));

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use('/hospede', rotaHospede);

app.listen(3334, 'localhost', ()=>{
    console.log("Backend ouvindo em http://localhost:3334")
});