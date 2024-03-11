import axios from "axios"
import { InputsRegister } from "../page/RegisterGuest";

const url = "http://localhost:3334/hospede"

export function getAll(){
    const aux = axios.get(url)
        .then((response) => response.data)
        .catch((err) => err);

    return aux;
}

export function create(register: InputsRegister){
    const aux = axios.post(url, register)
        .then((response) => response.data)
        .catch((err) => err);

    return aux;
}

export function editGuest(register: InputsRegister){
    const aux = axios.put(url, register)
        .then((response) => response.data)
        .catch((err) => err);

    return aux;
}

export function deleteGuest(register: InputsRegister){
    const aux = axios.delete(`${url}/${register.cpf}`)
        .then((response) => response.data)
        .catch((err) => err);

    return aux;
}