import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { genLoginUrl } from "../libs/spotifyAuthUtils";

export function LoginButton() {
  const handleLogin = async () => {
    window.location.href = await genLoginUrl();
  };

  return (
    <Button variant="contained" onClick={handleLogin}>
      Login by Spotify account
    </Button>
  );
}

const LoginButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function LoginButtonWithContainer() {
  return (
    <LoginButtonContainer>
      <LoginButton />
    </LoginButtonContainer>
  );
}
