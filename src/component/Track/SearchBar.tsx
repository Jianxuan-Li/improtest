import * as React from "react";
import styled from "@emotion/styled";
import { TextField, Button } from "@mui/material";
import { searchTracks } from "../../libs/spotifyTrackUtils";

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

type SearchBarProps = {
  onSearchResult: (tracks: SpotifyApi.TrackObjectFull[]) => void;
  onTotalChanged: (total: number) => void;
  onNextChanged: (next: string | null) => void;
};

export default function SearchBar({
  onSearchResult,
  onTotalChanged,
  onNextChanged,
}: SearchBarProps) {
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState<string>("");

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchText === "") return;

    setLoading(true);
    const result = await searchTracks(searchText);
    onTotalChanged(result.tracks.total);
    onSearchResult(result.tracks.items);
    onNextChanged(result.tracks.next);
    setLoading(false);
  };

  return (
    <SearchForm onSubmit={handleSearchSubmit}>
      <TextField
        fullWidth
        label="Search for tracks"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button variant="contained" type="submit" disabled={loading}>
        Search
      </Button>
    </SearchForm>
  );
}
