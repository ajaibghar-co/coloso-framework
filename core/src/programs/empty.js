export const settings = {
  once: true,
  color: "#CDD8E3",
};

const colors_wha = [
  "#ADD5AE",
  "#E0C7A3",
  "#EEBC32",
  "#EDC8CB",
  "#B94982",
  "#B7AAD0",
  "#7495B1",
  "#CDD8E3",
  "#586945",
];

export function main() {
  // Also try: ╩ ╦ or ▄ ░
  // or any combination from
  // https://play.ertdfgcvb.xyz/abc.html#font:characterset
  return {
    char: Math.random() < 0.5 ? "░" : "▄",
    color: colors_wha[Math.floor(Math.random() * colors_wha.length)],
  };
}
