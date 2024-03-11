import Hospede from "../Modelo/Hospedes.js";
export default class HospedesCtrl{

    gravar(requisicao, resposta){
        resposta.type("application/json");

        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const { cpf, nome, email, dateNasc, cidade, estado, cep, telefones } = requisicao.body;

            if(cpf && nome && dateNasc && cidade && estado && cep && telefones && email){
                const hospede = new Hospede(cpf, nome, dateNasc, cidade, estado, cep, telefones, email);
                hospede.gravar(hospede).then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Hospede gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    });
                });
                }
                else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe todos os dados corretamente, conforme documentação da API!"
                });
                }
            }    
                else{
                resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou Hospede no formato JSON não fornecido!"
            });
        }
    }

    atualizar(requisicao, resposta){
        resposta.type("application/json");

        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const { cpf, nome, email, dateNasc, cidade, estado, cep, telefones } = requisicao.body;
            console.log(requisicao.body);
            if(cpf && nome && dateNasc && cidade && estado && cep && telefones && email)
                {
                const hospede = new Hospede(cpf, nome, dateNasc, cidade, estado, cep, telefones, email);
                hospede.atualizar(hospede).then(()=>{
                    resposta.status(200).json({
                       status:true,
                        mensagem:"Hospede atualizado com sucesso!"
                        });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                        });
                    });
                }
                else{
                    resposta.status(400).json({
                        status:false,
                        mensagem:"Informe todos os dados corretamente, conforme documentação da API!"
                    });
                }
            
            }
                else{
                    resposta.status(400).json({
                    status:false,
                    mensagem:"Método não permitido ou Hospede no formato JSON não fornecido!"
            });
        }   
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");

        if(requisicao.method === "DELETE"){
            const { cpf } = requisicao.params;
            
            if(cpf)
                {
                const hospede = new Hospede(cpf);
                    hospede.removerBanco(hospede).then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Hospede deletado com sucesso!"
                        });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                        });
                    });
                }
                else{
                    resposta.status(400).json({
                        status:false,
                        mensagem:"Informe o cpf do hospede, conforme documentação da API!"
                    });
                }
            
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido ou Hospede no formato JSON não fornecido!"
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");

        if(requisicao.method === "GET"){       
                
            const hospede = new Hospede();
            hospede.consultar('').then((hospede)=>{
                    resposta.status(200).json(hospede);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                });
            });
        }        
        
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido!"
            });
        }
    }

    
}