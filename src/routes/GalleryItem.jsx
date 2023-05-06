import axios, { all } from "axios";
import { Box, Heading, Text } from "grommet";
import { useEffect, useRef, useState } from "react";
import { run } from "../../core/src/run";
import * as mandelbrot from "../../core/buildings/final/mandelbrot";
import * as blockchain from "../../core/buildings/final/block_chain";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const programs = [mandelbrot, blockchain];

export default function GalleryItem() {
  const generatorRef = useRef(null);
  const [structure, setStructure] = useState(1);
  const [color, setColor] = useState(-1);
  const [movement, setMovement] = useState(-1);
  const [monumentMetadata, setMonumentMetadata] = useState(undefined);
  const [allMonumentsList, setAllMonumentsList] = useState([]);
  const [uptoPageNum, setUptoPageNum] = useState(0);
  const location = useLocation();

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

    (async function getMonument() {
      const { data: monument } = await axios.get(
        `http://localhost:3000/monument/${monumentId}`
      );
      setStructure(monument.structure);
      setColor(monument.color);
      setMovement(monument.movement);
      setMonumentMetadata({ ...monument });

      const { data: monumentPage } = await axios.get(
        `http://localhost:3000/monument/page/${uptoPageNum}`
      );
      console.log(monumentPage);
      setAllMonumentsList(monumentPage);
      render();
    })();
    return () => {};
  }, [location]);
  return (
    <Box direction={"row-responsive"}>
      <Box
        background={"black"}
        width={"medium"}
        pad={"small"}
        gap={"small"}
        height={"100vh"}
        overflow={"scroll"}
      >
        {allMonumentsList &&
          allMonumentsList.map((monument, ix) => {
            return (
              <Box key={ix}>
                <Link to={`/gallery/${monument.id}`}>
                  {monument.monument_name}
                </Link>
              </Box>
            );
          })}
      </Box>
      <Box width={"large"} height={"large"}>
        {structure != -1 ? (
          <pre ref={generatorRef}></pre>
        ) : (
          <Box alignSelf="center">
            <Box fill={true} />
            <Text>Waiting for result...</Text>
          </Box>
        )}
        {monumentMetadata && (
          <Box>
            <Heading level={3} color={"white"}>
              {`${monumentMetadata.monument_name}`}
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
