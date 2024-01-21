import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "bootstrap/dist/css/bootstrap.css";
import "../../../css/styles.css";
import Loading from "../../Loading";

function ErvaringsdeskundigeChatPagina() {
  const [chats, setChats] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [errorBericht, setErrorBericht] = useState();
  const [error, setError] = useState();
  // const [gekozenChat, setGekozenChat] = useState();
  const [berichten, setBerichten] = useState([]);
  const [isLoadingChatLijst, setIsLoadingChatLijst] = useState(true);
  const [invoerTekst, setInvoerTekst] = useState("");
  const [chatGekozen, setChatGekozen] = useState(false);
  const [gekozenChat, setGekozenChat] = useState();
  useEffect(() => {
    const getChats = async () => {
      try {
        const result = await axiosPrivate.get("/api/chat");
        setChats(result.data);
        console.log(result);
      } catch (err) {
        if (err?.request?.response) {
          setErrorBericht(JSON.parse(err?.request?.response)?.message);
        } else {
          setErrorBericht(JSON.stringify(err?.message));
        }
        setError(true);
      }
      finally {
        setIsLoadingChatLijst(false);
      }
    };
    getChats();
  }, [axiosPrivate]);

  const getBerichten = async (gekozenId) => {
    setGekozenChat(gekozenId);
    try {
      // setIsLoadingBerichten(true);
      const result = await axiosPrivate.get(`api/chat/bericht/${gekozenId}`);
      setBerichten(result.data);
      setChatGekozen(true);
      console.log(result);
    } catch (err) {
      if (err?.request?.response) {
        setErrorBericht(err?.request?.response?.message);
      } else {
        setErrorBericht(JSON.stringify(err?.message));
      }
      setError(true);
    }
    // finally {
    //   setIsLoadingBerichten(false);
    // }
  }

  const chatElementen = chats.map((chat) => {
    return (
      <button key={chat.id} className="chat" onClick={() => getBerichten(chat.id)}>
        {chat?.gebruikers[0]?.email}
      </button>
    );
  });

  const berichtElementen = berichten.map((bericht) => {
    return (
      <div className="bericht" key={bericht.id}>
      <header>{bericht?.verzender?.email}:</header>
      <p>{bericht?.tekst}</p>
      <footer>| {bericht?.tijdstempel}</footer>
  </div>
    );
  });

  const verzendBericht = async () => {
    try {
      console.log("verzend gekozen: " + gekozenChat);
      const result = await axiosPrivate.post(`api/chat/bericht`, {
        ChatId: gekozenChat,
        Tekst: invoerTekst
      });
      getBerichten(gekozenChat);
      console.log(result);
    } catch (err) {
      if (err?.request?.response) {
        setErrorBericht(err?.request?.response?.message);
      } else {
        setErrorBericht(JSON.stringify(err?.message));
      }
      setError(true);
    }
    finally {
      setInvoerTekst("");
    }
  }
  return (
    <>
      <h1 className="text-center">Chat met bedrijven</h1>
      <p
        className={error ? "text-danger" : "buitenscherm"}
        tabIndex={0}
        aria-live="assertive"
      >
        Foutmelding: {errorBericht}
      </p>
      <div className="chat-container">
        <div className="chat-lijstje">
        <Loading isLoading={isLoadingChatLijst}>
            <div className="chats">
              {chats.length !== 0 ? chatElementen : <p>Geen chats...</p>}
            </div>
            </Loading>
            <Link to="maak" className="maak-chat-knop btn btn-success">Maak chat aan!</Link>
        </div>
       
        <div className="chat-kolom">
      
          <div className="berichten">
            {berichten.length !== 0 ? berichtElementen : <p>Geen berichten/Geen chat geklikt</p>}
          </div>
          <div className="chat-input">
            <input type="text" className="bericht-input" placeholder="voorbeeld bericht" value={invoerTekst} onChange={(e) => setInvoerTekst(e.target.value)}/>
            <button className="bericht-verzenden-knop" onClick={verzendBericht} disabled={!chatGekozen}>Verzend</button>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default ErvaringsdeskundigeChatPagina;
