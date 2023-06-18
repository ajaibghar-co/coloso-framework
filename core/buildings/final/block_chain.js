/**
@author opheliagame
@title  block chain
*/

export const settings = {
  backgroundColor: '#222',
}

import { sdSegment, opSmoothUnion } from '../../src/modules/sdf.js'
import { length, max, vec2, add, sub, mulN } from '../../src/modules/vec2.js'
import { vec3 } from '../../src/modules/vec3.js'
import {fract } from '../../src/modules/num.js';
import { densities } from '../utils/density.js'
import { colors, colors_wha } from '../utils/colors.js'
import { circleSDF } from '../../sugarrush/sdf.js'
import { clamp } from '../../src/modules/num.js'
import { movement2 } from '../utils/movement.js';
import { gnoise } from '../../sugarrush/generative.js';
import { patterns } from '../utils/pattern.js';


// storage variables 

let seed = Math.random()*10000.0
let dim = 4.0
let iDensity = Math.floor(Math.random() * densities.length)
let sDensity = densities[iDensity]  
localStorage.setItem('sketch-seed', seed)
localStorage.setItem('sketch-dim', dim)
localStorage.setItem('sketch-idblockchain', iDensity)
console.log("sDensity: ", sDensity)

export function main(coord, context, cursor, buffer, data) {
  if(data.param != undefined) {
    iDensity = parseInt(data.param['sketch-idblockchain'])
    seed = parseFloat(data.param['sketch-seed'])
    dim = parseInt(data.param['sketch-dim'])
    sDensity = densities[iDensity]
  }

  let sColors = data.color != -1 ? colors[data.color] : ['white']
  let sPattern1 = data.movement != -1 ? patterns[data.movement] : patterns[0]
	let t = data.movement != -1 ? context.time * 0.001 : 0
  if(data.movement != -1 && data.movement == 0) {
    t = context.time * 0.01
  }
  if(data.movement != -1 && data.movement == 3) {
    t = context.time * 0.004
  }
	const m = Math.min(context.cols, context.rows)
  const a = context.metrics.aspect

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}

  let fy = Math.floor((st.y*dim))
  let rn = gnoise(fy+dim+1+seed+t*0.5)
  let y = clamp(st.y, -0.8, 0.8)
  
  // let sdf1 = sdSegment(st, vec2(-rn, fract(st.y*4.0)*fy), vec2(rn, fract(st.y*4.0)*fy), 0.6)
  let sdf1 = sdSegment(st, vec3(-rn, y, 0.0), vec3(rn, y, 0.0), 0.01)


  let sign = Math.floor(st.y * 20.0) % 2 == 0 ? 1 : -1
  let mod1 = Math.floor(Math.abs((coord.x/context.rows)*10.0 + Math.sin(st.y*2.0)*2.0*sign + t*2.0*sign)) % sDensity.length

	let move = sPattern1(coord, context, t)


  return {
    char: sdf1  < 0.0 ? sDensity[move % sDensity.length] : '',
    color: sColors[move % sColors.length],
  }
}
