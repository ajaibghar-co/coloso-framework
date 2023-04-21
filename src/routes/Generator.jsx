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
  Sweaty: "Mandelbrot",
  Closed: "Blockchain",
  Sticky: "Mandelbrot",
  Open: "Blockchain",
  Massive: "Blockchain",
  Community: "Mandelbrot",
  Shoddy: "Blockchain",
  Sketchy: "Blockchain",
  Hard: "Blockchain",
  Fluffy: "Mandelbrot",
};
const structureIndices = {
  Mandelbrot: 0,
  Blockchain: 1,
};

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
const colorIndices = {
  Stone: 1,
  Pistachio: 2,
  Lavender: 3,
};

const movementMap = {
  Discoball: "pattern2",
  Naughty: "pattern2",
  Dance: "pattern2",
  Heartbeat: "pattern2",
  Performance: "pattern2",
  Vogueing: "pattern3",
  Bubbles: "pattern3",
  Confetti: "pattern3",
  Druggy: "pattern3",
  Notorious: "pattern3",
  Intense: "pattern3",
};
const movementIndices = {
  pattern2: 1,
  pattern3: 2,
};

export default function Generator() {
  const generatorRef = useRef(null);
  const [structure, setStructure] = useState(-1);
  const [color, setColor] = useState(-1);
  const [movement, setMovement] = useState(-1);

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
    console.log({ structure, color, movement });
  }, [structure, color, movement]);

  function onHarvestClickedForFirstBox(value) {
    setStructure(structureIndices[value]);
  }

  function onHarvestClickedForSecondBox(value) {
    setColor(colorIndices[value]);
  }

  function onHarvestClickedForThirdBox(value) {
    setMovement(movementIndices[value]);
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
              active={true}
              cta={"Harvest"}
            />
          </Box>
          <Box gap={"medium"} pad={"small"}>
            <GeneratorWordSelector
              choiceWords={colorMap}
              onHarvestClicked={onHarvestClickedForSecondBox}
              active={structure != -1}
              cta={"Crystallize"}
            />
          </Box>
          <Box gap={"medium"} pad={"small"}>
            <GeneratorWordSelector
              choiceWords={movementMap}
              onHarvestClicked={onHarvestClickedForThirdBox}
              active={structure != -1}
              cta={"Distil"}
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
