import { VolumeOff, VolumeUp } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { useTimerStore } from "../../store/store";
import { Tooltip } from "@mui/material";

export default function WhiteNoise() {
  const isPlayingWhiteNoise = useTimerStore(
    (state) => state.isPlayingWhiteNoise
  );
  const toggleWhiteNoise = useTimerStore((state) => state.toggleWhiteNoise);
  const whiteNoiseRef = useRef<HTMLAudioElement | null>(null);

  //백색소음 재생 기능
  useEffect(() => {
    if (!whiteNoiseRef.current) {
      whiteNoiseRef.current = new Audio("/white_noise.ogg");
      whiteNoiseRef.current.loop = true;
    }
    if (isPlayingWhiteNoise) {
      whiteNoiseRef.current?.play().catch((error) => {
        console.error("❌백색소음이 재생되지 않았습니다,", error);
      });
    } else {
      whiteNoiseRef.current.pause();
    }
    return () => {
      whiteNoiseRef.current?.pause();
      whiteNoiseRef.current = null;
    };
  }, [isPlayingWhiteNoise]);

  return (
    <Tooltip arrow title={"백색소음"}>
      <Box
        sx={{
          "& > :not(style)": {
            backgroundColor: "#F0F5F8",
            zIndex: 0,
          },
        }}
      >
        <Fab
          aria-label="play"
          onClick={() => {
            toggleWhiteNoise();
          }}
          style={{
            width: "3.5rem",
            height: "3.5rem",
            backgroundColor: isPlayingWhiteNoise ? "#778899" : "",
            color: isPlayingWhiteNoise ? "#ffffff" : "",
          }}
        >
          {isPlayingWhiteNoise ? (
            <VolumeOff style={{ width: "2em", height: "2rem" }} />
          ) : (
            <VolumeUp style={{ width: "2rem", height: "2rem" }} />
          )}
        </Fab>
      </Box>
    </Tooltip>
  );
}
