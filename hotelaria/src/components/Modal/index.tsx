import { format, isValid, parseISO } from "date-fns";
import { Key } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LuPencilRuler } from "react-icons/lu";
import { InputsRegister } from "../../page/RegisterGuest";
import { deleteGuest, getAll } from "../../api";

type ModalProps = {
    tableBody: InputsRegister[];
    setModal: (modal: boolean) => void;
    setGuestAll: (guest: InputsRegister) => void;
    setInitialValues: (initialValues: InputsRegister) => void;
};

export function Modal({ tableBody, setModal, setGuestAll, setInitialValues }: ModalProps){
    const tableHead = ["Cpf", "Nome", "Data Nascimento", "Cidade", "Estado", "Cep", "Telefones", "Email", "Editar", "Deletar"];

    return (
        <div className="w-screen h-screen fixed inset-0 flex items-center justify-center bg-modal">
            <div className="w-11/12 h-5/6 flex flex-col gap-4 bg-white rounded-lg px-8">
                <header className="w-full h-auto flex items-center justify-between mx-auto py-2 text-black">
                    <h1 className="text-2xl font-bold">Registro de Hóspedes</h1>

                    <IoMdClose className="w-8 h-8 cursor-pointer" onClick={() => setModal(false)} />
                </header>

                <table className="w-full h-auto table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            {tableHead.map((head: string, index: Key) => (
                                <th className="px-4 py-2 text-black" key={index}>{head}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {Array.isArray(tableBody) && tableBody?.map((row, rowIndex) => (
                            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                {Object.values(row)?.map((cell: string | number, cellIndex: Key) => (
                                    <>
                                        {isValid(parseISO(cell)) ? (
                                            <td className="text-black border px-4 py-2" key={cellIndex}>{format(parseISO(cell), "dd/MM/yyyy")}</td>
                                        ) : Array.isArray(cell) ? (
                                            <td className="h-full flex flex-col items-center justify-center text-black group relative py-2 border">
                                                <CiMenuKebab className="w-8 h-8 cursor-pointer" />

                                                <div className="w-fill-available h-max hidden group-hover:flex flex-col absolute bottom-0 bg-white top-full shadow-lg z-50 text-center">
                                                    {cell?.map((cell: string, index: Key) => (
                                                        <span className="w-auto py-1 border" key={`phones-span-${index}`}>
                                                            {cell}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                        ) : (
                                            <td className="text-black border px-4 py-2" key={cellIndex}>{cell}</td>
                                        )}
                                    </>
                                ))}

                                <td className="text-black border px-4 py-2">
                                    <LuPencilRuler className="w-7 h-7 mx-auto cursor-pointer" onClick={() => editGuest(row)} />
                                </td>

                                <td className="text-black border px-4 py-2">
                                    <FaRegTrashAlt className="w-7 h-7 mx-auto cursor-pointer" onClick={() => deleteGuestModal(row)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    function editGuest(guest: InputsRegister){
        const { ...rest } = guest;
        const editGuestRegister = {
            ...rest,
            edit: 1,
        }
        setInitialValues(editGuestRegister);
        setModal(false);
    }

    async function deleteGuestModal(guest: InputsRegister){
        if(window.confirm(`Quer mesmo deletar o hóspede ${guest.nome}`)){
            const message = await deleteGuest(guest);

            if(message.status){
                const getAllRegister = await getAll();

                setGuestAll(getAllRegister);
            }

            toastMessageLogin(message);
        }
    }

    function toastMessageLogin(message: { status: boolean, message: string} | AxiosError) {
        const toastMessage = {
          message: message.status ? message.mensagem : "Erro ao cadastrar excluir Hóspede",
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
