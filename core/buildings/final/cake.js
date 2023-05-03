/**
@author opheliagame
@title  monument 5
@desc   pursy syrup 
*/

export const settings = {
  backgroundColor : '#222'
}

const density = '█▓▒░ ';
// const density = 'have you eaten'


import { sdCircle, sdSegment, opSmoothUnion, opSmoothIntersection, opSmoothSubtraction } from '../../src/modules/sdf.js'
import { length, max, vec2, add, sub, mulN } from '../../src/modules/vec2.js'
import { mix, map, smoothstep, smootherstep, fract } from '../../src/modules/num.js';
import { fill, stroke } from '../../sugarrush/draw.js';
import { random, gnoise } from '../../sugarrush/generative.js'
import { lineSDF } from '../../sugarrush/sdf.js'
import { densities } from '../utils/density.js';
import { colors } from '../utils/colors.js';
import { pattern13, patterns } from '../utils/pattern.js';
const { floor, sin, cos, tan, PI, abs } = Math

const seed = Math.random()*10000.0
let iDensity = Math.floor(Math.random() * densities.length)
let sDensity = densities[iDensity]
console.log("sDensity: ", sDensity)

export function main(coord, context, cursor, buffer, data) {
  let sColors = data.color != -1 ? colors[data.color] : ['white']
  let sPattern1 = data.movement != -1 ? patterns[data.movement] : patterns[0]
	const t = data.movement != -1 ? context.time * 0.001 : 0
	const m = Math.min(context.cols, context.rows)
  const a = context.metrics.aspect


	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
  let st2 = vec2(st.x, st.y)
	
	
	let pt = {
		x : fract(st.x * 2.0) - 0.5,
		y : fract(st.y * 4.0) - 0.5
	}

  let orig_st = vec2(st.x, st.y)

  let dim = 3
  let n1 = map(gnoise(st.x*4), 0, 1, 0, 1)
  let n2 = gnoise(st.y*2.0)

  let offset = (Math.floor((st.y)*dim))/dim
  // offset = 0
  // let wave1 = sdSegment(st, vec3(st.x, -n1+offset, 0.0), vec3(st.x, n1+offset, 0.0), 0.1)
  // let wave1 = lineSDF(st, vec2(-0.3, 0.0), vec2(0.3, 0.0)) 
  let wave1 = lineSDF(st, vec2(st.x, -n1+offset), vec2(st.x, n1+offset)) - 0.1
  let wave2 = lineSDF(st, vec2(st.x, -n1+offset), vec2(st.x, n1+offset)) - 0.01
  let wave = wave1 * wave2
  
  // st.y += sin(st.x*5.0)*0.2
  st.y += gnoise(st.x*6.0 + random(seed)*20.)+0.2
  // st.x += gnoise(st.y*10.0 + random(seed))

  st.x += sin(st.y*10.0)*0.2
  
  let side = random(Math.floor(orig_st.y+seed))+0.5
  let sign = random(seed) < 0.5 ? -1 : 1
  side = side * sign 

  let cond = (st2.x < -0.5 || st2.x > 0.5)   
  
  let n = gnoise(orig_st.y*5.0 + random(seed)*100)
  // n = map(orig_st.y, -1, 1, 0, n)

  let line1 = sdSegment(st, vec2(-1.0, st.y), vec2(1.0, st.y), 0.01)
  // let swave1 = stroke(wave1, 0.2, 0.1, 0.01)
  
  // let mod1 = Math.floor(Math.abs(st.y*20.0)) % density.length
  let mod1 = pattern13(coord, context, t)


  return {
    char: line1 < 0.0 ? 
          (st2.x < -0.4 || st2.x > 0.4) ?    
    '' : density[mod1] : '',
    // char: swave1 > 0.0 ? density[0] : '',
    char: line1 < 0.0 ?
    cond ?    
    '' : sDensity[mod1 % sDensity.length] : '',
    // char: sign,
    color: sColors[mod1 % sColors.length]
  }
}
