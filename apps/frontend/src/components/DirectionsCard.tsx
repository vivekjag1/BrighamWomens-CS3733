import React, { useState, useRef, useEffect } from "react";
import DirectionsCardFloor from "./DirectionsCardFloor";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Tooltip from "@mui/material/Tooltip";
import { FormControl, InputLabel, MenuItem, Zoom } from "@mui/material";
import {
  //DirectionMessage,
  Directions,
  //DirectionType,
  StatUnit,
  TripStat,
} from "common/src/Path.ts";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Select from "@mui/material/Select";
// import CustomDropdown from "./CustomDropdown.tsx";

function DirectionsCard(props: {
  directions: Directions[];
  stats: TripStat[];
  isCollapsed: boolean;
  setIsCollapsed?: (state: boolean) => void;
  hasPath: boolean;
}) {
  const { directions, stats, isCollapsed, setIsCollapsed, hasPath } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [currentFloor, setCurrentFloor] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const speechSynth = useRef(window.speechSynthesis);

  function TripStats(props: { stats: TripStat[] }) {
    const minsStat = props.stats.find((stat) => stat.unit == StatUnit.Mins);
    const arrivalTime = minsStat ? getArrivalTime(minsStat.value) : "";

    return (
      <div className="flex w-full justify-around">
        {stats.map((stat, index) => (
          <div className="flex flex-col">
            <div key={index} className="flex flex-col items-end">
              <h2 className="font-normal text-3xl">
                {stat.unit == StatUnit.Arrival ? arrivalTime : stat.value}
              </h2>
              <h2 className="font-light">{stat.unit}</h2>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function getArrivalTime(minToAdd: string) {
    const currentTime = new Date();

    const newTime = new Date(
      currentTime.getTime() + parseInt(minToAdd) * 60000,
    );

    let hours = newTime.getHours();
    const minutes = newTime.getMinutes().toString().padStart(2, "0");

    // 12-hour time adjustment
    if (hours > 12) {
      hours -= 12;
    } else if (hours == 0) {
      hours = 12;
    }

    return `${hours.toString()}:${minutes}`;
  }

  useEffect(() => {
    speechSynth.current.cancel();
    setCurrentStep(0);
    setCurrentFloor(0);
    setIsPaused(true);
  }, [directions]);

  useEffect(() => {
    function loadVoices() {
      // @ts-expect-error missing type
      setVoices(speechSynth.current.getVoices());
    }

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();

    setSelectedVoice("Google US English");
    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleVoiceChange = (event: React.BaseSyntheticEvent) => {
    setSelectedVoice(event.target.value);
  };

  const handlePauseResume = (event: React.BaseSyntheticEvent) => {
    if (!isCollapsed) {
      event.stopPropagation();
    }
    if (speechSynth.current.paused) {
      speechSynth.current.resume();
      setIsPaused(false);
    } else if (speechSynth.current.speaking) {
      speechSynth.current.pause();
      setIsPaused(true);
    } else {
      speakCurrentDirection(currentFloor, currentStep);
    }
  };

  const handleNextStep = (event: React.BaseSyntheticEvent) => {
    if (!isCollapsed) {
      event.stopPropagation();
    }
    const floorDirections = directions[currentFloor].directions;
    let nextStep = currentStep;
    let nextFloor = currentFloor;

    if (currentStep < floorDirections.length - 1) {
      nextStep = currentStep + 1;
    } else if (currentFloor < directions.length - 1) {
      nextFloor = currentFloor + 1;
      nextStep = 0;
    }

    setCurrentStep(nextStep);
    setCurrentFloor(nextFloor);

    speakCurrentDirection(nextFloor, nextStep);
  };

  const handlePreviousStep = (event: React.BaseSyntheticEvent) => {
    if (!isCollapsed) {
      event.stopPropagation();
    }

    let prevStep = currentStep;
    let prevFloor = currentFloor;

    if (currentStep > 0) {
      prevStep = currentStep - 1;
    } else if (currentFloor > 0) {
      prevFloor = currentFloor - 1;
      const prevFloorDirections = directions[prevFloor].directions;
      prevStep = prevFloorDirections.length - 1;
    }

    setCurrentStep(prevStep);
    setCurrentFloor(prevFloor);

    speakCurrentDirection(prevFloor, prevStep);
  };

  const speakCurrentDirection = (floor: number, step: number) => {
    if (directions[floor] && directions[floor].directions[step]) {
      const msg = directions[floor].directions[step].msg;
      const utterance = new SpeechSynthesisUtterance(msg);
      // @ts-expect-error missing type
      utterance.voice = voices.find((voice) => voice.name === selectedVoice);
      speechSynth.current.cancel();
      utterance.onend = () => setIsPaused(true);
      speechSynth.current.speak(utterance);
      setIsPaused(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center bg-offwhite shadow-md rounded-2xl overflow-hidden transition-height ease-in-out duration-500 
      ${props.hasPath ? "max-h-[60vh] p-2 mt-[1rem]" : "max-h-[0]"}
      `}
    >
      <div
        className={`flex flex-col items-center bg-white rounded-2xl shadow-md w-[100%] ${hasPath ? "max-h-[60vh] p-3" : "max-h-[0] p-0"}`}
        onClick={() => {
          if (setIsCollapsed) setIsCollapsed(!isCollapsed);
        }}
        style={{ cursor: "pointer" }}
      >
        <TripStats stats={props.stats} />
        <div
          className="icon-container mt-4 ml-2"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <FormControl
            onClick={(event) => {
              event.stopPropagation();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              height: "2rem",
              marginRight: ".5rem",
            }}
          >
            <InputLabel id="voice-select-label">Voice</InputLabel>
            <Select
              labelId="voice-select-label"
              value={selectedVoice || ""}
              label="Voice"
              // @ts-expect-error missing type
              onChange={handleVoiceChange}
              style={{ width: "7rem", height: "2rem", fontSize: ".9rem" }}
              size="small"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 250,
                    maxWidth: 160,
                    overflow: "auto",
                  },
                },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
              }}
            >
              {voices.map((voice) => (
                <MenuItem
                  sx={{ fontSize: ".8rem", margin: 0, paddingLeft: "10px" }}
                  // @ts-expect-error missing type
                  key={voice.name}
                  // @ts-expect-error missing type
                  value={voice.name}
                >
                  {
                    // @ts-expect-error missing type
                    `${voice.name} (${voice.lang})`
                  }
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <span onClick={handlePreviousStep} style={{ cursor: "pointer" }}>
            <Tooltip
              TransitionComponent={Zoom}
              title="Previous Direction"
              placement="bottom"
              arrow
            >
              <NavigateBeforeIcon
                className="text-secondary hover:text-blue-600"
                style={{ fontSize: "2rem" }}
              />
            </Tooltip>
          </span>
          <span onClick={handlePauseResume} style={{ cursor: "pointer" }}>
            {isPaused ? (
              <Tooltip
                TransitionComponent={Zoom}
                title="Play Audio Directions"
                placement="bottom"
                arrow
              >
                <PlayArrowIcon
                  className="text-secondary hover:text-blue-600"
                  style={{ fontSize: "2rem" }}
                />
              </Tooltip>
            ) : (
              <Tooltip
                TransitionComponent={Zoom}
                title="Pause Audio Directions"
                placement="bottom"
                arrow
              >
                <PauseIcon
                  className="text-secondary hover:text-blue-600"
                  style={{ fontSize: "2rem" }}
                />
              </Tooltip>
            )}
          </span>
          <span onClick={handleNextStep} style={{ cursor: "pointer" }}>
            <Tooltip
              TransitionComponent={Zoom}
              title="Next Direction"
              placement="bottom"
              arrow
            >
              <NavigateNextIcon
                className="text-secondary hover:text-blue-600"
                style={{ fontSize: "2rem" }}
              />
            </Tooltip>
          </span>
        </div>
      </div>
      <div
        className={`shadow-inner mt-[.5rem] rounded-lg overflow-y-auto transition-height ease-in-out duration-700 w-full ${props.isCollapsed ? "max-h-[0vh]" : "max-h-[60vh]"}`}
      >
        <div className={`flex flex-col items-start gap-2 mt-0 mb-[0.5rem]`}>
          {props.directions.map((directions, index) => (
            <DirectionsCardFloor
              key={index}
              floor={directions.floor}
              directions={directions.directions}
              floorIndex={index}
              currentFloor={currentFloor}
              currentStep={currentStep}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DirectionsCard;
