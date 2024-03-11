import HospedesBD from "../Persistencia/hospedesBD.js";

export default class Hospedes{

    #cpf;
    #nome;
    #dateNasc;
    #cidade;
    #estado;
    #cep;
    #telefones;
    #email;

    
    constructor(cpf, nome, dateNasc, cidade, estado, cep, telefones, email){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dateNasc = dateNasc;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#cep = cep;
        this.#telefones = telefones;
        this.#email = email;

    }

    get cpf(){
        return this.#cpf;
    }
    set cpf(novoCpf){
        if(novoCpf != "")
            this.#cpf = novoCpf;
    }
    get nome(){
        return this.#nome;
    }
    set nome(novoNome){
        if(novoNome != "")
            this.#nome = novoNome;
    }
    get dateNasc(){
        return this.#dateNasc;
    }
    set dateNasc(novadateNasc){
        this.#dateNasc = novadateNasc;
    }
    get cidade(){
        return this.#cidade;
    }
    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }
    get estado(){
        return this.#estado;
    }
    set estado(novoEstado){
        this.#estado = novoEstado;
    }
    get cep(){
        return this.#cep;
    }
    set cep(novoCep){
        this.#cep = novoCep;
    }
    get telefones(){
        return this.#telefones;
    }
    set telefones(novoTelefones){
        this.#telefones = novoTelefones;
    }
    get email(){
        return this.#email;
    }
    set email(novoEmail){
        this.#email = novoEmail;
    }

    toJSON(){
        return{
            "cpf"     : this.#cpf,
            "nome"    : this.#nome,
            "dateNasc": this.#dateNasc,
            "cidade"  : this.#cidade,
            "estado"  : this.#estado,
            "cep"     : this.#cep,
            "telefones": this.#telefones,
            "email"   : this.#email,
        }
    }
    async gravar(register){
        const hospedesBD = new HospedesBD();
        await hospedesBD.incluir(register);
    }

    async atualizar(register){
        const hospedesBD = new HospedesBD();
        await hospedesBD.alterar(register);
    }

    async removerBanco(register){
        const hospedesBD = new HospedesBD();
        await hospedesBD.excluir(register);
    }

    async consultar(){
        const hospedesBD = new HospedesBD();
        const hospede = await hospedesBD.consultar("");
        return hospede;
    }
  
}