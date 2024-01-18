import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Gebruikers = () => {
  const [users, setUsers] = useState() || {};
  const {userAuth} = useAuth() || {};
  const axiosPrivate = useAxiosPrivate();
  //useeffect met react.restrictmode wordt 2 keer opgeroepen voor een reden.... hierdoor geeft het een error van canceled in abortcontroller
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("api/gebruiker", {
          signal: controller.signal
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
  }, [userAuth, setUsers, axiosPrivate]);
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
