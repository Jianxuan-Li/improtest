import * as React from "react";
import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

// a transparent button that covers the image
const PlayButtonContainer = styled.div`
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 345px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  outline: none;
  color: #fff;
  font-size: 2rem;
  transition: all 0.2s ease-in-out;
  transform: scale(2);
  &:hover {
    transform: scale(2.5);
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
`;

type CardProps = {
  track: SpotifyApi.TrackObjectFull;
  onPreview: (track: SpotifyApi.TrackObjectFull) => void;
};

export default function TrackCard({ track, onPreview }: CardProps) {
  const durationFmt = (s: number) => {
    const minutes = Math.floor(s / 60000);
    const seconds = ((s % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds}`;
  };

  return (
    <Card sx={{ maxWidth: 345, position: "relative" }}>
      {track.preview_url && (
        <PlayButtonContainer>
          <PlayButton onClick={() => onPreview(track)}>
            <PlayCircleIcon fontSize="large" />
          </PlayButton>
        </PlayButtonContainer>
      )}
      <CardMedia
        component="img"
        alt="green iguana"
        image={track.album.images[0].url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Link href={track.external_urls.spotify} target="_blank">
            {track.name}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duration: {durationFmt(track.duration_ms)}
          <br />
          <Link target="_blank" href={track.album.external_urls.spotify}>
            {track.album.name}
          </Link>
          <br />
          <Link target="_blank" href={track.artists[0].external_urls.spotify}>
            {track.artists[0].name}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
