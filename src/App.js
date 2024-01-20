import NavigatieBar from "./Components/NavigatieBar";
import { Route, Routes } from "react-router-dom";
import RegistreerBedrijf from "./Components/Pages/RegistreerBedrijf";
import RegistreerErvaringsdeskundige from "./Components/Pages/RegistreerErvaringsdeskundige";
import Login from "./Components/Pages/Login";
import BezoekerHomePagina from "./Components/Pages/BezoekerHomePagina";
import PaginaNietGevonden from "./Components/Pages/PaginaNietGevonden";
import RequireAuth from "./Components/RequireAuth";
import ErvaringsdeskundigeHomePagina from "./Components/Pages/Ervaringsdeskundige/ErvaringsdeskundigeHomePagina";
import ErvaringsdeskundigeProfielPagina from "./Components/Pages/Ervaringsdeskundige/ErvaringsdeskundigeProfielPagina";
import BedrijfHomePagina from "./Components/Pages/Bedrijf/BedrijfHomePagina";
import BeheerderHomePagina from "./Components/Pages/Beheerder/BeheerderHomePagina";
import MedewerkerHomePagina from "./Components/Pages/Medewerker/MedewerkerHomePagina";
import MedewerkerOnderzoekPagina from "./Components/Pages/Medewerker/MedewerkerOnderzoekPagina";
import BedrijfProfielPagina from "./Components/Pages/Bedrijf/BedrijfProfielPagina";
import PersistLogin from "./Components/PersistLogin";
import MaakOnderzoekPagina from "./Components/Pages/Bedrijf/MaakOnderzoekPagina";
import OnderzoekVerwijzenPagina from "./Components/Pages/Medewerker/OnderzoekVerwijzenPagina";

function App() {
    return (
        <main className="app">
            <NavigatieBar />
            <div className="inhoud container">

                <Routes>
                    <Route path="/" element={<BezoekerHomePagina />} />
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/registreer-bedrijf" element={<RegistreerBedrijf />} />
                    <Route path="/registreer-ervaringsdeskundige" element={<RegistreerErvaringsdeskundige />} />

                    <Route element={<PersistLogin/>}>
                      <Route element={<RequireAuth allowedRoles={["Ervaringsdeskundige"]}/>}>
                        <Route path="/ervaringsdeskundige" element={<ErvaringsdeskundigeHomePagina/>}/>
                        <Route path="/ervaringsdeskundige/profiel" element={<ErvaringsdeskundigeProfielPagina/>}/>
                      </Route>

                    <Route element={<RequireAuth allowedRoles={["Bedrijf"]}/>} >
                           <Route path="/bedrijf" element={<BedrijfHomePagina />} />
                           <Route path="/bedrijf/profiel" element={<BedrijfProfielPagina />} />
                           <Route path="/bedrijf/maak-onderzoek" element={<MaakOnderzoekPagina />} />
                    </Route>

                

            <Route element={<RequireAuth allowedRoles={["Beheerder"]} />}>
              <Route path="/beheerder" element={<BeheerderHomePagina />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["Medewerker"]} />}>
                    <Route path="/medewerker" element={<MedewerkerHomePagina />} />
                    <Route path="/medewerker/onderzoek-aanvraag/:id" element={<MedewerkerOnderzoekPagina isAanvraag={true} />} />
                    <Route path="/medewerker/onderzoek-detail/:id" element={<MedewerkerOnderzoekPagina isAanvraag={false} />} />
                    <Route path="/medewerker/onderzoek-wijzig/:id" element={<OnderzoekVerwijzenPagina />} />
                            
            </Route>
          </Route>

          <Route path="*" element={<PaginaNietGevonden />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
