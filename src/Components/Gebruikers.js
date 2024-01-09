import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
const Gebruikers = () => {
  const [users, setUsers] = useState();
  const {userAuth} = useAuth();

  //useeffect met react.restrictmode wordt 2 keer opgeroepen voor een reden.... hierdoor geeft het een error van canceled in abortcontroller
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axios.get("api/gebruiker", {
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userAuth?.token}`}
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err?.message);
      }
    };

    if(userAuth?.token) {
      getUsers();
    }
    
    return () => {
        isMounted = false;
        controller.abort();
    }
  }, [userAuth]);
  return (
    <>
      <h1>Gebruikers lijst</h1>
      {users?.length ? (
        <ul>
          {users.map((user, key) => (
            <li key={key}>{user?.email}</li>
          ))}
        </ul>
      ) : (
        <p>Geen gebruikers??</p>
      )}
    </>
  );
};

export default Gebruikers;
