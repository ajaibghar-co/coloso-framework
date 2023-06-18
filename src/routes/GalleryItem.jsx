import axios, { all } from "axios";
import {
  Box,
  Heading,
  Text,
  TextInput,
  Button,
  Paragraph,
  ResponsiveContext,
  Layer,
} from "grommet";
import { useContext, useEffect, useRef, useState } from "react";
import { run } from "../../core/src/run";
import * as blockchain from "../../core/buildings/final/block_chain";
import * as lissajous from "../../core/buildings/final/lissajous";
import * as mandelbrot from "../../core/buildings/final/mandelbrot";
import * as spiral from "../../core/buildings/final/spiral";
import * as watermelon from "../../core/buildings/final/watermelon";
import * as flower from "../../core/buildings/final/flower";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CircleInformation, Search } from "grommet-icons";
import { PlainLink } from "../components/PlainLink";
import html2canvas from "html2canvas";
import { config } from "../../server/config";
import { GalleryMonument } from "../components/GalleryMonument";

const programs = [
  mandelbrot,
  blockchain,
  watermelon,
  flower,
  spiral,
  lissajous,
];

/**
 * https://stackoverflow.com/a/74966296
 */
function downloadData(linkData, filename) {
  let link = document.createElement("a");
  link.href = linkData;
  link.download = filename;
  let target = document.body;
  target.appendChild(link); // Firefox requires the link to be in the body
  link.click(); // simulate click
  target.removeChild(link); // remove the link when done
}

function CNavigation() {
  return (
    <Box direction="row-responsive" wrap={true} pad={"small"} flex={"grow"}>
      <Box align="start">
        <Box>
          <Text
            size={"xlarge"}
            weight={900}
            color="white"
            style={{ fontFamily: "wethard" }}
          >
            COLOSO
          </Text>
          <Text
            textAlign="end"
            size={"small"}
            weight={100}
            color="#E1C79C"
            margin={"none"}
          >
            factory
          </Text>
        </Box>
      </Box>
      <Box flex="grow"></Box>

      <Box align="center" direction="row-responsive" gap={"small"}>
        <Button plain>
          <Box background={"white"} pad="xsmall" round={"xxsmall"}>
            <PlainLink to="/">
              <Text> Go to Home</Text>
            </PlainLink>
          </Box>
        </Button>
        <Button plain>
          <PlainLink to="/factory">
            <Box background={"white"} pad="xsmall" round={"xxsmall"}>
              <Text> Go to Factory</Text>
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
  );
}

function CMonumentMetadata({
  monumentMetadata,
  onShareClicked,
  setShowShareModal,
}) {
  return (
    <Box direction="row-responsive" wrap={true}>
      {monumentMetadata && (
        <Box flex="grow" justify="center" pad={"small"}>
          <Heading level={4} color={"white"}>
            {monumentMetadata.string_list}
          </Heading>
          <Text
            size={"medium"}
            color={"white"}
          >{`Built By: ${monumentMetadata.creator_name}, ${monumentMetadata.creator_location}`}</Text>
          <Text
            size={"medium"}
            color={"white"}
          >{`Located at: ${monumentMetadata.monument_location}`}</Text>

          <Box direction="row-responsive" gap={"small"} align="center">
            <Button
              plain
              onClick={() => {
                html2canvas(document.querySelector("#sketch")).then(
                  (canvas) => {
                    // document.body.appendChild(canvas);
                    // console.log(canvas);
                    var image = canvas
                      .toDataURL("image/png")
                      .replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.

                    // window.location.href = image;
                    downloadData(
                      image,
                      `${monumentMetadata.monument_name}.png`
                    );
                  }
                );
              }}
            >
              <Box
                pad={"xsmall"}
                round="xsmall"
                background={"white"}
                width={"xsmall"}
                align="center"
                margin={{ top: "small" }}
              >
                <Text>SAVE</Text>
              </Box>
            </Button>
            <Button
              onClick={() => {
                // console.log(location);
                // navigator.clipboard.writeText(window.location.href);
                // alert("Monument URL has been copied to your clipboard");
                console.log("hello");
                setShowShareModal(true);
              }}
            >
              <Box
                pad={"xsmall"}
                round="xsmall"
                background={"#CDD8E3"}
                width={"xsmall"}
                align="center"
                margin={{ top: "small" }}
              >
                <Text>SHARE</Text>
              </Box>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

function CResponsiveSidebar({ children }) {
  const size = useContext(ResponsiveContext);
  const [dim, setDim] = useState("100%");

  useEffect(() => {
    switch (size) {
      case "small":
      case "xsmall":
        setDim("100%");
        break;
      case "medium":
        setDim("medium");
        break;
      default:
        setDim("medium");
    }
  }, [size]);

  return (
    <Box width={dim} pad="small">
      {children}
    </Box>
  );
}

function CMonument({ children }) {
  const size = useContext(ResponsiveContext);
  return <Box width={"fit-content"}>{children}</Box>;
}

export default function GalleryItem() {
  const generatorRef = useRef(null);
  const [structure, setStructure] = useState(-1);
  const [color, setColor] = useState(-1);
  const [movement, setMovement] = useState(-1);
  const [params, setParams] = useState(undefined);
  const [monumentMetadata, setMonumentMetadata] = useState(undefined);
  const [allMonumentsList, setAllMonumentsList] = useState([]);
  const [uptoPageNum, setUptoPageNum] = useState(0);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const monumentId = location.pathname.split("/")[2];
    console.log({ monumentId });

    if (monumentId) {
      (async function getMonument() {
        const { data: monument } = await axios.get(
          `${config.serverUrl}/monument/slug/${monumentId}`
        );

        // console.log({ monument });
        setStructure(monument.structure);
        setColor(monument.color);
        setMovement(monument.movement);
        setMonumentMetadata({ ...monument });
        setParams(JSON.parse(monument.params));

        // deprecated
        // for (let key in params) {
        //   localStorage.setItem(key, params[key]);
        // }

        if (!allMonumentsList) {
          const { data: monumentPage } = await axios.get(
            `${config.serverUrl}/monument/page/${uptoPageNum}`
          );
          // console.log(monumentPage);
          setAllMonumentsList(monumentPage);
        }
        // render(params);
      })();
    }
    return () => {};
  }, [location]);

  useEffect(() => {
    (async function search() {
      if (searchTerm !== "") {
        const { data: monumentPage } = await axios.get(
          `${config.serverUrl}/monument/search/${searchTerm}`
        );
        setAllMonumentsList(monumentPage);
      } else {
        const { data: monumentPage } = await axios.get(
          `${config.serverUrl}/monument/page/${uptoPageNum}`
        );
        setAllMonumentsList(monumentPage);
      }
    })();

    return () => {};
  }, [searchTerm]);

  return (
    <Box fill>
      <CNavigation />
      <Box
        direction={"row-responsive"}
        wrap={true}
        overflow={"hidden"}
        flex={"grow"}
      >
        <CResponsiveSidebar>
          <Box flex={"grow"}>
            <Box pad={"small"} gap={"small"} flex={"grow"}>
              <Paragraph fill={true} color={"white"}>
                You’ve entered Coloso’s warehouse! Here you’ll be able to scroll
                through the monuments created by all of Coloso’s visitors from
                all around the world. You’ll also be able to distribute any of
                the monuments as you wish, by downloading, screen-shooting,
                emailing, sharing, and printing.
              </Paragraph>
            </Box>
            <Box
              pad={"small"}
              gap={"small"}
              overflow={"scroll"}
              border={{ color: "#E0C7A3" }}
              round="small"
              fill
            >
              <Box direction="row-responsive" gap="small" align="center">
                <TextInput
                  placeholder="Search by Monument Name"
                  value={searchTerm}
                  onChange={async (e) => {
                    setSearchTerm(e.target.value);
                    // await clickSearch();
                  }}
                ></TextInput>
                {/* <Search size={"medium"} /> */}
              </Box>
              <Box flex={"grow"}>
                {allMonumentsList &&
                  allMonumentsList.map((monument, ix) => {
                    return (
                      <Box key={ix}>
                        <Link to={`/warehouse/${monument.slug}`}>
                          <Text color={"white"}>{monument.monument_name}</Text>
                        </Link>
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          </Box>
        </CResponsiveSidebar>
        <CMonument>
          <Box width={"fit-content"} direction="row-responsive" wrap={true}>
            <GalleryMonument
              monumentMetadata={monumentMetadata}
              structure={structure}
              color={color}
              movement={movement}
              params={params}
            />
            <CMonumentMetadata
              monumentMetadata={monumentMetadata}
              setShowShareModal={setShowShareModal}
            />
          </Box>
        </CMonument>
      </Box>
      {showShareModal ? (
        <Layer
          onEsc={() => setShowShareModal(false)}
          onClickOutside={() => setShowShareModal(false)}
        >
          <Box pad={"large"} background={"#222"}>
            <Heading level={3}> Share Url with your Friends </Heading>
            <Text>{window.location.href}</Text>
          </Box>
        </Layer>
      ) : null}
    </Box>
  );
}
