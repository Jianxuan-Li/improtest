import React from "react";
import styled from "@emotion/styled";
import LogoutButton from "./LogoutButton";

const HeaderContainer = styled.header`
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

function Header() {
  return (
    <HeaderContainer>
      <h1>Spotify Player</h1>
      <LogoutButton />
    </HeaderContainer>
  );
}

export default Header;
