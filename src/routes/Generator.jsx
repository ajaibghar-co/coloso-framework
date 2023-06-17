import { run } from "../../core/src/run";

import * as blockchain from "../../core/buildings/final/block_chain";
import * as lissajous from "../../core/buildings/final/lissajous";
import * as mandelbrot from "../../core/buildings/final/mandelbrot";
import * as spiral from "../../core/buildings/final/spiral";
import * as watermelon from "../../core/buildings/final/watermelon";
import * as flower from "../../core/buildings/final/flower";

// import * as demo from "../../core/buildings/demo";
import { useRef, useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Image,
  Heading,
  Layer,
  TextInput,
  Paragraph,
} from "grommet";
import { CircleInformation, ClearOption } from "grommet-icons";
import GeneratorWordSelector from "../components/GeneratorWordSelector";
import "./Generator.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { PlainLink } from "../components/PlainLink";
import { config } from "../../server/config";

const sketchParams = {
  Mandelbrot: ["sketch-it1", "sketch-it2", "sketch-it3", "sketch-idensity"],
  Blockchain: ["sketch-seed", "sketch-dim", "sketch-idensity"],
  Watermelon: [
    "sketch-seed1",
    "sketch-seed2",
    "sketch-seed3",
    "sketch-seed4",
    "sketch-idensity",
  ],
  Flower: ["sketch-idensity", "sketch-x1", "sketch-y1"],
  Spiral: ["sketch-swidth", "sketch-idensity"],
  Lissajous: ["sketch-x1", "sketch-y1", "sketch-idensity"],
};

const DEBUG = false;

export default function Generator() {
  const generatorRef = useRef(null);
  const [monumentName, setMonumentName] = useState("");
  const [structure, setStructure] = useState(-1);
  const [color, setColor] = useState(-1);
  const [movement, setMovement] = useState(-1);
  const [harvestWords, setHarvestWords] = useState([]);
  const [crystallizeWords, setCrystallizeWords] = useState([]);
  const [distilWords, setDistilWords] = useState([]);
  const [choiceString, setChoiceString] = useState([]);
  const location = useLocation();
  const [showSaveModel, setShowSaveModel] = useState(false);
  const [creatorName, setCreatorName] = useState("");
  const [creatorLocation, setCreatorLocation] = useState("");
  const [monumentLocation, setMonumentLocation] = useState("");
  const [params, setParams] = useState("");
  const navigate = useNavigate();
  const [firstTime, setFirstTime] = useState(true);

  const programs = [
    mandelbrot,
    blockchain,
    watermelon,
    flower,
    spiral,
    lissajous,
  ];

  async function onClickSave() {
    // console.log("ok");
    // console.log([...harvestWords, ...crystallizeWords, ...distilWords]);
    const monumentPayload = {
      monumentName,
      stringList: [...harvestWords, ...crystallizeWords, ...distilWords].join(
        ", "
      ),
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
      `${config.serverUrl}/monument`,
      monumentPayload
    );

    // clearing localstorage
    for (var key in localStorage) {
      if (key.startsWith("sketch-")) {
        localStorage.removeItem(key);
      }
    }

    navigate(`/warehouse/${data.slug}`);
  }

  function render() {
    if (generatorRef && structure != -1) {
      run(
        programs[0],
        { element: generatorRef.current },
        { structure, color, movement }
      )
        .then(function (e) {})
        .catch(function (e) {});
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
    setHarvestWords(choices);
  }

  function onHarvestClickedForSecondBox(value) {
    const { label, choices } = value;
    setColor(colorIndices[label]);
    setCrystallizeWords(choices);
  }

  function onHarvestClickedForThirdBox(value) {
    const { label, choices } = value;
    setMovement(movementIndices[label]);
    setDistilWords(choices);
  }

  return (
    <Box fill background="#222">
      <Box direction="row-responsive" pad={"small"}>
        <Box align="end">
          <Text size={"xlarge"} color="white" style={{ fontFamily: "wethard" }}>
            COLOSO
          </Text>
          <Text size={"small"} weight={100} color="#E1C79C" margin={"none"}>
            factory{" "}
          </Text>
        </Box>
        <Box flex="grow"></Box>

        <Box width={"0.4em"}></Box>
        <Box align="center" direction="row-responsive" gap={"small"}>
          <Button plain>
            <Box background={"white"} pad="xsmall" round={"xxsmall"}>
              <PlainLink to="/">
                <Text> Go to Home</Text>
              </PlainLink>
            </Box>
          </Button>
          <Button plain>
            <PlainLink to="/warehouse">
              <Box background={"white"} pad="xsmall" round={"xxsmall"}>
                <Text> Go to Warehouse</Text>
              </Box>
            </PlainLink>
          </Button>
          <Button
            icon={
              <Box>
                <Link to={"/about"}>
                  <CircleInformation size={"medium"} />
                </Link>
              </Box>
            }
          ></Button>
        </Box>
      </Box>

      <Box direction={"row-responsive"} wrap={false} responsive={true}>
        <Box width={{ min: "28vw", max: "32rem" }} gap="medium" pad={"medium"}>
          <GeneratorWordSelector
            set={structureSet}
            map={structureMap}
            onHarvestClicked={onHarvestClickedForFirstBox}
            active={!firstTime}
            instruction={"Time to harvest!"}
            cta={"Harvest"}
          />

          <GeneratorWordSelector
            set={colorSet}
            map={colorMap}
            onHarvestClicked={onHarvestClickedForSecondBox}
            active={structure != -1}
            instruction={"Crystalize that baby!"}
            cta={"Crystallize"}
          />

          <GeneratorWordSelector
            set={movementSet}
            map={movementMap}
            onHarvestClicked={onHarvestClickedForThirdBox}
            active={structure != -1}
            instruction={"Finally, go ahead and distil!"}
            cta={"Distil"}
          />
        </Box>
        {firstTime ? (
          <Box flex={"grow"} justify="center">
            <Box
              background={"#E0C7A3"}
              pad={"medium"}
              width={"large"}
              alignSelf="center"
            >
              <Paragraph fill textAlign="center">
                First, you’ll be able to harvest.
              </Paragraph>
              <Paragraph fill textAlign="center">
                Choose three words that help you describe your queer space from
                the list.{" "}
              </Paragraph>
              <Paragraph fill textAlign="center">
                Second, you’ll distill [not sure what this does]. Third, You can
                refresh the list to find more words.
              </Paragraph>
              <Box align="center">
                <Button plain onClick={() => setFirstTime(false)}>
                  <Box
                    background={"white"}
                    pad={"small"}
                    alignSelf="center"
                    width="fit-content"
                  >
                    <Text alignSelf="center">OK</Text>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            flex={"grow"}
            background={"#222"}
            border={DEBUG ? { color: "red" } : false}
            height={"fit-content"}
            gap="medium"
            pad={"medium"}
          >
            <Box id="sketch" background={"#222"}>
              <Box direction="row-responsive" justify="center">
                <Box
                  width={"large"}
                  height={"large"}
                  border={DEBUG ? { color: "green" } : false}
                >
                  {structure != -1 ? (
                    <pre style={{ lineHeight: 1 }} ref={generatorRef}></pre>
                  ) : (
                    <Box alignSelf="center">
                      <Box fill={true} />
                      <Text>Waiting for selection...</Text>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box align="center">
                <h1 className="monument-name">{monumentName}</h1>
              </Box>
            </Box>

            {(structure && color && movement) != -1 ? (
              <Box width={"xlarge"} alignSelf="center">
                <Box align="center">
                  <Box direction="row-responsive">
                    <Button
                      plain
                      onClick={() => {
                        setShowSaveModel(true);
                      }}
                    >
                      <Box
                        pad={"xsmall"}
                        round="xsmall"
                        background={"white"}
                        width={"xsmall"}
                        align="center"
                      >
                        <Text>PUBLISH</Text>{" "}
                      </Box>
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : null}
          </Box>
        )}
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
                placeholder="Monument Name"
                value={monumentName}
                onChange={(e) => setMonumentName(e.target.value)}
              ></TextInput>

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

              <Box direction="row-responsive" gap="small">
                <Button plain onClick={onClickSave}>
                  <Box
                    pad={"xsmall"}
                    background="#E1C79C"
                    width={"fit-content"}
                    alignSelf="center"
                    margin={{ top: "small" }}
                  >
                    <Text>OK</Text>
                  </Box>
                </Button>
                <Button
                  plain
                  onClick={() => {
                    setShowSaveModel(false);
                  }}
                >
                  <Box
                    pad={"xsmall"}
                    width={"fit-content"}
                    alignSelf="center"
                    margin={{ top: "small" }}
                  >
                    <Text>Cancel</Text>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Layer>
        ) : null}
      </Box>
    </Box>
  );
}
