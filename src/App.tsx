import React from "react";
import LoginButton from "./component/LoginButton";
import Header from "./component/Header";

import { saveNewAccessToken } from "./libs/spotifyAuthUtils";
import Track from "./component/Track";

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
          <Header />
          <Track />
        </>
      )}
    </>
  );
}

export default App;
