import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "bootstrap/dist/css/bootstrap.css";
import "../../../css/styles.css";

function ErvaringsdeskundigeChatPagina() {
  const [chats, setChats] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [bericht, setBericht] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const getChats = async () => {
      try {
        const result = await axiosPrivate.get("/api/chat");
        setChats(result.data);
        console.log(result);
      } catch (err) {
        if (err?.request?.response) {
          setBericht(JSON.parse(err?.request?.response)?.message);
        } else {
          setBericht(JSON.stringify(err?.message));
        }
        setError(true);
      }
    };
    getChats();
  }, [axiosPrivate]);

  const chatElementen = chats.map((chat) => {
    return (
      <button key={chat.id} className="chat">
        {chat?.gebruikers[0]?.email}
      </button>
    );
  });
  return (
    <>
      <h1 className="text-center">Chat met bedrijven</h1>
      <p
        className={error ? "text-danger" : "buitenscherm"}
        tabIndex={0}
        aria-live="assertive"
      >
        Foutmelding: {bericht}
      </p>
      <div className="chat-container">
        <div className="chat-lijstje">
            <div className="chats">
            {chats.length !== 0 ? chatElementen : <p>Geen chats...</p>}
            </div>
            <Link to="maak" className="maak-chat-knop btn btn-success">Maak chat aan!</Link>
        </div>
        <div className="chat-kolom">
          <div className="berichten">
            <div className="bericht">
                <header>Justin@gmail.com:</header>
                <p>Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test</p>
                <footer>| 24-12-03 14:23</footer>
            </div>
            <div className="bericht">
                <header>Justin@gmail.com:</header>
                <p>Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test</p>
                <footer>| 24-12-03 14:23</footer>
            </div>
            <div className="bericht">
                <header>Justin@gmail.com:</header>
                <p>Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test</p>
                <footer>| 24-12-03 14:23</footer>
            </div>
            <div className="bericht">
                <header>Justin@gmail.com:</header>
                <p>Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test</p>
                <footer>| 24-12-03 14:23</footer>
            </div>
          </div>
          <div className="chat-input">
            <input type="text" className="bericht-input" placeholder="voorbeeld bericht"/>
            <button className="bericht-verzenden-knop">Verzend</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErvaringsdeskundigeChatPagina;
