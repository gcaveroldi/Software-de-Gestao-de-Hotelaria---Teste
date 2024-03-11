import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./src/App";
import { RegisterGuest } from "./src/page/RegisterGuest";

export function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/register-guest" element={<RegisterGuest />} />
            </Routes>
        </BrowserRouter>
    )
}