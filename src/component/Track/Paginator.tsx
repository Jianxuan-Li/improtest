import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { searchTracks } from "../../libs/spotifyTrackUtils";

type PaginatorProps = {
  onPageChange: (tracks: SpotifyApi.TrackObjectFull[]) => void;
  total: number;
};

export default function PaginationRounded({
  onPageChange,
  total,
}: PaginatorProps) {
  const [currentTotal, setCurrentTotal] = React.useState(total);
  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get("q");
    if (!keyword) return;

    const offset = (value - 1) * 10;
    const tracks = await searchTracks(keyword, offset);
    onPageChange(tracks.tracks.items);
    setCurrentTotal(tracks.tracks.total);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(currentTotal / 10)}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />
    </Stack>
  );
}
