import Hospedes from "../Modelo/Hospedes.js";
import conectar from "./Conexao.js";


export default class HospedesBD{

    async incluir(hospede){

        if (hospede instanceof Hospedes){
            const { cpf, nome, email, dateNasc, cidade, estado, cep, telefones } = hospede;
            const conexao = await conectar();
            const sql="INSERT INTO hospedes(cpf, nome, dataNasc, cidade, estado, cep, telefones, email) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
            const valores = [cpf, nome, dateNasc, cidade, estado, cep, JSON.stringify(telefones), email];
            await conexao.query(sql,valores);
        }

    }
    async alterar(hospede){

        if (hospede instanceof Hospedes){
            const { cpf, nome, email, dateNasc, cidade, estado, cep, telefones } = hospede;
            const conexao = await conectar();
            const sql="UPDATE hospedes SET nome=?,dataNasc=?,cidade=?,estado=?,cep=?, telefones=?, email=? WHERE cpf=?";
            const valores = [nome, dateNasc, cidade, estado, cep, JSON.stringify(telefones), email, cpf];
            await conexao.query(sql,valores);
           
        }

    }
    async excluir(hospede){

        if (hospede instanceof Hospedes){
            const conexao = await conectar();
            const sql="DELETE FROM hospedes WHERE cpf=?";
            const valores = [hospede.cpf];
            await conexao.query(sql,valores);
        }

    }
    async consultar(termo){
        const conexao = await conectar();
        const sql = "SELECT * FROM hospedes WHERE nome LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        const listaHospede = [];
        for(const row of rows){
            const hospede = new Hospedes(row['cpf'],row['nome'],row['dataNasc'],row['cidade'],row['estado'],row['cep'], row['telefones'], row['email']);
            listaHospede.push(hospede);
        }
        return listaHospede;
    }
}