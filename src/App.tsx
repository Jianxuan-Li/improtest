import React from "react";
import styled from "@emotion/styled";
import LoginButton from "./component/LoginButton";
import LogoutButton from "./component/LogoutButton";

import { saveNewAccessToken } from "./libs/spotifyAuthUtils";
import Track from "./component/Track";

const Header = styled.header`
  background-color: #ccc;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;

  h1 {
    color: white;
    margin: 0;
  }
`;

function App() {
  const [loading, setLoading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    // check if logged in
    if (localStorage.getItem("access_token") !== null) {
      setLoggedIn(true);
      setLoading(false);
      return;
    }

    // handle redirect from spotify auth
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      localStorage.setItem("code", code);
      window.history.replaceState({}, "", "/");
      saveNewAccessToken(code).then(() => {
        setLoggedIn(true);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {!loggedIn && <LoginButton />}
      {loggedIn && (
        <>
          <Header>
            <h1>Spotify Player</h1>
            <LogoutButton />
          </Header>
          <Track />
        </>
      )}
    </>
  );
}

export default App;
