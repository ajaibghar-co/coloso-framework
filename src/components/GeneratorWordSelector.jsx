import { Box, Text, Button, Stack } from "grommet";
import { ClearOption } from "grommet-icons";
import { useEffect, useState } from "react";

// source : https://stackoverflow.com/a/19270021/2767642
function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function GeneratorWordSelector({ choiceWords, onHarvestClicked, active, cta }) {
  const [sampledChoices, setSampledChoices] = useState(
    getRandom(Object.keys(choiceWords), 5)
  );
  const [choices, setChoices] = useState([]);

  function resampleChoices() {
    setSampledChoices(getRandom(Object.keys(choiceWords), 5));
    setChoices([]);
    onHarvestClicked("None");
  }

  function computeOutput() {
    // map the selection to keyword
    let value = 0;
    // console.log({ choiceWords });
    // console.log({ sampledChoices });
    // console.log({ choices });
    let count = {};
    for (const choice of choices) {
      // console.log(choice);
      if (!count[choiceWords[choice]]) {
        count[choiceWords[choice]] = 0;
      }
      count[choiceWords[choice]]++;
    }
    let maxCount = 0;
    let maxLabel = "";
    // console.log({ count });
    for (const choiceCount in count) {
      // console.log(choiceCount);
      if (maxCount < count[choiceCount]) {
        maxCount = count[choiceCount];
        maxLabel = choiceCount;
      }
    }

    onHarvestClicked(maxLabel);
  }

  return (
    <Box background={"white"} pad={"xsmall"}>
      <Stack anchor={"center"} fill={true}>
        <Box gap={"medium"}>
          <Box direction={"row-responsive"}>
            <Box>
              <Text color={"black"}>Pick 3 out of 5</Text>
            </Box>
            <Box flex={"grow"}></Box>
            <Button
              icon={<ClearOption color={"black"} size="medium" />}
              plain
              onClick={resampleChoices}
            />
          </Box>
          <Box>
            <Box align="center">
              {sampledChoices.slice(0, 5).map((choice, ix) => (
                <Button
                  plain
                  key={ix}
                  onClick={() => {
                    if (choices.length < 3) {
                      setChoices([...choices, choice]);
                    }
                  }}
                >
                  <Box
                    background={choices.includes(choice) ? "#E6D7B3" : "white"}
                  >
                    <Text color={choices.includes(choice) ? "black" : "gray"}>
                      {choice}
                    </Text>
                  </Box>
                </Button>
              ))}
            </Box>
          </Box>

          <Box align="center">
            <Button
              plain
              active={active && choices.length === 3}
              onClick={computeOutput}
            >
              <Box
                background={active && choices.length === 3 ? "#E6D7B3" : "grey"}
                alignSelf="center"
                width={"fit-content"}
                pad={"xxsmall"}
                round={"xxsmall"}
              >
                <Text size={"small"}>{cta}</Text>
              </Box>
            </Button>
          </Box>
        </Box>
        {/* <Box background={"red"} fill flex={"grow"}>
          hi
        </Box> */}
      </Stack>
    </Box>
  );
}

export default GeneratorWordSelector;
