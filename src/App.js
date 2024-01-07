import NavigatieBar from "./Components/NavigatieBar";
import Inhoud from "./Components/Inhoud";
import { Route, Routes } from 'react-router-dom';
import RegistreerBedrijf from "./Components/RegistreerBedrijf";
import Login from "./Components/Login";
function App() {
    return (
        <main>
            <NavigatieBar />
            <div className="inhoud container">

                <Routes>
                    <Route path="/registreer-bedrijf" element={<RegistreerBedrijf />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
           
        </main>
  );
}

export default App;
