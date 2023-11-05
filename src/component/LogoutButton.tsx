import React from "react";
import { Button } from "@mui/material";

export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("code");
    localStorage.removeItem("code_verifier");
    window.location.href = "/";
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
