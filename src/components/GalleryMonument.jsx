import { useContext, useEffect, useRef, useState } from "react";
import { Box, Heading, ResponsiveContext, Text } from "grommet";
import { run } from "../../core/src/run";
import * as blockchain from "../../core/buildings/final/block_chain";
import * as lissajous from "../../core/buildings/final/lissajous";
import * as mandelbrot from "../../core/buildings/final/mandelbrot";
import * as spiral from "../../core/buildings/final/spiral";
import * as watermelon from "../../core/buildings/final/watermelon";
import * as flower from "../../core/buildings/final/flower";
const programs = [
  mandelbrot,
  blockchain,
  watermelon,
  flower,
  spiral,
  lissajous,
];

export function GalleryMonument({
  monumentMetadata,
  structure,
  color,
  movement,
  params,
}) {
  const generatorRef = useRef(null);
  const size = useContext(ResponsiveContext);
  const [dim, setDim] = useState("medium");

  useEffect(() => {
    if (structure != -1) {
      if (generatorRef && structure != -1) {
        run(
          programs[structure],
          { element: generatorRef.current },
          { structure, color, movement, param: params }
        )
          .then(function (e) {})
          .catch(function (e) {});
      }
    }
  }, [monumentMetadata, structure, color, movement, params]);

  useEffect(() => {
    switch (size) {
      case "xsmall":
      case "small":
        setDim("large");
        break;
      case "medium":
        setDim("medium");
        break;
      case "large":
      case "xlarge":
        setDim("large");
        break;
      default:
        setDim("large");
    }
  }, [size]);

  return (
    <Box
      background={"#222"}
      width={"fit-content"}
      height={"fit-content"}
      id="sketch"
      align="center"
    >
      <Box>
        {monumentMetadata ? (
          <Heading
            level={3}
            margin="none"
            className="monument-name"
            style={{ textAlign: "center" }}
          >
            {`${monumentMetadata.monument_name} - ${size}`}
          </Heading>
        ) : null}
      </Box>
      <Box width={dim} height={dim}>
        {structure != -1 ? (
          <pre style={{ lineHeight: 1 }} ref={generatorRef}></pre>
        ) : null}
      </Box>
    </Box>
  );
}
