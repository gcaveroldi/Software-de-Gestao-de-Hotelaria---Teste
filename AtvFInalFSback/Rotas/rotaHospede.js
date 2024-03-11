import {Router} from "express";
import HospedeCtrl from "../Controle/HospedeCtrl.js";

const rotaHospede = new Router();
const hospedesBD = new HospedeCtrl();

rotaHospede.post('/', hospedesBD.gravar)
.put('/', hospedesBD.atualizar)
.delete('/:cpf', hospedesBD.excluir)
.get('/', hospedesBD.consultar);


export default rotaHospede;