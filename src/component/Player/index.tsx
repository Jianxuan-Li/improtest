import React from "react";

type PlayerProps = {
  track?: SpotifyApi.TrackObjectFull | null | undefined;
};

export default function Player({ track }: PlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const sourceRef = React.useRef<HTMLSourceElement>(null);

  React.useEffect(() => {
    if (!track) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      return;
    }
    if (sourceRef.current && audioRef.current) {
      sourceRef.current.src = track.preview_url || "";
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [track]);

  return (
    <audio ref={audioRef}>
      <source type="audio/mp3" ref={sourceRef} />
      Your browser does not support the audio element.
    </audio>
  );
}
