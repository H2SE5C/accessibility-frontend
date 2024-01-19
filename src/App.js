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
import BedrijfProfielPagina from "./Components/Pages/Bedrijf/BedrijfProfielPagina";
import PersistLogin from "./Components/PersistLogin";
import MaakOnderzoekPagina from "./Components/Pages/Bedrijf/MaakOnderzoekPagina";

function App() {
  return (
    <main className="app">
      <NavigatieBar />
      <div className="inhoud container">
        <Routes>
          <Route path="/" element={<BezoekerHomePagina />} />

          <Route path="/login" element={<Login />} />
          <Route path="/registreer-bedrijf" element={<RegistreerBedrijf />} />
          <Route
            path="/registreer-ervaringsdeskundige"
            element={<RegistreerErvaringsdeskundige />}
          />

          <Route element={<PersistLogin />}>
            <Route
              path="/ervaringsdeskundige"
              element={<RequireAuth allowedRoles={["Ervaringsdeskundige"]} />}
            >
              <Route
              index
                element={<ErvaringsdeskundigeHomePagina />}
              />
              <Route
                path="profiel"
                element={<ErvaringsdeskundigeProfielPagina />}
              />
            </Route>

            <Route path="/bedrijf" element={<RequireAuth allowedRoles={["Bedrijf"]} />}>
              <Route index element={<BedrijfHomePagina />} />
              <Route
                path="profiel"
                element={<BedrijfProfielPagina />}
              />
               <Route
                path="maak-onderzoek"
                element={<MaakOnderzoekPagina />}
              />
            </Route>


            <Route path="/beheerder" element={<RequireAuth allowedRoles={["Beheerder"]} />}>
              <Route index element={<BeheerderHomePagina />} />
            </Route>

            <Route path="/medewerker" element={<RequireAuth allowedRoles={["Medewerker"]} />}>
              <Route index element={<MedewerkerHomePagina />} />
            </Route>

            <Route path="*" element={<PaginaNietGevonden />} />
          </Route>
        </Routes>
      </div>
    </main>
  );
}

export default App;
