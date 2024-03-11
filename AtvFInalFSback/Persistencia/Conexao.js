import mysql from 'mysql2/promise';

export default async function conectar(){

    if(global.conexao && global.conexao.status != "disconnected"){
        return global.conexao;
    }

    const conexao = await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"14725836",
        database:"gerenciamento_escolares" //criar o script do sql
    });

    global.conexao = conexao;

    return conexao;



    
}

