/**
@author opheliagame
@title  flower
@desc  	parts of sum
*/

export const settings = {
	backgroundColor: '#222',
}


import { fract } from '../../src/modules/num.js'
import { vec2, add } from '../../src/modules/vec2.js'
import { densities } from '../utils/density.js';
import { colors } from '../utils/colors.js';
import { circleSDF, polySDF, starSDF } from '../../sugarrush/sdf.js';
import { fill } from '../../sugarrush/draw.js'
import { pattern1, pattern2, pattern4, pattern6, pattern7, pattern8, pattern9, patterns } from '../utils/pattern.js';


// storage variables 
let sDensity
let iDensity = localStorage.getItem('sketch-idensity')
let x1 = localStorage.getItem('sketch-x1')
let y1 = localStorage.getItem('sketch-y1')
if(x1 == null || y1 == null || iDensity == null) {
	x1 = Math.random() * 10
	y1 = Math.random() * 10
	iDensity = Math.floor(Math.random() * densities.length)
	localStorage.setItem('sketch-x1', x1)
	localStorage.setItem('sketch-y1', y1)
	localStorage.setItem('sketch-idensity', iDensity)
}
else {
	x1 = parseFloat(x1)
	y1 = parseFloat(y1)
	iDensity = parseInt(iDensity)
	sDensity = densities[iDensity]
}
console.log("sDensity: ", sDensity)



export function main(coord, context, cursor, buffer, data) {
	let sColors = data.color != -1 ? colors[data.color] : ['white']
  let sPattern1 = data.movement != -1 ? patterns[data.movement] : patterns[0]
	const t = data.movement != -1 ? context.time * 0.004 : 0
	if(data.movement == 0) {
		t = context.time * 0.01
	}
	

	const m = Math.max(context.cols, context.rows)
	const a = context.metrics.aspect

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	let mod_st1 = {
		x: coord.x/context.cols ,
		y: coord.y/context.rows
	}
	
	let s1 = fill(circleSDF(st, vec2(0.0, -0.10)), 0.08, 0.01)
	let s2 = fill(polySDF(add(st, vec2(0.0, -0.1)), 5), 0.08, 0.01)
	// let s3 = fill(polySDF(add(st, vec2(0.0, 0.0)), 6), 0.05, 0.01)
 	let s3 = fill(starSDF(add(mod_st1, vec2(0.0, -0.15)), 3, (0.28)), 0.18, 0.01)
	let s4 = fill(starSDF(add(mod_st1, vec2(0.0, -0.25)), 3, Math.sin(0.28)), 0.18, 0.01)

	let s = s1 + s2 + s3 + s4
	// s = s2

	let y = fract(st.x*4.0) < 0.5 ? st.y+st.x : st.y-st.x
	// let mod1 = Math.floor(pattern1(y, 20)) % density1.length
	
	let mod_st2 = vec2(st.x, st.y)
	mod_st2.y += Math.abs(Math.sin(st.x*10.0)) * 10.0
	// let mod2 = Math.abs((mod_st2.y*2.0 ))
	// mod2 = Math.floor(mod2) % sColors.length

	let move = sPattern1(coord, context, t)
	let mod1 = (0 + move) % sDensity.length
	let mod2 = pattern7(coord, context, t);

	return {
		// char: s1 > 0.0 ? sDensity[mod1 + move] 
		// 			: s2 > 0.0 ? sDensity[mod1 + move] 
					// : s3 > 0.0 ? d3[mod1] 	
					// : s4 > 0.0 ? d4[mod1]
					//  : '',	
		char: s > 0.0 ? sDensity[(data.movement == -1 ? mod2 : mod1) % sDensity.length] : '',
		color: s > 0.0 ? sColors[(mod1 + move) % sColors.length] : 'white',

	}
}

