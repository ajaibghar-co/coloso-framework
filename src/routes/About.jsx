import { Box, Heading, Paragraph, Text } from "grommet";

export default function About() {
  return (
    <Box>
      <Box align="start">
        <Text size={"xlarge"} color="#E1C79C" margin={"none"}>
          COLOSO
        </Text>
        <Text size={"small"} weight={100} color="#E1C79C" margin={"none"}>
          factory{" "}
        </Text>
      </Box>
      <Box width="large" alignSelf="center">
        <Paragraph fill size="large" color="white">
          Named after one of Puerto Rico’s largest sugary refineries from over
          200 years ago (1820-2003), “Coloso” is a virtual factory where you can
          produce digital monuments to commemorate closed LGBTQ+ spaces and
          buildings around the world. Instead of immobile statues and
          architectural elements, “Coloso” reimagines monuments as distributable
          digital icons and data which you can download, screenshoot, email,
          share, and print. Through this digital project on queering
          architectural research methods, the act of creating monuments both
          appropriates and rejects colonial ideals of memorialization; contests
          who and what is commemorated; democratizes who gets to commission; and
          reimagines the very materiality of monuments.
        </Paragraph>
        <Paragraph fill size="large" color="white">
          Directed by Regner Ramos and Kleanthis Kyriakou, Wet-Hard Agency is a
          collaborative practice operating at the intersection between
          queerness, digital practices, and architecture. It stems from the
          nature of our cultural and geographic origins as island-dwellers from
          different parts of the globe—the Caribbean and the Mediterranean—, and
          the actual physical distance that currently exists between us—Puerto
          Rico and the United Kingdom. Through design, story-telling,
          performances, drawing, and making, we explore the relationships
          between queer communities, digital space, and built environment. For
          our projects, we look to our historical and ancestral past as island
          dwellers to reconstruct our understandings of what architectural
          practice and research can be in a widely, web-connected 21st century.
        </Paragraph>
        <Paragraph fill size="large" color="white">
          This project was coded by Ajaibghar [Say more] and funded by the
          Graham Foundation 2021-2023.
        </Paragraph>
      </Box>
    </Box>
  );
}
