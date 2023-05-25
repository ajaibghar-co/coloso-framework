export const settings = {
  once: true,
  color: "#CDD8E3",
};

export function main() {
  // Also try: ╩ ╦ or ▄ ░
  // or any combination from
  // https://play.ertdfgcvb.xyz/abc.html#font:characterset
  return Math.random() < 0.5 ? "░" : "▄";
}
