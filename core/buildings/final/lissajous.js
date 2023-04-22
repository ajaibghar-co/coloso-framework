/**
@author opheliagame
@title  lissajous
@desc   simple math 
*/

export const settings = {
	backgroundColor: '#222'
}


import { densities, density1, density2, rdensity } from "../utils/density.js"
import { floor, mulN, vec2 } from '../../src/modules/vec2.js'
import { fract } from "../../src/modules/num.js"
import { random } from "../../sugarrush/generative.js"
import { colors } from "../utils/colors.js"
import { sdSegment } from '../../src/modules/sdf.js'
import { pattern2 } from "../utils/pattern.js"

let iColor = 0
let iDensity = Math.floor(Math.random() * densities.length)

let sColors = [...colors, '#222']
let sDensity = densities[iDensity]

console.log("colors: ", sColors)
console.log("sDensity: ", sDensity)

const seed = Math.random()
const seedx = Math.floor(Math.random()*1200)
const seedy = Math.floor(Math.random()*1200)

export function main(coord, context, cursor, buffer) {

	const t = context.time * 0.001
	const m = Math.min(context.cols, context.rows)
	const a = context.metrics.aspect

	let st = {
		x: 2.0 * (coord.x - context.cols / 2) / m * a,
		y: 2.0 * (coord.y - context.rows / 2) / m
	}


	let pt = {
		x: fract(st.x * 2.0) - 0.5,
		y: fract(st.y * 4.0) - 0.5
	}

	let { cols, rows, frame } = context
	const { x, y } = coord

	// frame = frame / 10


	// -1 for even lines, 1 for odd lines
	const sign = y % 2 * 2 - 1
	let index = (cols + y + x * sign) % sDensity.length

	let mody = 6 - floor((y / rows) * 6) + 1
	let cx = Math.floor(Math.sin(x * seedx) * sDensity.length)
	let cy = Math.floor(Math.sin(y * seedy) * sDensity.length)

	index = Math.floor(Math.sin(x*y) * sDensity.length)
	// index = (cx + cy) % sDensity.length

	let st1 = floor(mulN(st, 6))
	let rx = (random(st1.y+seed))
	// rx = rx < 0.1 ? 0.1 : rx

	let s1 = sdSegment(st, vec2(-rx, st.y), vec2(rx, st.y), 0.01)

	let move = Math.sin(rx+t) 

	index = Math.floor(index + move) % sDensity.length

	let mod2 = pattern2(y, 20)

	// return mody
	return {
		char: sDensity[index],
		char: s1 < 0.0 ? sDensity[index] : '',
		color: s1 < 0.0 ? sColors[mod2] : 'white',
	}
}
