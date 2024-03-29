import { Box, Text, Button, Stack } from "grommet";
import { useState } from "react";
import RefreshIcon from "./RefreshIcon";
import { getRandom, sample2Choices } from "../selection";

function GeneratorWordSelector({
  map,
  set,
  onHarvestClicked,
  active,
  instruction,
  cta,
  onReset,
}) {
  const choiceSubSet = sample2Choices(set, map);

  const [sampledChoices, setSampledChoices] = useState(
    getRandom(choiceSubSet, 9)
  );
  console.log({ choiceSubSet, sampledChoices });
  const [choices, setChoices] = useState([]);

  function resampleChoices() {
    let choiceSubSet = sample2Choices(set, map);
    setSampledChoices(getRandom(choiceSubSet, 9));
    setChoices([]);
    onReset();
  }

  function computeOutput() {
    // map the selection to keyword
    let value = 0;
    // console.log({ choiceWordsMap });
    // console.log({ sampledChoices });
    // console.log({ choices });
    let count = {};
    for (const choice of choices) {
      // console.log(choice);
      if (!count[map[choice]]) {
        count[map[choice]] = 0;
      }
      count[map[choice]]++;
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

    onHarvestClicked({ label: maxLabel, choices: choices });
  }

  return (
    <Stack>
      <Box
        background={"#e0c7a3bb"}
        pad={"small"}
        round={"xsmall"}
        flex="grow"
        gap={"medium"}
        height={"fit-content"}
      >
        {/* <Stack anchor={"center"} fill={true}> */}

        <Box>
          <Text color={"black"} weight={700}>
            {instruction}
          </Text>
          <Box direction={"row-responsive"}>
            <Box>
              <Text style={{ fontStyle: "italic" }} size="small">
                Pick 3 out of 9
              </Text>
            </Box>
            <Box flex={"grow"}></Box>
            <Button icon={<RefreshIcon />} plain onClick={resampleChoices} />
          </Box>
        </Box>
        <Box>
          <Box align="center" gap={"xxsmall"}>
            {sampledChoices.slice(0, 9).map((choice, ix) => (
              <Button
                plain
                key={ix}
                onClick={() => {
                  if (!choices.includes(choice)) {
                    if (choices.length < 3) {
                      setChoices([...choices, choice]);
                    }
                  }
                }}
              >
                <Box
                  background={choices.includes(choice) ? "white" : "e0c7a3"}
                  pad={"xxsmall"}
                >
                  <Text>{choice}</Text>
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
              background={active && choices.length === 3 ? "#CDD8E3" : "grey"}
              alignSelf="center"
              width={"fit-content"}
              pad={"xsmall"}
              round={"xxsmall"}
            >
              <Text size={"small"}>{cta}</Text>
            </Box>
          </Button>
        </Box>
      </Box>
      {!active ? <Box fill background={"#e0c7a3bb"}></Box> : null}
    </Stack>
  );
}

export default GeneratorWordSelector;
