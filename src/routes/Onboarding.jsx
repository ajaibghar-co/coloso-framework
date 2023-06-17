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
import * as program from "../../core/src/programs/demo9.js";
import Camera from "../../core/src/modules/camera.js";

import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Landing.css";
import { CircleInformation } from "grommet-icons";
import { PlainLink } from "../components/PlainLink";

const PageOne = () => (
  <Box>
    <Box background={"#E0C7A3"} pad={"small"} width="small" alignSelf="center">
      <Text>Press N to continue </Text>
    </Box>
  </Box>
);

const PageTwo = () => (
  <Box fill>
    <Box direction="row-responsive" pad={"small"}>
      <Box flex="grow"></Box>

      <Box width={"0.4em"}></Box>
      <Button plain>
        <Box background={"#E0C7A3"} pad="small">
          <PlainLink to="/warehouse">
            <Text> Go to Warehouse</Text>
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

    <Box fill justify="center">
      <Box
        background={"#E0C7A3CC"}
        pad={"large"}
        width={"large"}
        height={"fit-content"}
        alignSelf="center"
        gap={"medium"}
      >
        <Box align="center">
          <Heading size="medium" responsive={true} margin={{ top: "none" }}>
            Welcome to Coloso
          </Heading>
          <Text>
            In this factory, you’ll be able to create a one-of-a-kind “monument”
            in memory of an LGBTQ space that was important to you and/or a loved
            one.
          </Text>
          <Box height="1.2em"></Box>
          <Text>
            Once your monument is ready, it’ll be placed in our Warehouse where
            you’ll be able to keep it or send it to someone special.
          </Text>
        </Box>
        <Box
          background={"#D2E354"}
          pad="xsmall"
          width={"fit-content"}
          alignSelf="center"
        >
          <Text weight={900} size="large" style={{ textAlign: "center" }}>
            Press Y to continue{" "}
          </Text>
        </Box>
      </Box>
    </Box>
  </Box>
);

const PageThree = ({ monumentName }) => (
  <Box fill>
    <Box direction="row-responsive" pad={"small"}>
      <Box flex="grow"></Box>
      <Button plain>
        <Box background={"#E0C7A3"} pad="small">
          <PlainLink to="/warehouse">
            <Text> Go to Warehouse</Text>
          </PlainLink>
        </Box>
      </Button>
      <Box width={"0.4em"}></Box>
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
    <Box fill justify="center">
      <Box
        background={"#E0C7A3CC"}
        pad={"large"}
        width={"large"}
        height={"fit-content"}
        alignSelf="center"
        gap={"medium"}
      >
        <Box>
          <Heading
            size="medium"
            responsive={true}
            margin={{ top: "none", bottom: "none" }}
            style={{ textAlign: "center" }}
          >
            Plant
          </Heading>

          <Box height="1.2em"></Box>
          <Text style={{ textAlign: "center" }}>
            Monuments aren’t just for the wealthy and famous! Please type the
            name of the space you’re memorializing.{" "}
          </Text>
        </Box>

        <Box
          background={"#D2E354"}
          pad="xsmall"
          width={"fit-content"}
          alignSelf="center"
        >
          <Text weight={900} size="large" style={{ textAlign: "center" }}>
            Enter the monument name and press Enter{" "}
          </Text>
        </Box>
        <Box>
          <TextInput
            placeholder="monument name"
            value={monumentName}
            color="white"
          />
          <Text size="xsmall" color="red">{`${
            30 - monumentName.length
          }/30 characters remaining`}</Text>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default function Onboarding() {
  const generatorRef = useRef(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [monumentName, setMonumentName] = useState("");

  useEffect(() => {
    console.log("onboarding mounted");
    program.init();
  }, []);

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

  function disableCamera() {
    const video = Camera.init();
    video.pause();
    video.removeAttribute("src"); // video.src = '' works so this line can be deleted
    video.load();
    video.src = "";
    video.srcObject = null;
    video.remove();
  }

  return (
    <Keyboard
      target="document"
      onKeyDown={(e) => {
        if (e.key === "y" || e.key === "Y") {
          if (page !== 3) {
            setPage(page + 1);
          }
        }
        if (page === 3) {
          console.log(e);
          if (e.key != "Enter") {
            if (
              (e.keyCode >= 65 && e.keyCode <= 90) ||
              (e.keyCode >= 48 && e.keyCode <= 57)
            ) {
              // console.log("pressed :", e.key);
              if (monumentName.length < 30) {
                setMonumentName(monumentName + e.key);
              }
            }
          } else {
            disableCamera();
            navigate(`/factory/${monumentName}`);
          }
        }
      }}
      onBackspace={() => {
        if (page != 3) {
          setPage(page - 1);
        } else {
          setMonumentName(monumentName.slice(0, monumentName.length - 1));
        }
      }}
    >
      <div style={{ height: "100vh" }}>
        <Box full>
          <pre id="langingpre" ref={generatorRef}></pre>
          {page === 1 ? (
            <div id="welcome-parent">
              {/* <h1 id="welcome">COLOSO</h1> */}
              <div>
                <h1 id={"welcome"}>COLOSO</h1>
              </div>
              <br />
              <p id="press-y">Press Y to continue</p>
            </div>
          ) : null}
          {page === 2 || page === 3 ? (
            <Text size={"xlarge"} color="white" id="coloso-logo">
              COLOSO
            </Text>
          ) : null}
        </Box>
        <Layer
          animation={false}
          background={"none"}
          full={true}
          modal={false}
          plain={true}
          position="center"
          style={{ justifyContent: "center" }}
        >
          {page === 2 ? <PageTwo /> : null}
          {page === 3 ? <PageThree monumentName={monumentName} /> : null}
        </Layer>
      </div>
    </Keyboard>
  );
}
