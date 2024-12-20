import { VolumeOff, VolumeUp } from "@mui/icons-material";
import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { useTimerStore } from "../../store/store";
import { Tooltip } from "@mui/material";
import { t } from "i18next";

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
    <Tooltip arrow title={t("백색소음")}>
      <Box
        sx={{
          "& > :not(style)": {
            backgroundColor: "#D5E6E9",
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
            width: "5rem",
            height: "5rem",
            backgroundColor: isPlayingWhiteNoise ? "#98acc1" : "",
            color: isPlayingWhiteNoise ? "#ffffff" : "",
            boxShadow: "none",
          }}
        >
          {isPlayingWhiteNoise ? (
            <VolumeOff style={{ width: "4em", height: "4rem", opacity: 0.7 }} />
          ) : (
            <VolumeUp style={{ width: "3rem", height: "3rem", opacity: 0.7 }} />
          )}
        </Fab>
      </Box>
    </Tooltip>
  );
}
