export const settings = {
  backgroundColor: "yellow",
  fontSize: "12px",
  color: "white",
  cols: 50,
  rows: 20,
};

const characters = ["▓", "┹", "┿", "╬", "╳", "◩"];
const colors = ["white", "yellow", "aqua", "red", "green", "blue"];

export function main(coord, context, cursor, buffer, data) {
  return {
    char: characters[data.structure],
    color: colors[data.color],
  };
}
