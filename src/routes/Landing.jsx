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
import * as emptyProgram from "../../core/src/programs/empty.js";

import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const generatorRef = useRef(null);
  const navigate = useNavigate();

  function render() {
    if (generatorRef) {
      run(emptyProgram, { element: generatorRef.current })
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
          console.log("hi");
          navigate(`/onboarding`);
        }
      }}
    >
      <div style={{ height: "100vh" }}>
        <Box full class="camera-bg">
          <pre id="langingpre" ref={generatorRef}></pre>
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
          <Box id={"title"}>
            <Box
              background={"#E0C7A3"}
              pad={"medium"}
              width={"large"}
              alignSelf="center"
            >
              <h1 style={{ textAlign: "center" }}>
                This Experience requires access to your webcam.
              </h1>
              <Text
                size="large"
                style={{ textAlign: "center" }}
                margin={{ bottom: "medium" }}
              >
                This is best viewed on a laptop or desktop.
              </Text>
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
        </Layer>
      </div>
    </Keyboard>
  );
}
