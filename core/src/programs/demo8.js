/**
[header]
@author ajaibghar
@title  Coloso - home page
@desc   Coloso landing page
*/

import { sort } from '/src/modules/sort.js'
import Camera from '/src/modules/camera.js'
import Canvas from '/src/modules/canvas.js'
import { css } from '/src/modules/color.js'
import { map,fract,clamp,sign,mix } from '/src/modules/num.js'
import { vec2, dot, add, sub, length, max, mulN } from '/src/modules/vec2.js'
import { sdSegment,sdCircle, opSmoothUnion } from '/src/modules/sdf.js'
// import { random, gnoise } from '/src/programs/test/generative.js'
import { vec3 } from '/src/modules/vec3.js'
// export const settings = {
// 	// renderer: 'canvas',
// 	// rows: 32,
// 	canvasOffset :{
// 		x: 'auto',
// 		y: 140
// 	}
// }

const {sin, cos, floor, PI} = Math

const PI23 = PI * 2 / 3
const PI43 = PI * 4 / 3
const cam = Camera.init()
const can = new Canvas()
// For a debug view uncomment the following line:
// can.display(document.body, 10, 10)
const image = new Image();
// image.src = '/src/coloso2.png';
image.src = '/src/coloso12.jpg';


const density = sort(' ○•◘', 'Simple Console', false)
// const density = sort('█▓▒░ ', 'Simple Console',false)

// const density =  ' ○•◘█'
const data = []
const camdata = []
export function pre(context, cursor, buffer) {
    
	const a = context.metrics.aspect

	// The canvas is resized so that 1 cell -> 1 pixel
	can.resize(context.cols, context.rows)
	// The cover() function draws an image (cam) to the canvas covering the whole frame. The aspect ratio can be adjusted with the second
	// parameter.
	can.cover(image, a).normalize().writeTo(data)
	can.cover(cam, a).mirrorX().normalize().writeTo(camdata)
    // console.log(data)
}

export function main(coord, context, cursor, buffer) {
	const a2 = context.metrics.aspect

    const m = Math.min(context.cols, context.rows)

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a2,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}

	// const colors_wha = [ '#ADD5AE', '#E0C7A3', '#EEBC32', '#EDC8CB', '#B94982', '#B7AAD0', '#7495B1'] //'#CDD8E3', '#586945', 
	const colors_wha = [ '#E0C7A3', '#222'] //'#CDD8E3', '#586945', 


	// Coord also contains the index of each cell (this gives the data from the image source 'img')
	const color = data[coord.index]

	const camcolor = camdata[coord.index]
	
	// console.log(camcolor)
    //this is the index value of the image derived from data  passed in can.cover and var color
	const index = Math.floor(color.v * (density.length-1))
	const camindex = Math.floor(camcolor.v * (density.length-1))


	const t1 = context.time * 0.00009
	const t2 = context.time * 0.00003
    const a = context.metrics.aspect
	const center = vec2(sin(-t1), cos(-t1))
	const v1 = sin(dot(coord, vec2(sin(t1), cos(t1))) * 0.08)
	const v2 = cos(length(sub(st, center)) * 4.0)
	const v3 = v1 + v2

	const quant = 5
	const mult  = 255 / (quant - 1)
	const r = floor(map(sin(v3 * PI   + t1), -1, 1, 0, quant)) * mult



	return {
		char: density[index],
		color: colors_wha[camindex],
		// char: density[r*10 % colors_wha.length],
		// color: colors_wha[r*20 % colors_wha.length],
		// color: colors_wha[0],
		// backgroundColor: 'white'	
	}
		
		// color: colors[i % colors.length],
		// color: colors[i%colors.length],
		
	
}


// import { drawBox } from '/src/modules/drawbox.js'
// export function post(context, cursor, buffer) {
// 	const baseStyle = {
// 		paddingX        : 2,
// 		paddingY        : 1,
// 		color           : 'black',
// 		backgroundColor : 'white',
// 		borderStyle     : 'double',
// 		shadowStyle     : 'light',
// 		width           : 100,
// 		height          : 100,
// 	}
// 	const { rows, cols } =  context
// 	const text = "Welcome to COLOSO LGBTQ+ spaces of congregation have not been formally validated, documented, or theorized in Puerto Rican architectural discourse. In addition, these venues—shops, bars, clubs, among others—have been disappearing from the built environment due to enormous forces: mass migration to the US, a decade-plus-long economic recession, the brutal passing of Hurricane María in 2017, and most recently, the Covid-19 pandemic. Unlike other cities, closed"
// 	drawBox(text, baseStyle, buffer, cols, rows)

	
// }

