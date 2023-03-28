import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
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

export { Row, Column, Box };
