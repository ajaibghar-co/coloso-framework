import { run } from "../../core/src/run";

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
import {
  structureMap,
  structureIndices,
  colorMap,
  colorIndices,
  movementMap,
  movementIndices,
  structureSet,
  colorSet,
  movementSet,
} from "../selection";

const sketchParams = {
  Mandelbrot: ["sketch-it1", "sketch-it2", "sketch-it3"],
  Blockchain: ["sketch-seed", "sketch-dim"],
  Watermelon: ["sketch-seed1", "sketch-seed2", "sketch-seed3", "sketch-seed4"],
  Flower: [],
  Spiral: ["sketch-swidth"],
  Lissajous: ["sketch-x1", "sketch-y1"],
};

const DEBUG = false;

export default function Generator() {
  const generatorRef = useRef(null);
  const [monumentName, setMonumentName] = useState("");
  const [structure, setStructure] = useState(1);
  const [color, setColor] = useState(-1);
  const [movement, setMovement] = useState(-1);
  const [choiceString, setChoiceString] = useState([]);
  const location = useLocation();
  const [showSaveModel, setShowSaveModel] = useState(false);
  const [creatorName, setCreatorName] = useState("");
  const [creatorLocation, setCreatorLocation] = useState("");
  const [monumentLocation, setMonumentLocation] = useState("");
  const [params, setParams] = useState("");
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
    const monumentPayload = {
      monumentName,
      stringList: choiceString.join(","),
      monumentLocation,
      creatorName,
      creatorLocation,
      structure,
      movement,
      color,
      choiceString,
      params,
    };

    const { data } = await axios.post(
      "http://localhost:3000/monument",
      monumentPayload
    );
    navigate(`/gallery/${data.slug}`);
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
    const { label, choices } = value;
    // console.log(label);
    setStructure(structureIndices[label]);
    let params = {};
    for (var key in localStorage) {
      if (sketchParams[label].includes(key)) {
        // console.log(key);
        params[key] = localStorage.getItem(key);
      }
    }
    // console.log(params);
    setParams(JSON.stringify(params));
    setChoiceString([...choiceString, ...choices]);
  }

  function onHarvestClickedForSecondBox(value) {
    const { label, choices } = value;
    setColor(colorIndices[label]);
    setChoiceString([...choiceString, ...choices]);
  }

  function onHarvestClickedForThirdBox(value) {
    const { label, choices } = value;
    setMovement(movementIndices[label]);
    setChoiceString([...choiceString, ...choices]);
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
              set={structureSet}
              map={structureMap}
              onHarvestClicked={onHarvestClickedForFirstBox}
              active={true}
              cta={"Harvest"}
            />
          </Box>
          <Box gap={"medium"} pad={"small"}>
            <GeneratorWordSelector
              set={colorSet}
              map={colorMap}
              onHarvestClicked={onHarvestClickedForSecondBox}
              active={structure != -1}
              cta={"Crystallize"}
            />
          </Box>
          <Box gap={"medium"} pad={"small"}>
            <GeneratorWordSelector
              set={movementSet}
              map={movementMap}
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
              <h1 className="monument-name">{monumentName}</h1>
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
              gap={"small"}
            >
              <Heading level="4">Store in warehouse</Heading>

              <TextInput
                placeholder="Creator Name"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
              ></TextInput>
              <TextInput
                placeholder="Creator Location"
                value={creatorLocation}
                onChange={(e) => setCreatorLocation(e.target.value)}
              ></TextInput>
              <TextInput
                placeholder="Monument Location"
                value={monumentLocation}
                onChange={(e) => setMonumentLocation(e.target.value)}
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
