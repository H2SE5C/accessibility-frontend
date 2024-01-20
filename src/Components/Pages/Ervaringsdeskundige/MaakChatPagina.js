import "bootstrap/dist/css/bootstrap.css";
import "../../../css/styles.css";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Loading";
function MaakChatPagina() {
    const [bedrijven, setBedrijven] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [bericht, setBericht] = useState("");
    const [error, setError] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const [geselecteerdeBedrijf, setGeselecteerdeBedrijf] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const bedrijvenLijst = async () => {
            try {
                const response = await axiosPrivate.get('/api/bedrijf/chat/info');
                setBedrijven(response.data);
                setGeselecteerdeBedrijf(response.data[0]?.id)
                console.log(response.data[0]?.id);
            } catch (error) {
                setError(true);
                setBericht(JSON.stringify(error?.response));
                console.error("Error fetching data:", error);
            }
            finally {
                setLoading(false);
            }
        }
        bedrijvenLijst();
    },[axiosPrivate])

    const selecteerBedrijf = (event) => {
        console.log(event.target.value);
        setGeselecteerdeBedrijf(event.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosPrivate.post("api/chat", {
                AnderePersoonId: geselecteerdeBedrijf
            });
        navigate('/ervaringsdeskundige/chat');
        } catch (err) {
          console.log(err);
          if (err?.request?.response) {
            setBericht(JSON.parse(err?.request?.response)?.message);
          } else {
            setBericht(JSON.stringify(err?.message));
          }
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    return(
        <div className="container">
      <Loading isLoading={isLoading}>
          <>
            <div className="header text-center">
              <h1>Maak een chat aan met een bedrijf!</h1>
              <p className={error ? "text-danger" : "buitenscherm"} tabIndex={0} aria-live="assertive">Foutmelding: {bericht}</p>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
        <label htmlFor="bedrijf">
            Bedrijven om mee te chatten
          </label>
          <select required id="bedrijf" className="form-select" aria-label="Bedrijven om mee te chatten"
          onChange={selecteerBedrijf}
          >
          {bedrijven.map((bedrijf) => (
                            <option key={bedrijf.id} value={bedrijf.id}>
                                {bedrijf.bedrijfsnaam}
                            </option>
                        ))}
          </select>
        </div>

              <button type="submit" className="btn btn-primary mt-2">
                Maak
              </button>
            </form>
            <Link to="/ervaringsdeskundige/chat">Terug</Link>
          </>
      </Loading>
    </div>
    );
    
}

export default MaakChatPagina;