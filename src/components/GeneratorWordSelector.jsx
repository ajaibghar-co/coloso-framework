import { Box, Text, Button } from "grommet";
import { ClearOption } from "grommet-icons";
import { useState } from "react";

const choiceWords = {
  Tiny: "Mandelbrot",
  Mirror: "Mandelbrot",
  Sweaty: "Madelbrot",
  Closed: "Blockchain",
  Sticky: "Mandelbrot",
  Open: "Blockchain",
  Massive: "Blockchain",
  Community: "Mandelbrot",
  Shoddy: "Blockhain",
  Sketchy: "Blockchain",
  Hard: "Blockchain",
  Fluffy: "Mandelbrot",
};

function GeneratorWordSelector({ choiceWords, onHarvestClicked }) {
  const [choices, setChoices] = useState([]);
  // const sampledChoices = Object.keys(choiceWords);

  function computeOutput() {
    // map the selection to keyword
  }

  return (
    <Box background={"white"} pad={"xsmall"} gap={"medium"}>
      <Box direction={"row-responsive"}>
        <Box>
          <Text color={"black"}>Pick 3 out of 5</Text>
        </Box>
        <Box flex={"grow"}></Box>
        <ClearOption color={"black"} size="medium" />
      </Box>
      <Box>
        <Box align="center">
          {Object.keys(choiceWords)
            .slice(0, 5)
            .map((choice, ix) => (
              <Button
                plain
                key={ix}
                onClick={() => {
                  if (choices.length < 3) {
                    setChoices([...choices, choice]);
                  }
                }}
              >
                <Box>
                  <Text color={choices.includes(choice) ? "black" : "gray"}>
                    {choice}
                  </Text>
                </Box>
              </Button>
            ))}
        </Box>
      </Box>
      <Box
        background={choices.length === 3 ? "#E6D7B3" : "grey"}
        alignSelf="center"
        width={"fit-content"}
        pad={"xxsmall"}
        round={"xxsmall"}
      >
        <Button plain active={choices.length === 3} onClick={onHarvestClicked}>
          <Text size={"small"}>Harvest</Text>
        </Button>
      </Box>
    </Box>
  );
}

export default GeneratorWordSelector;
