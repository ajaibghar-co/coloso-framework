import { Box, Heading, Paragraph, Text, Button } from "grommet";
import { CircleInformation } from "grommet-icons";
import { PlainLink } from "../components/PlainLink";

export default function About() {
  return (
    <Box fill background={"#222"}>
      <Box direction="row-responsive" pad={"small"}>
        <Box align="end">
          <PlainLink to="/">
            <Text
              size={"xlarge"}
              color="white"
              style={{ fontFamily: "wethard" }}
            >
              COLOSO
            </Text>
          </PlainLink>
        </Box>
        <Box flex="grow"></Box>

        <Box width={"0.4em"}></Box>
        <Box align="center" direction="row-responsive">
          <Button plain>
            <Box background={"white"} pad="xsmall" round={"xxsmall"}>
              <Text>
                {" "}
                <PlainLink to="/generator">Go to Factory</PlainLink>
              </Text>
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
      </Box>
      <Box>
        <Box width="large" alignSelf="center">
          <Paragraph fill size="large" color="white">
            Named after one of Puerto Rico’s largest sugary refineries from over
            200 years ago (1820-2003), “Coloso” is a virtual factory where you
            can produce digital monuments to commemorate closed LGBTQ+ spaces
            and buildings around the world. Instead of immobile statues and
            architectural elements, “Coloso” reimagines monuments as
            distributable digital icons and data which you can download,
            screenshoot, email, share, and print. Through this digital project
            on queering architectural research methods, the act of creating
            monuments both appropriates and rejects colonial ideals of
            memorialization; contests who and what is commemorated; democratizes
            who gets to commission; and reimagines the very materiality of
            monuments.
          </Paragraph>
          <Paragraph fill size="large" color="white">
            Directed by Regner Ramos and Kleanthis Kyriakou, Wet-Hard Agency is
            a collaborative practice operating at the intersection between
            queerness, digital practices, and architecture. It stems from the
            nature of our cultural and geographic origins as island-dwellers
            from different parts of the globe—the Caribbean and the
            Mediterranean—, and the actual physical distance that currently
            exists between us—Puerto Rico and the United Kingdom. Through
            design, story-telling, performances, drawing, and making, we explore
            the relationships between queer communities, digital space, and
            built environment. For our projects, we look to our historical and
            ancestral past as island dwellers to reconstruct our understandings
            of what architectural practice and research can be in a widely,
            web-connected 21st century.
          </Paragraph>
          <Paragraph fill size="large" color="white">
            This project was coded by Ajaibghar [Say more] and funded by the
            Graham Foundation 2021-2023.
          </Paragraph>
        </Box>
      </Box>
    </Box>
  );
}
