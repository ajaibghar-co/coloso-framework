import { run } from "../../core/src/run";
// import * as program from "../../core/buildings/monument12.js";
// import * as program from "../../core/buildings/demo.js";
import * as blockchain from "../../core/buildings/final/block_chain";
import * as lissajous from "../../core/buildings/final/lissajous";
import * as mandelbrot from "../../core/buildings/final/mandelbrot";
import * as spiral from "../../core/buildings/final/spiral";
import * as watermelon from "../../core/buildings/final/watermelon";
import * as flower from "../../core/buildings/final/flower";

// import * as demo from "../../core/buildings/demo";
import { useRef, useEffect, useState } from "react";
import { Box, Text, Button, Image, Heading, Layer, TextInput } from "grommet";
import { ClearOption } from "grommet-icons";
import GeneratorWordSelector from "../components/GeneratorWordSelector";
import StaticSketch from "../components/StaticSketch";
import "./Generator.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const structureMap = {
  Tiny: "Flower",
  Mirror: "Mandelbrot",
  Sweaty: "Spiral",
  Closed: "Blockchain",
  Sticky: "Spiral",
  Open: "Watermelon",
  Massive: "Spiral",
  Community: "Flower",
  Shoddy: "Lissajous",
  Sketchy: "Watermelon",
  Hard: "Blockchain",
  Fluffy: "Lissajous",
  Fetish: "Lissajous",
  Unknown: "Lissajous",
  Underground: "Flower",
  Gloryhole: "Mandelbrot",
  Dates: "Spiral",
  Weird: "Lissajous",
  Homely: "Watermelon",
  Kinship: "Flower",
  Collaborative: "Watermelon",
  Vestibule: "Watermelon",
  Fantasy: "Mandelbrot",
  Sanctuary: "Blockchain",
  Shelter: "Blockchain",
  Tenderness: "Flower",
  Trauma: "Mandelbrot",
  Intersectional: "Watermelon",
  Fluid: "Spiral",
  Heels: "Blockchain",
  Jewels: "Mandelbrot",
};
const structureIndices = {
  None: -1,
  Mandelbrot: 0,
  Blockchain: 1,
  Watermelon: 2,
  Flower: 3,
  Spiral: 4,
  Lissajous: 5,
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
  Stone: 0,
  Pistachio: 1,
  Lavender: 2,
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
  pattern2: 0,
  pattern3: 1,
};

const DEBUG = false;

export default function Generator() {
  const generatorRef = useRef(null);
  const [monumentName, setMonumentName] = useState("");
  const [structure, setStructure] = useState(1);
  const [color, setColor] = useState(-1);
  const [movement, setMovement] = useState(-1);
  const location = useLocation();
  const [showSaveModel, setShowSaveModel] = useState(false);
  const [creatorName, setCreatorName] = useState("");
  const navigate = useNavigate();

  const programs = [
    mandelbrot,
    blockchain,
    watermelon,
    flower,
    spiral,
    lissajous,
  ];

  async function onClickSave() {
    console.log({ structure, movement, color });
    const monumentPayload = {
      monumentName: "test-monument-6",
      monumentLocation: "delhi",
      creatorName: "denny",
      creatorLocation: "kerala",
      structure: 1,
      color: 2,
      movement: 0,
      params: "{sketch-seed:0.2, sketch-random:0.6}",
    };

    const { data } = await axios.post(
      "http://localhost:3000/monument",
      monumentPayload
    );
    // console.log(response);
    navigate(`/gallery/${data.id}`);
  }

  function render() {
    if (generatorRef && structure != -1) {
      // console.log("here");
      run(
        programs[structure],
        // watermelon,
        // flower,
        { element: generatorRef.current },
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
            {/* <Box
              width={"small"}
              height={"medium"}
              border={DEBUG ? { color: "aqua" } : false}
            >
              <Image fit="contain" src="/sample-sketch01.png" />
            </Box> */}
            <Box
              width={"large"}
              height={"large"}
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
            {/* <Box
              width={"small"}
              height={"medium"}
              border={DEBUG ? { color: "aqua" } : false}
            >
              <Image fit="contain" src="/sample-sketch02.png" />
            </Box> */}
          </Box>
          <Box width={"xlarge"} alignSelf="center">
            {/* <Box
              width={"xlarge"}
              height="0.4em"
              background={"#808080"}
              alignSelf="center"
            ></Box> */}
            <Box align="center">
              <Heading level={4}>{monumentName}</Heading>
              <Button plain onClick={() => setShowSaveModel(true)}>
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
        {showSaveModel ? (
          <Layer
            modal={false}
            background={{ opacity: true, clip: "border-box" }}
            position={"center"}
            animation={false}
          >
            <Box
              width={"medium"}
              height={"fit-content"}
              background={"white"}
              pad={"medium"}
            >
              <Heading level="4">Store in warehouse</Heading>
              <Text>Creator Name</Text>
              <TextInput
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
              ></TextInput>
              <Button plain onClick={onClickSave}>
                <Box
                  pad={"xsmall"}
                  background="#E1C79C"
                  width={"fit-content"}
                  alignSelf="center"
                  margin={{ top: "small" }}
                >
                  <Text>Save</Text>
                </Box>
              </Button>
            </Box>
          </Layer>
        ) : null}
      </Box>
    </Box>
  );
}
