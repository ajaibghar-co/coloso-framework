import { run } from "../../core/src/run";
import * as program from "../../core/buildings/final/flower";
import { useRef, useEffect } from "react";
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

export default function GeneratorFlower() {
  const generatorRef = useRef(null);
  useEffect(() => {
    if (generatorRef) {
      console.log("here");
      run(program, { element: generatorRef.current, cols: 53, rows: 20 })
        .then(function (e) {
          console.log(e);
        })
        .catch(function (e) {
          console.log(e);
          console.warn(e.message);
          console.log(e.error);
        });
    }
    console.log(generatorRef);
  }, [generatorRef]);

  return (
    <Row>
      <Box>
        <h2>Harvest 3 out of 5</h2>

        <form>
          <Row>
            <input type="checkbox" id="option-a-1" />
            <label for="option-a">sinister</label>
          </Row>

          <Row>
            <input type="checkbox" id="option-a-2" />
            <label for="option-a">voguing</label>
          </Row>

          <Row>
            <input type="checkbox" id="option-a-1" />
            <label for="option-a">underground</label>
          </Row>

          <Row>
            <input type="checkbox" id="option-a-1" />
            <label for="option-a">tiny</label>
          </Row>

          <Row>
            <input type="checkbox" id="option-a-1" />
            <label for="option-a">sticky</label>
          </Row>

          <Row>
            <input type="checkbox" id="option-a-1" />
            <label for="option-a">cute</label>
          </Row>
        </form>
      </Box>

      <Box>
        <pre ref={generatorRef}></pre>
      </Box>
    </Row>
  );
}
