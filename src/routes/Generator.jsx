import { run } from "../../core/src/run";
// import * as program from "../../core/buildings/monument12.js";
import * as program from "../../core/buildings/demo.js";
import { useRef, useEffect, useState } from "react";
import { Box, Text, Button } from "grommet";
import { ClearOption } from "grommet-icons";
import GeneratorWordSelector from "../components/GeneratorWordSelector";

const structureMap = {
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

function getStructure(selections) {
  const counts = {
    Mandelbrot: 0,
    Blockchain: 0,
  };
  for (selection of selections) {
    counts[structureMap[selection]]++;
  }
  const voteRatios = [];
  for (count of counts) {
  }
}

const colorMap = {
  Glory: "Stone",
  Light: "Stone",
  Dark: "Pistachio",
  Cocktails: "Lavender",
  Glitter: "Stone",
  Hip: "Lavender",
  Sinister: "Pistachio",
  Pink: "Lavender",
  Love: "Lavender",
  Nature: "Pistachio",
  Colorful: "Pistachio",
  Neon: "Pistachio",
  Glitzy: "Stone",
};

const movementMap = {
  Discoball: 1,
  Naughty: 1,
  Dance: 1,
  Heartbeat: 1,
  Performance: 1,
  Vogueing: 1,
  Bubbles: 1,
  Confetti: 1,
  Druggy: 1,
  Notorious: 1,
  Intense: 1,
};

export default function Generator() {
  const generatorRef = useRef(null);
  const [structure, setStructure] = useState(0);
  const [color, setColor] = useState(0);
  const [movement, setMovement] = useState(0);

  function render() {
    if (generatorRef) {
      // console.log("here");
      run(
        program,
        { element: generatorRef.current, cols: 53, rows: 20 },
        { structure, color, movement }
      )
        .then(function (e) {
          // console.log(e);
        })
        .catch(function (e) {
          // console.log(e);
          // console.warn(e.message);
          // console.log(e.error);
        });
    }
  }

  useEffect(() => {
    render();
  }, [generatorRef]);

  useEffect(() => {
    render();
  }, [structure, color, movement]);

  function onHarvestClickedForFirstBox() {
    console.log("first is here");
  }

  function onHarvestClickedForSecondBox() {
    console.log("second is here");
  }

  function onHarvestClickedForThirdBox() {
    console.log("third is here");
  }

  return (
    <Box fill background="black">
      <Box direction="row-responsive" pad={"small"}>
        <Box align="end">
          <Text size={"xlarge"} color="#E1C79C" margin={"none"}>
            COLOSO
          </Text>
          <Text size={"small"} weight={100} color="#E1C79C" margin={"none"}>
            factory{" "}
          </Text>
        </Box>
        <Box flex="grow"></Box>
        <Button plain>
          <Box background={"white"} pad="xsmall" round={"xxsmall"}>
            <Text> Go to Factory</Text>
          </Box>
        </Button>
        <Box width={"0.4em"}></Box>
        <Button plain>
          <Box background={"white"} pad="xsmall" round={"xxsmall"}>
            <Text> Go to Warehouse</Text>
          </Box>
        </Button>
      </Box>
      <Box direction={"row-responsive"}>
        <Box width={{ min: "28vw", max: "40em" }}>
          <Box gap={"medium"} pad={"small"}>
            <GeneratorWordSelector
              choiceWords={structureMap}
              onHarvestClicked={onHarvestClickedForFirstBox}
            />
          </Box>
          <Box gap={"medium"} pad={"small"}>
            <GeneratorWordSelector
              choiceWords={colorMap}
              onHarvestClicked={onHarvestClickedForSecondBox}
            />
          </Box>
          <Box gap={"medium"} pad={"small"}>
            <GeneratorWordSelector
              choiceWords={movementMap}
              onHarvestClicked={onHarvestClickedForThirdBox}
            />
          </Box>
        </Box>
        <Box flex={"grow"} background={"aqua"}>
          C
        </Box>
      </Box>
    </Box>
  );
}
