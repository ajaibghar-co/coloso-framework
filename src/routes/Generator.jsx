import { run } from "../../core/src/run";
// import * as program from "../../core/buildings/monument12.js";
// import * as program from "../../core/buildings/demo.js";
import * as flower from "../../core/buildings/flower.js";
import * as lissajous from "../../core/buildings/lissajous.js";
import * as mandelbrot from "../../core/buildings/mandelbrot";
import * as blockchain from "../../core/buildings/block_chain";
import * as demo from "../../core/buildings/demo";
import { useRef, useEffect, useState } from "react";
import { Box, Text, Button, Image, Heading } from "grommet";
import { ClearOption } from "grommet-icons";
import GeneratorWordSelector from "../components/GeneratorWordSelector";
import StaticSketch from "../components/StaticSketch";
import "./Generator.css";
import { useLocation } from "react-router-dom";

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
  None: -1,
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
  None: -1,
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
  None: -1,
  pattern2: 1,
  pattern3: 2,
};

const DEBUG = false;

export default function Generator() {
  const generatorRef = useRef(null);
  const [monumentName, setMonumentName] = useState("");
  const [structure, setStructure] = useState(-1);
  const [color, setColor] = useState(-1);
  const [movement, setMovement] = useState(-1);
  const location = useLocation();

  const programs = [mandelbrot, blockchain];

  function render() {
    if (generatorRef && structure != -1) {
      // console.log("here");
      run(
        programs[structure],
        // demo,
        {
          element: generatorRef.current,
          cols: 50,
          rows: 20,
          width: 50,
          height: 50,
        },
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
    let nameFromPath = location.pathname.split("/")[2];
    setMonumentName(nameFromPath);
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
    <Box fill background="#222">
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
        <Box
          flex={"grow"}
          background={"#222"}
          border={DEBUG ? { color: "red" } : false}
          height={"fit-content"}
        >
          <Box direction="row-responsive" justify="center">
            <Box
              width={"small"}
              height={"medium"}
              border={DEBUG ? { color: "aqua" } : false}
            >
              <Image fit="contain" src="/sample-sketch01.png" />
            </Box>
            <Box
              width={"large"}
              height={"fit-content"}
              border={DEBUG ? { color: "green" } : false}
            >
              {structure != -1 ? (
                <pre ref={generatorRef}></pre>
              ) : (
                <Box alignSelf="center">
                  <Box fill={true} />
                  <Text>Waiting for selection...</Text>
                </Box>
              )}
            </Box>
            <Box
              width={"small"}
              height={"medium"}
              border={DEBUG ? { color: "aqua" } : false}
            >
              <Image fit="contain" src="/sample-sketch02.png" />
            </Box>
          </Box>
          <Box width={"xlarge"} alignSelf="center">
            <Box
              width={"xlarge"}
              height="0.4em"
              background={"#808080"}
              alignSelf="center"
            ></Box>
            <Box align="center">
              <Heading level={4}>{monumentName}</Heading>
              <Button plain>
                <Box
                  pad={"xsmall"}
                  round="xsmall"
                  background={"white"}
                  width={"xsmall"}
                  align="center"
                >
                  <Text>SAVE</Text>{" "}
                </Box>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
