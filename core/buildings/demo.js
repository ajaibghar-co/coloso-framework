export const settings = {
  backgroundColor: "#222",
  fontSize: "12px",
  color: "white",
  cols: 53,
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
