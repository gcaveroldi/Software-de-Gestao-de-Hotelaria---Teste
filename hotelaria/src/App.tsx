import "./App.css";
import { Header } from "./components/Header";

export function App() {

  return (
    <> 
        <Header />
      <main className="w-full h-screen flex items-center justify-center pt-[64px] text-white main-home">
          <div className="grid gap-16 h-[58%]">
              <div className="block text-center">
                  <h1 className="text-3xl md:text-7xl font-semibold pb-1">Bem vindo ao Hotelaria</h1>
                  <h3 className="text-base md:text-xl font-medium">Suas melhores lembrança estão aqui</h3>
              </div>

              <div className="w-full h-auto md:h-32 mt-[17.5rem] md:mt-[8.5rem] bg-white text-black rounded-xl">
                  <div className="py-8 px-8">
                      <form className="w-full block gap-5 md:flex items-end justify-between">
                          <div className="grid gap-2 mb-2 md:mb-0">
                              <label>Localização</label>
                              <input type="text" placeholder="São Paulo" className="w-full md:w-[11.375rem] border border-zinc-400 outline-none py-1 px-2 rounded-lg" />
                          </div>

                          <div className="grid gap-2 mb-2 md:mb-0">
                              <label translate="no">Data de Check-In</label>
                              <input type="date" className="w-full md:w-[10.125rem] border border-zinc-400 outline-none py-1 px-2 rounded-lg" />
                          </div>

                          <div className="grid gap-2 mb-4 md:mb-0">
                              <label>Hóspedes</label>
                              <input type="number" placeholder="100" className="w-full md:w-[11.375rem] border border-zinc-400 outline-none py-1 px-2 rounded-lg" />
                          </div>

                          <button className="bg-blue-600 w-full py-[6px] md:px-4 md:py-[7px] rounded-2xl md:rounded-lg text-white md:opacity-90 hover:opacity-100">
                              Reserve agora
                          </button>
                      </form>
                  </div>
              </div>
          </div>
      </main>
    </>
  )
}
