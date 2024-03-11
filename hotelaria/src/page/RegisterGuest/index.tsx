import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PiCardsLight } from "react-icons/pi";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod";
import { create, editGuest, getAll } from "../../api";
import { Header } from "../../components/Header";
import { Modal } from "../../components/Modal";
import "./RegisterGuest.css";
import { format, isValid, parseISO } from "date-fns";

type InputsProps = {
    nameSpan: string;
    classNameGrid: string;
    placeholder: string;
    name: string;
    type: string;
    mask?: string;
};

const schema = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").max(255, "O nome deve ter no máximo 255 caracteres"),
    email: z.string().email("Email inválido").max(255, "O email deve ter no máximo 255 caracteres"),
    cpf: z.string().min(3, "O cpf deve ter pelo menos 3 caracteres").max(14, "O CPF deve ter no máximo 14 caracteres"),
    cidade: z.string().min(3, "A cidade deve ter pelo menos 3 caracteres").max(255, "A cidade deve ter no máximo 255 caracteres"),
    estado: z.string().min(2, "O estado deve ter pelo menos 3 caracteres").max(255, "O estado deve ter no máximo 255 caracteres"),
    cep: z.string().min(9, "O cep deve ter pelo menos 3 caracteres").max(9, "O CEP deve ter no máximo 9 caracteres"),
    dateNasc: z.string().refine((val) => {
        return isValid(parseISO(val));
    }, 'Data de nascimento inválida'),
});

type SchemaType = z.infer<typeof schema>


export type InputsRegister = {
    telefones: string[],
} & SchemaType

const initialValue: InputsRegister = {
    cep: "",
    cidade: "",
    cpf: "",
    dateNasc: "",
    email: "",
    estado: "",
    nome: "",
    telefones: [],
    edit: -1,
}

export function RegisterGuest() {
    const [modal, setModal] = useState(false);
    const [guestAll, setGuestAll] = useState<InputsRegister[]>([]);
    console.log (guestAll)
    const [phones, setPhones] = useState<string[]>([""]);
    const [initialValues, setInitialValues] = useState<InputsRegister>(initialValue);
    const { register, reset, handleSubmit, formState: { errors }, setValue } = useForm<SchemaType>({
        resolver: zodResolver(schema),
        defaultValues: initialValues as (typeof schema)["_input"],
    });

    const inputs: InputsProps[] = [
        {
            nameSpan: "Nome",
            classNameGrid: "items-start",
            name: "nome",
            placeholder: "Digite seu nome",
            type: "text",
        },
        {
            nameSpan: "Email",
            classNameGrid: "items-end",
            name: "email",
            placeholder: "Digite seu email",
            type: "email",
        },
        {
            nameSpan: "CPF",
            classNameGrid: "items-start",
            name: "cpf",
            placeholder: "Digite seu CPF",
            mask: "999.999.999-99"
        },
        {
            nameSpan: "Cidade",
            classNameGrid: "items-end",
            name: "cidade",
            placeholder: "Digite sua cidade",
        },
        {
            nameSpan: "Estado",
            classNameGrid: "items-start",
            name: "estado",
            placeholder: "Digite seu estado",
        },
        {
            nameSpan: "Cep",
            classNameGrid: "items-end",
            name: "cep",
            placeholder: "Digite seu cep",
            mask: "99999-999"
        },
    ];

    useEffect(() => {
        (async () => {
            const getAllGuest = await getAll();

            setGuestAll(getAllGuest);
            console.log (initialValues)
            if (initialValues.edit !== -1) {
                Object.entries(initialValues).forEach(([key, value]) => {
                    if (key === "dateNasc") {
                        setValue('dateNasc', format(new Date(value), "yyyy-MM-dd"));
                    } else {
                        setValue(key as keyof InputsRegister, value);
                    }
                });
            
                setPhones(JSON.parse(initialValues.telefones));
            }            
        })()
    }, [initialValues]);

    return (
        <>
            <Header />
            <main className="w-full h-screen flex items-center justify-center pt-[64px] text-white main-register-guest">
                <div className="h-5/6 w-4/5 grid grid-cols-colum-register bg-white">
                    <div className="w-full h-full flex items-center justify-center text-center px-6 bg-princ">
                        <div className="w-full h-3/4 flex flex-col gap-4 items-center justify-center mb-auto">
                            <h1 className="text-xl md:text-[38px] font-semibold">Bem-vindo</h1>
                            <span className="opacity-50">
                                Agradecemos por escolher nossos serviços e estamos ansiosos para tornar a sua estadia confortável e inesquecível
                            </span>
                        </div>
                    </div>
                    <div className="w-[90%] h-full ml-auto 2xl:m-auto flex flex-col items-center justify-between gap-2 2xl:gap-6 overflow-y-auto py-2 px-4">
                        <header className="w-full h-auto flex items-center justify-between py-2 2xl:py-0">
                            <div className=""></div>

                            <div className="flex flex-col gap-1">
                                <h3 className="text-princ text-2xl font-bold">Cadastro de Hóspede</h3>
                                <span className="text-sm text-black font-semibold">Insira as informações do hóspede</span>
                            </div>

                            <PiCardsLight className="w-8 h-8 text-black cursor-pointer" onClick={() => setModal(true)} />
                        </header>

                        <form className="w-full h-min grid grid-cols-inputs-register mb-auto md:gap-y-4 2xl:gap-y-8" onSubmit={handleSubmit(submit)}>
                            {inputs.map((input: InputsProps, index: Key) => (
                                <div className={`flex flex-col gap-1 ${input.classNameGrid} justify-start text-black`} key={index}>
                                    <div className="w-4/5 text-start">
                                        <span className="font-bold">{input.nameSpan}</span>
                                    </div>

                                    <div className="w-4/5 border-2 border-princ rounded-lg py-1 2xl:py-2 px-3">
                                        {input.mask ? (
                                            <InputMask
                                                mask={input.mask}
                                                maskPlaceholder=""
                                                {...register(input.name)}
                                                placeholder={input.placeholder}
                                                className="text-sm 2xl:text-base w-full h-full outline-none border-none"
                                            />
                                        ) : (
                                            <input
                                                type={input.type}
                                                {...register(input.name)}
                                                placeholder={input.placeholder}
                                                className="text-sm 2xl:text-base w-full h-full outline-none border-none"
                                            />
                                        )}
                                    </div>

                                    <div className={`w-4/5 flex ${input.classNameGrid} justify-start`}>
                                        {errors[input.name] && <span className="text-red-600">{errors[input.name].message}</span>}
                                    </div>
                                </div>
                            ))}
                            <div className="flex flex-col gap-1 items-start">
                                <div className="w-4/5 text-start">
                                    <span className="font-bold text-black">Telefone</span>
                                </div>
                                {phones.map((phone, index) => (
                                    <div key={index} className="w-4/5 border-2 border-princ rounded-lg py-1 2xl:py-2 px-3 flex items-center">
                                        <InputMask
                                            mask="(99) 99999-9999"
                                            maskPlaceholder=""
                                            value={phone}
                                            onChange={(e) => handlePhoneChange(index, e.target.value)}
                                            className="text-sm 2xl:text-base w-full h-full outline-none border-none text-black flex-1"
                                        />
                                        <div
                                            className="text-sm 2xl:text-base text-red-600 hover:text-red-800 cursor-pointer ml-2"
                                            onClick={() => handleRemovePhone(index)}
                                        >
                                            Remover
                                        </div>
                                    </div>
                                ))}
                                <div onClick={handleAddPhone} className="text-sm 2xl:text-base text-princ hover:text-blue-600 cursor-pointer">
                                    Adicionar Telefone
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 items-end">
                                <div className="w-4/5 text-start">
                                    <span className="font-bold text-black">Data de Nascimento</span>
                                </div>
                                <div className="w-4/5 border-2 border-princ rounded-lg py-1 2xl:py-2 px-3">
                                    <input
                                        type="date"
                                        placeholder="Digite a data de nascimento"
                                        className="text-sm 2xl:text-base w-full h-full outline-none border-none text-black"
                                        { ...register("dateNasc", { required: true }) }
                                    />
                                </div>
                                
                                {errors.dateNasc &&  <span className="text-red-600">{errors.dateNasc.message}</span>}
                            </div>

                            <div className="w-full h-auto flex items-center justify-end col-span-2">
                                <button type="submit" className="border border-princ text-princ py-2 px-6 rounded-lg hover:bg-princ hover:text-white transition-all">
                                        {initialValues.edit === 1 ? "Editar" : "Cadastrar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <ToastContainer />

                {modal && (
                    <Modal tableBody={guestAll} setModal={setModal} setGuestAll={setGuestAll} setInitialValues={setInitialValues} />
                )}
            </main>
        </>
    );

    async function submit(e: SchemaType){
        const { ...rest } = e;
        let message: { status: boolean, message: string } = {
            message: "",
            status: false,
        };
        const register: InputsRegister = {
            ...rest,
            telefones: phones,
        }
        console.log (initialValues)
        if(initialValues.edit === 1){
            message = await editGuest(register);
        }
        
        else{
            message = await create(register);
        }
        reset()
        setPhones([])

        const getAllRegister = await getAll();
        setGuestAll(getAllRegister);
        setInitialValues(initialValue);
        toastMessageLogin(message);
    }

    function handleAddPhone() {
        setPhones([...phones, ""]);
    }

    function handlePhoneChange(index: number, value: string){
        const newPhones = [...phones];
        newPhones[index] = value;
        setPhones(newPhones);
    }

    function handleRemovePhone(indexToRemove: number) {
        const updatedPhones = phones.filter((_, index) => index !== indexToRemove);
        setPhones(updatedPhones);
    }

    function toastMessageLogin(message: { status: boolean, message: string} | AxiosError) {
        const toastMessage = {
          message: message.status ? message.mensagem : "Erro ao cadastrar Hóspede",
          status: message.status ? "success" : "error",
        };
    
        toast[toastMessage.status](toastMessage.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    }
}