import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "bootstrap/dist/css/bootstrap.css";
import "../../../css/styles.css";
import Loading from "../../Loading";
import { HubConnectionBuilder } from "@microsoft/signalr";

function BedrijfChatPagina() {
  const [chats, setChats] = useState([]);
  const [connectionState, setConnectionState] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [errorBericht, setErrorBericht] = useState();
  const [error, setError] = useState();
  // const [gekozenChat, setGekozenChat] = useState();
  const [berichten, setBerichten] = useState([]);
  const [isLoadingChatLijst, setIsLoadingChatLijst] = useState(true);
  const [invoerTekst, setInvoerTekst] = useState("");
  const [chatGekozen, setChatGekozen] = useState(false);
  const [gekozenChat, setGekozenChat] = useState();
  var url = '';
  if (process.env.NODE_ENV === 'development') {
    url = "https://localhost:5000";
  }
  else {
    url = "https://accessibility-backend.azurewebsites.net"
  }
  useEffect(() => {
    const getChats = async () => {
      try {
        const result = await axiosPrivate.get("/api/chat");
        console.log(result.data);
        setChats(result.data);
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

  

  useEffect(() => {
    console.log("Chat is nu: " + gekozenChat);
    
    const joinRoom = async (roomName) => {
      if (connectionState?.connectionId) {
        try {
          await axiosPrivate.post(`/api/chat/joinroom/${connectionState.connectionId}/${roomName}`, null);
        }
        catch (err) {
          console.log(err);
        }
      }
      else {
        console.log("GEEN CONNECTIONID");
      }
    }
    if(gekozenChat) {
      joinRoom(gekozenChat.toString());
    }
  },[gekozenChat, axiosPrivate, connectionState])



  const updateBericht = (bericht) => {
    console.log(berichten);
      if (!berichten.some(existingBericht => existingBericht.id === bericht.id)) {
    setBerichten((prevBerichten) => [...prevBerichten, bericht]);
  }
  }

  const getBerichten = async (gekozenId) => {
      try {
      setGekozenChat(gekozenId);
      // setIsLoadingBerichten(true);
      const result = await axiosPrivate.get(`api/chat/bericht/${gekozenId}`);
      setBerichten(result.data);

      if (gekozenId !== gekozenChat && connectionState) {
        connectionState.off("ReceiveMessage");
        // Close the existing connection
        await connectionState.stop();
        setConnectionState(null);
      }
      const connection = new HubConnectionBuilder()
      .withUrl(url+"/chat")
      // .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

      connection.on("ReceiveMessage", updateBericht)
      await connection.start();
      
      //dit maakt connectie ding
      setConnectionState(connection);

      console.log("gekozen chat in getberichten: " + gekozenChat + " gekozen id: " + gekozenId + " berichten: " + JSON.stringify(berichten));
      setChatGekozen(true);
    } catch (err) {
      console.log(err);
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
    console.log();
    if (invoerTekst !== "") {
      try {
        // const result = await axiosPrivate.post(`api/chat/bericht`, {
        //   ChatId: gekozenChat,
        //   Tekst: invoerTekst
        // });
        await axiosPrivate.post(`api/chat/SendMessage`, {
          ChatId: gekozenChat, 
          Tekst: invoerTekst
          
        });
        getBerichten(gekozenChat);
        console.log("MESSAGE SENT!!");
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
  }
  return (
    <>
      <h1 className="text-center">Chat met Ervaringsdeskundige</h1>
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

export default BedrijfChatPagina;
