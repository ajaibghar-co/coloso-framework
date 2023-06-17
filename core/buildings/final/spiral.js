/**
@author opheliagame
@title  spiral
@desc   
*/

export const settings = {
  fontSize: "18px",
  backgroundColor: "#222",
};

const { sin, cos, tan, PI } = Math;
import { densities, density1, density2, rdensity } from "../utils/density.js";
import { floor, mulN, vec2 } from "../../src/modules/vec2.js";
import { fract } from "../../src/modules/num.js";
import { gnoise, random } from "../../sugarrush/generative.js";
import { lineSDF } from "../../sugarrush/sdf.js";
import { colors, colors_wha, rcolor } from "../utils/colors.js";
import { sdSegment } from "../../src/modules/sdf.js";
import { patterns } from "../utils/pattern.js";

// storage variables
let sDensity;
let iDensity = localStorage.getItem("sketch-idensity");
let swidth = localStorage.getItem("sketch-swidth");
if (swidth == null || iDensity == null) {
  swidth = Math.random() * 10;
  iDensity = Math.floor(Math.random() * densities.length);
  localStorage.setItem("sketch-swidth", swidth);
  localStorage.setItem("sketch-idensity", iDensity);
} else {
  swidth = parseFloat(swidth);
  iDensity = parseInt(iDensity);
  sDensity = densities[iDensity];
}
console.log("sDensity: ", sDensity);

export function main(coord, context, cursor, buffer, data) {
  if(data.param != null) {
    iDensity = data.param['sketch-idensity']
    swidth = data.param['sketch-swidth']
    sDensity = densities[iDensity]
  }

  let sColors = data.color != -1 ? colors[data.color] : ["white"];
  let sPattern1 = data.movement != -1 ? patterns[data.movement] : patterns[0];
  let t = data.movement != -1 ? context.time * 0.001 : 0;

  const m = Math.min(context.cols, context.rows);
  const a = context.metrics.aspect;

  let st = {
    x: ((2.0 * (coord.x - context.cols / 2)) / m) * a,
    y: (2.0 * (coord.y - context.rows / 2)) / m,
  };

  let pt = {
    x: fract(st.x * 2.0) - 0.5,
    y: fract(st.y * 4.0) - 0.5,
  };

  let { cols, rows, frame } = context;
  const { x, y } = coord;

  let index = Math.pow(x, Math.sin(y) * 2);
  // index = x

  // previous
  let st1 = floor(mulN(st, 6));
  // let rx = (gnoise(st.y+seed)) - Math.abs(Math.sin(st.y+seed))
  // let rx1 = gnoise(st.y * 2 + seed)

  let rxh = gnoise(st.y + swidth + t);
  let rxl = Math.abs(Math.sin(st.y * 5 - t)) * rxh;
  let rxr = Math.abs(Math.sin(st.y * 5 + t)) * rxh;
  let s1 = sdSegment(st, vec2(-rxl, st.y), vec2(rxr, st.y), 0.01);
  // let s1 = sdSegment(st, vec2(-rx, st.y), vec2(rx1, st.y), 0.01)

  let move = Math.abs(Math.sin(x + t) * sDensity.length);

  index = Math.floor(index + move) % sDensity.length;
  // index = Math.floor(index+move) % sDensity.length;

  let mod1 = sPattern1(coord, context, t);

  // return mody
  return {
    char: sDensity[index],
    char: s1 < 0.0 ? sDensity[index] : "",
    color: s1 < 0.0 ? sColors[mod1 % sColors.length] : "white",
  };
}
