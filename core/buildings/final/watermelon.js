/**
@author opheliagame
@title  watermelon 
*/

export const settings = {
  backgroundColor: "#222",
};

import {
  sdCircle,
  sdSegment,
  opSmoothUnion,
  opSmoothIntersection,
  opSmoothSubtraction,
} from "../../src/modules/sdf.js";
import { clamp, map, fract } from "../../src/modules/num.js";
import { vec2, length, add } from "../../src/modules/vec2.js";
import { densities, rdensity } from "../utils/density.js";
import { sort } from "../../src/modules/sort.js";
import { mul, mulN, sub, subN } from "../../src/modules/vec2.js";
import { colors } from "../utils/colors.js";
import { block1 } from "../blocks/block1.js";
import { pattern6, patterns } from "../utils/pattern.js";

const { sin, cos, floor, pow, max, atan2, PI } = Math;

// storage variables
let seed1 = Math.random() * 10000.0;
let seed2 = Math.random() * 10000.0;
let seed3 = Math.random() * 10000.0;
let seed4 = Math.random() * 10000.0;
let iDensity = Math.floor(Math.random() * densities.length);
let sDensity = densities[iDensity]
localStorage.setItem("sketch-seed1", seed1);
localStorage.setItem("sketch-seed2", seed2);
localStorage.setItem("sketch-seed3", seed3);
localStorage.setItem("sketch-seed4", seed4);
localStorage.setItem("sketch-idensity", iDensity);
// seed1 = parseFloat(seed1);
// seed2 = parseFloat(seed2);
// seed3 = parseFloat(seed3);
// seed4 = parseFloat(seed4);
// iDensity = parseInt(iDensity);
// sDensity = densities[iDensity];
console.log("sDensity: ", sDensity);

export function main(coord, context, cursor, buffer, data) {
  if (data.param != undefined) {
    iDensity = data.param["sketch-idensity"];
    seed1 = data.param["sketch-seed1"];
    seed2 = data.param["sketch-seed2"];
    seed3 = data.param["sketch-seed3"];
    seed4 = data.param["sketch-seed4"];
    sDensity = densities[iDensity];
  }

  let sColors = data.color != -1 ? colors[data.color] : ['white']
  let sPattern1 = data.movement != -1 ? patterns[data.movement] : patterns[0]
	let t = data.movement != -1 ? 0 : 0

  const m = max(context.cols, context.rows);
  const a = context.metrics.aspect;

  let st = {
    x: ((2.0 * (coord.x - context.cols / 2)) / m) * a,
    y: (2.0 * (coord.y - context.rows / 2)) / m,
  };

  let c1 = vec2(coord.x, clamp(coord.y, 0, context.rows / 4));
  let c2 = vec2(
    coord.x,
    clamp(coord.y, context.rows / 4, (context.rows * 2) / 4)
  );
  let c3 = vec2(
    coord.x,
    clamp(coord.y, (context.rows * 2) / 4, (context.rows * 3) / 4)
  );
  let c4 = vec2(coord.x, clamp(coord.y, (context.rows * 3) / 4, context.rows));
  let b1 = block1(c1, context, data, -1.0, 1.0, seed1);
  let b2 = block1(c2, context, data, -1.0, 1.0, seed2);
  let b3 = block1(c3, context, data, -1.0, 1.0, seed3);
  let b4 = block1(c4, context, data, -1.0, 1.0, seed4);
  let b = b1 + b2 + b3 + b4;

  // if(coord.y < 5 || coord.y > (context.rows-5)) {
  // 	b = 0
  // }

  let mod1 = Math.floor(b + (b % 2) * t + (b % 3) * t);

  let mod2 = pattern6(coord, context, t);

  return {
    // char: s1 > 0.0 ? d1[mod1]
    // 			: s2 > 0.0 ? d2[mod1]
    // 			: s3 > 0.0 ? d3[mod1]
    // 			: s4 > 0.0 ? d4[mod1] : '',
    char: b ? sDensity[mod1 % sDensity.length] : "",
    // char: st.y,
    // char: clamp(coord.y, 20, context.rows/4),
    color: b ? sColors[mod2 % sColors.length] : "white",
    backgroundColor: "#222",
  };
}
