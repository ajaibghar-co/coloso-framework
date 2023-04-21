import { run } from "../../core/src/run";
import {
  Keyboard,
  Heading,
  Text,
  Paragraph,
  Box,
  Layer,
  TextInput,
  Button,
} from "grommet";
import * as program from "../../core/src/programs/demo8.js";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const PageOne = () => (
  <Box id={"title"}>
    <h1 id="welcome">COLOSO</h1>
    <Box background={"#E0C7A3"} pad={"small"}>
      <Text>Press Y to continue </Text>
    </Box>
  </Box>
);

const PageTwo = () => (
  <Box fill>
    <Box direction="row-responsive" pad={"small"}>
      <Text size={"xlarge"} color="#E1C79C">
        COLOSO
      </Text>
      <Box flex="grow"></Box>
      <Button plain>
        <Box background={"white"} pad="small">
          <Text> Go to Factory</Text>
        </Box>
      </Button>
      <Box width={"0.4em"}></Box>
      <Button plain>
        <Box background={"white"} pad="small">
          <Text> Go to Warehouse</Text>
        </Box>
      </Button>
    </Box>

    <Box fill justify="center">
      <Box
        background={"#E0C7A3CC"}
        pad={"large"}
        width={"medium"}
        height={"fit-content"}
        alignSelf="center"
        gap={"medium"}
      >
        <Box background={"#D2E354"} align="center">
          <Text weight={900}>Coloso Intro Text</Text>
          <Text>(about this experience and what to expect)</Text>
        </Box>
        <Text>Press Y to continue </Text>
      </Box>
    </Box>
  </Box>
);

const PageThree = ({ monumentName }) => (
  <Box
    background={"#E0C7A3EE"}
    pad={"large"}
    width={"medium"}
    height={"fit-content"}
    alignSelf="center"
    justify="center"
    gap={"medium"}
  >
    <Box>
      <Text weight={900} color={"black"}>
        PLANT
      </Text>
      <Box height="1.2em"></Box>
      <Text color={"black"}>Think about the space you want to build ....</Text>
      <Text color={"black"}>... . . .. ... . .. ... .... .. . ... ....</Text>
      <Text color={"black"}>... and name your monument</Text>
    </Box>
    <Box height="2em"></Box>
    <Text color={"black"}>Enter the monument name and press Enter </Text>
    <TextInput placeholder="monument name" value={monumentName} />
  </Box>
);

export default function Landing() {
  const generatorRef = useRef(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [monumentName, setMonumentName] = useState("");

  function render() {
    if (generatorRef) {
      run(program, { element: generatorRef.current })
        .then(function (e) {
          console.log(e);
        })
        .catch(function (e) {
          console.log(e);
          console.warn(e.message);
          console.log(e.error);
        });
    }
  }

  useEffect(() => {
    render();
  }, [generatorRef]);

  return (
    <Keyboard
      target="document"
      onKeyDown={(e) => {
        if (e.key === "y" || e.key === "Y") {
          setPage(page + 1);
        }
        if (page === 3) {
          if (e.key != "Enter") {
            setMonumentName(monumentName + e.key);
          } else {
            navigate(`/generator/${monumentName}`);
          }
        }
      }}
      onBackspace={() => {
        setPage(page - 1);
      }}
    >
      <div style={{ height: "100vh" }}>
        <Box full>
          <pre ref={generatorRef}></pre>
        </Box>
        <Layer
          animation={false}
          background={"none"}
          full={true}
          modal={"false"}
          plain={true}
          position="center"
          style={{ justifyContent: "center" }}
        >
          {page === 1 ? <PageOne /> : null}
          {page === 2 ? <PageTwo /> : null}
          {page === 3 ? <PageThree monumentName={monumentName} /> : null}
        </Layer>
      </div>
    </Keyboard>
  );
}
