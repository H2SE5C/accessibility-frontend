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
import OnderzoekDetailPagina from "./Components/Pages/Medewerker/OnderzoekDetailPagina";
import BedrijfProfielPagina from "./Components/Pages/Bedrijf/BedrijfProfielPagina";
import PersistLogin from "./Components/PersistLogin";
import MaakOnderzoekPagina from "./Components/Pages/Bedrijf/MaakOnderzoekPagina";
import ErvaringsdeskundigeChatPagina from "./Components/Pages/Ervaringsdeskundige/ErvaringsdeskundigeChatPagina";
import MaakChatPagina from "./Components/Pages/Ervaringsdeskundige/MaakChatPagina";
import BedrijfChatPagina from "./Components/Pages/Bedrijf/BedrijfChatPagina";
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
              <Route
                path="chat"
                element={<ErvaringsdeskundigeChatPagina />}
              />
              <Route
                path="chat/maak"
                element={<MaakChatPagina />}
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
               <Route
                path="chat"
                element={<BedrijfChatPagina />}
              />
                <Route
                 path="onderzoek-detail/:id"
                 element={<OnderzoekDetailPagina isAanvraag={false} />}
               />

               <Route
                 path="onderzoek-wijzig/:id"
                 element={<OnderzoekVerwijzenPagina />}
               />
            </Route>


            <Route path="/beheerder" element={<RequireAuth allowedRoles={["Beheerder"]} />}>
              <Route index element={<BeheerderHomePagina />} />
            </Route>

            <Route path="/medewerker" element={<RequireAuth allowedRoles={["Medewerker"]} />}>
                 <Route index element={<MedewerkerHomePagina />} />
                    <Route path="onderzoek-aanvraag/:id" element={<OnderzoekDetailPagina isAanvraag={true} />} />
                   <Route path="onderzoek-detail/:id" element={<OnderzoekDetailPagina isAanvraag={false} />} />
                    <Route path="onderzoek-wijzig/:id" element={<OnderzoekVerwijzenPagina />} />
                            
            </Route>

            <Route path="*" element={<PaginaNietGevonden />} />
              </Route>
        </Routes>
      </div>
    </main>
  );
}

export default App;
