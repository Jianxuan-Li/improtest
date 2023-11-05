import React from "react";
import styled from "@emotion/styled";
import { searchTracks } from "../../libs/spotifyTrackUtils";
import { get } from "../../libs/spotifyApiUtils";
import TrackCard from "./TrackCard";
import SearchBar from "./SearchBar";
import LoadMore from "./LoadMore";
import Player from "../Player";

const PageContainer = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 100px;
`;

const TrackCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const PaginatorContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function TrackIndex() {
  const [loading, setLoading] = React.useState(true);
  const [tracks, setTracks] = React.useState<SpotifyApi.TrackObjectFull[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [next, setNext] = React.useState<string | null>(null);

  const [playerTrack, setPlayerTrack] =
    React.useState<SpotifyApi.TrackObjectFull | null>(null);

  const handleLoadMore = () => {
    if (next === null || tracks.length >= total) return;
    setLoading(true);
    get(next).then((result) => {
      setTracks([...tracks, ...result.tracks.items]);
      setNext(result.tracks.next);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    searchTracks("hello").then((result) => {
      setTracks(result.tracks.items);
      setTotal(result.tracks.total);
      setNext(result.tracks.next);
      setLoading(false);
    });
  }, []);

  return (
    <PageContainer>
      <SearchBar
        onSearchResult={setTracks}
        onTotalChanged={setTotal}
        onNextChanged={setNext}
      />
      {!loading && tracks.length === 0 && <div>No tracks found</div>}
      {tracks.length > 0 && (
        <>
          <div>Found {total} tracks</div>

          <TrackCardContainer>
            {tracks.map((track, i) => {
              return (
                <TrackCard
                  key={`track_${i}`}
                  track={track}
                  onPreview={setPlayerTrack}
                />
              );
            })}
          </TrackCardContainer>

          {!loading && next && tracks.length < total && (
            <PaginatorContainer>
              <LoadMore onClick={handleLoadMore} />
            </PaginatorContainer>
          )}
        </>
      )}
      {loading && <PaginatorContainer>Loading...</PaginatorContainer>}
      <Player track={playerTrack} />
    </PageContainer>
  );
}
