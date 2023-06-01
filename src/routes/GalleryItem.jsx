import axios, { all } from "axios";
import { Box, Heading, Text, TextInput } from "grommet";
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
import { Search } from "grommet-icons";

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
    <Box direction={"row-responsive"} background={"#222"} fill flex="grow">
      <Box
        background={"#222"}
        width={"medium"}
        pad={"small"}
        gap={"small"}
        height={"100vh"}
        overflow={"scroll"}
      >
        <Box direction="row-responsive" gap="small" align="center">
          <TextInput
            placeholder="monument name"
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
      <Box width={"large"} height={"large"}>
        <Box flex="grow" pad={"small"}>
          <Text>
            You’ve entered Coloso’s warehouse! Here you’ll be able to scroll
            through the monuments created by all of Coloso’s visitors from all
            around the world. You’ll also be able to distribute any of the
            monuments as you wish, by downloading, screen-shooting, emailing,
            sharing, and printing.
          </Text>
        </Box>
        {structure != -1 ? (
          <pre id="langingpre" ref={generatorRef}></pre>
        ) : (
          <Box alignSelf="center">
            <Box fill={true} />
            <Text>Waiting for result...</Text>
          </Box>
        )}
        {monumentMetadata && (
          <Box>
            <Heading level={3} color={"white"} margin="none">
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
