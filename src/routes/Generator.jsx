import { run } from "../../core/src/run";
// import * as program from "../../core/buildings/monument12.js";
import * as program from "../../core/buildings/demo.js";
import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  width: fit-content;
  height: fit-content;
  align-items: center;
`;

export default function Generator() {
  const generatorRef = useRef(null);
  const [structure, setStructure] = useState(0);
  const [color, setColor] = useState(0);
  const [movement, setMovement] = useState(0);

  function render() {
    if (generatorRef) {
      console.log("here");
      run(
        program,
        { element: generatorRef.current, cols: 53, rows: 20 },
        { structure, color, movement }
      )
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

  useEffect(() => {
    render();
  }, [structure, color, movement]);

  return (
    <Row>
      <Column>
        <Box>
          <h2>Harvest 3 out of 5</h2>

          <form>
            <Row>
              <input type="checkbox" id="option-a-1" />
              <label htmlFor="option-a">sinister</label>
            </Row>

            <Row>
              <input type="checkbox" id="option-a-2" />
              <label htmlFor="option-a">voguing</label>
            </Row>

            <Row>
              <input type="checkbox" id="option-a-1" />
              <label htmlFor="option-a">underground</label>
            </Row>

            <Row>
              <input type="checkbox" id="option-a-1" />
              <label htmlFor="option-a">tiny</label>
            </Row>

            <Row>
              <input type="checkbox" id="option-a-1" />
              <label htmlFor="option-a">sticky</label>
            </Row>

            <Row>
              <input type="checkbox" id="option-a-1" />
              <label htmlFor="option-a">cute</label>
            </Row>
          </form>
        </Box>
        <Box>
          <h2>Structure</h2>
          <input
            type="number"
            value={structure}
            onChange={(e) => {
              setStructure(e.target.value);
            }}
          />
        </Box>

        <Box>
          <h2>Color</h2>
          <input
            type="number"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
        </Box>

        <Box>
          <h2>Movement</h2>
          <input
            type="number"
            value={movement}
            onChange={(e) => {
              setMovement(e.target.value);
            }}
          />
        </Box>
      </Column>

      <Box>
        <pre ref={generatorRef}></pre>
      </Box>
    </Row>
  );
}
