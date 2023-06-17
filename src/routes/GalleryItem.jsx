import axios, { all } from "axios";
import { Box, Heading, Text, TextInput, Button, Paragraph } from "grommet";
import { useEffect, useRef, useState } from "react";
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

export default function GalleryItem() {
  const generatorRef = useRef(null);
  const [structure, setStructure] = useState(-1);
  const [color, setColor] = useState(-1);
  const [movement, setMovement] = useState(-1);
  const [monumentMetadata, setMonumentMetadata] = useState(undefined);
  const [allMonumentsList, setAllMonumentsList] = useState([]);
  const [uptoPageNum, setUptoPageNum] = useState(0);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  function render() {
    if (generatorRef && structure != -1) {
      run(
        programs[structure],
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
    const monumentId = location.pathname.split("/")[2];
    console.log({ monumentId });

    if (monumentId) {
      (async function getMonument() {
        const { data: monument } = await axios.get(
          `${config.serverUrl}/monument/slug/${monumentId}`
        );

        console.log({ monument });
        setStructure(monument.structure);
        setColor(monument.color);
        setMovement(monument.movement);
        setMonumentMetadata({ ...monument });

        const params = JSON.parse(monument.params);

        for (let key in params) {
          localStorage.setItem(key, params[key]);
        }

        const { data: monumentPage } = await axios.get(
          `${config.serverUrl}/monument/page/${uptoPageNum}`
        );
        // console.log(monumentPage);
        setAllMonumentsList(monumentPage);
        render();
      })();
    }
    return () => {};
  }, [location]);

  useEffect(() => {
    if (structure != -1) {
      render();
    }
  }, [structure, color, movement]);

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
    <Box background={"#222"} fill>
      <Box direction="row-responsive" pad={"small"}>
        <Box align="end">
          <Text size={"xlarge"} color="white" style={{ fontFamily: "wethard" }}>
            COLOSO
          </Text>
          <Text size={"small"} weight={100} color="#E1C79C" margin={"none"}>
            warehouse{" "}
          </Text>
        </Box>
        <Box flex="grow"></Box>

        <Box width={"0.4em"}></Box>
        <Box align="center" direction="row-responsive">
          <Button plain>
            <Box background={"white"} pad="xsmall" round={"xxsmall"}>
              <PlainLink to="/factory">
                <Text> Go to Factory</Text>
              </PlainLink>
            </Box>
          </Button>
          <Button
            icon={
              <Box>
                <PlainLink to={"/about"}>
                  <CircleInformation size={"medium"} />
                </PlainLink>
              </Box>
            }
          ></Button>
        </Box>
      </Box>

      <Box direction={"row-responsive"} pad="small">
        <Box gap={"small"}>
          <Box
            background={"#222"}
            width={"medium"}
            pad={"small"}
            gap={"small"}
            flex={"grow"}
          >
            <Paragraph fill={true}>
              You’ve entered Coloso’s warehouse! Here you’ll be able to scroll
              through the monuments created by all of Coloso’s visitors from all
              around the world. You’ll also be able to distribute any of the
              monuments as you wish, by downloading, screen-shooting, emailing,
              sharing, and printing.
            </Paragraph>
          </Box>
          <Box
            background={"#222"}
            width={"medium"}
            pad={"small"}
            gap={"small"}
            overflow={"scroll"}
            border={{ color: "#E0C7A3" }}
            round="small"
            fill={"vertical"}
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
        <Box direction="row-responsive" wrap={true}>
          <Box
            width={"large"}
            height={"large"}
            id="sketch"
            align="center"
            background={"#222"}
          >
            {monumentMetadata ? (
              <Heading
                level={3}
                margin="none"
                className="monument-name"
                style={{ textAlign: "center" }}
              >
                {`${monumentMetadata.monument_name}`}
              </Heading>
            ) : null}
            {structure != -1 ? (
              <pre style={{ lineHeight: 1 }} ref={generatorRef}></pre>
            ) : null}
          </Box>
          {monumentMetadata && (
            <Box flex="grow" justify="center">
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
                    navigator.clipboard.writeText(window.location.href);
                    alert("Monument URL has been copied to your clipboard");
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
      </Box>
    </Box>
  );
}

export async function loader() {
  // const { data: monument } = await axios.get(
  //   "http://localhost:3000/monument/1"
  // );
  // const { data: monumentPage } = await axios.get(
  //   `http://localhost:3000/monument/page/0`
  // );
  // return { monument, monumentPage };
  return {};
}
