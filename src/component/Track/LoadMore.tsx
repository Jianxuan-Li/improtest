import React from "react";
import { Button } from "@mui/material";

type Props = {
  onClick: () => void;
};

export default function LoadMore({ onClick }: Props) {
  const handleLoadMore = () => {
    onClick();
  };

  return (
    <Button variant="contained" onClick={handleLoadMore}>
      Load More
    </Button>
  );
}
