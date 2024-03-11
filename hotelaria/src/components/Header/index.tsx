import { Link } from "react-router-dom";

export function Header(){
    return (
        <header className="fixed w-full h-auto bg-white">
            <div className="flex items-center justify-between relative md:mx-16 py-4">
                <h2 className="font-bold text-2xl font-mono ml-4 md:ml-0">Hotelaria</h2>

                <ul className="absolute right-0 grid bg-white w-screen md:w-2/5 h-auto mt-[64px] pb-8 md:pb-0 md:mt-0 md:relative md:flex justify-center md:justify-between items-center text-center top-0 gap-6">
                    <div className="grid md:flex justify-center gap-4 md:gap-8 font-mono">
                        <Link to="/" className="font-semibold text-base md:text-lg">
                            <li>Home</li>
                        </Link>
                        <Link to="/register-guest" className="font-semibold text-base md:text-lg">
                            <li>Cadastro de Hóspede</li>
                        </Link>
                    </div>

                    <div>
                        <a routerLink="/login">
                            <button
                                className="bg-[#886abe] px-28 py-[4px] md:px-6 md:py-1 rounded-2xl text-white md:opacity-90 hover:opacity-100"
                                translate="no"
                                >
                                Login
                            </button>
                        </a>
                    </div>
                </ul>

                <span className="block md:hidden cursor-pointer material-symbols-outlined mr-4 md:mr-0" translate="no">
                    menu
                </span>
            </div>
        </header>
    )
}