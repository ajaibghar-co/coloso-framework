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

const programs = [
  mandelbrot,
  blockchain,
  watermelon,
  flower,
  spiral,
  lissajous,
];

export default function GalleryItem() {
  const generatorRef = useRef(null);
  const [structure, setStructure] = useState(1);
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
          `http://localhost:3000/monument/slug/${monumentId}`
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
          `http://localhost:3000/monument/page/${uptoPageNum}`
        );
        // console.log(monumentPage);
        setAllMonumentsList(monumentPage);
        render();
      })();
    }
    return () => {};
  }, [location]);

  useEffect(() => {
    render();
  }, [structure, color, movement]);

  useEffect(() => {
    (async function search() {
      if (searchTerm !== "") {
        const { data: monumentPage } = await axios.get(
          `http://localhost:3000/monument/search/${searchTerm}`
        );
        setAllMonumentsList(monumentPage);
      } else {
        const { data: monumentPage } = await axios.get(
          `http://localhost:3000/monument/page/${uptoPageNum}`
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
              <PlainLink to="/generator">
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
      <Box flex="grow" pad={"small"}>
        <Paragraph fill={true}>
          You’ve entered Coloso’s warehouse! Here you’ll be able to scroll
          through the monuments created by all of Coloso’s visitors from all
          around the world. You’ll also be able to distribute any of the
          monuments as you wish, by downloading, screen-shooting, emailing,
          sharing, and printing.
        </Paragraph>
      </Box>
      <Box direction={"row-responsive"} pad="small">
        <Box
          background={"#222"}
          width={"medium"}
          pad={"small"}
          gap={"small"}
          overflow={"scroll"}
          border={{ color: "#E0C7A3" }}
          round="small"
          height="fit-content"
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
                  <Link to={`/gallery/${monument.slug}`}>
                    <Text color={"white"}>{monument.monument_name}</Text>
                  </Link>
                </Box>
              );
            })}
        </Box>
        <Box width={"large"} height={"large"} direction="row-responsive">
          {structure != -1 ? (
            <pre style={{ lineHeight: 1 }} ref={generatorRef}></pre>
          ) : (
            <Box alignSelf="center">
              <Box fill={true} />
              <Text>Waiting for result...</Text>
            </Box>
          )}
          {monumentMetadata && (
            <Box flex="grow" justify="center">
              <Heading
                level={3}
                margin="none"
                className="monument-name"
                style={{ textAlign: "center" }}
              >
                {`${monumentMetadata.monument_name}`}
              </Heading>
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
