import { run } from "../../core/src/run";
// import * as program from "../../core/buildings/monument12.js";
import * as program from "../../core/src/programs/demo8.js";
import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import { Box } from "../components/Layout";

const Layer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: ${(props) => (props.$z ? props.$z : -1)};
`;

export default function Landing() {
  const generatorRef = useRef(null);
  const navigate = useNavigate();

  function render() {
    if (generatorRef) {
      console.log("here");
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
    <div style={{ height: "100vh" }}>
      <Layer z={1}>
        <pre ref={generatorRef}></pre>
      </Layer>
      <Layer z={4}>
        <Box id={"title"}>
          <h1 id="welcome">COLOSO</h1>
          {/* <input
            // style={{ visibility: "hidden" }}
            autoFocus={true}
            onChange={() => {
              navigate("/generator");
            }}
          /> */}
        </Box>
      </Layer>
    </div>
  );
}
