/**
@author ajaibghar
@title  Camera RGB
@desc   Color input from camera (quantised)
*/

import { map } from '../modules/num.js'
import { rgb2hex, rgb}  from '../modules/color.js'
import Camera from '../modules/camera.js'
import Canvas from '../modules/canvas.js'
import { sort } from '../modules/sort.js'
import { densities, rdensity, lpdensity } from './../../buildings/utils/density.js'
// import { colors1 } from '/buildings/colors.js'


const cam = Camera.init()
const can = new Canvas()
// For a debug view uncomment the following line:
// can.display(document.body, 10, 10)

let density = sort(lpdensity,'Simple Console',true)
//array of the colors shared by WHA
let lp_color = [
    (rgb(224, 199, 163)),//stone
    rgb(173, 213, 174), //pistachio
    rgb(183, 170, 208) //lavender
]

// A custom palette used for color quantisation:
const pal = []
pal.push(rgb(  34,   34,   34)) //dark gray
pal.push(random_item(lp_color)) // one of the random colors from lp_color array

const data = []

export function pre(context, cursor, buffer) {
	const a = context.metrics.aspect

	// The canvas is resized so that 1 cell -> 1 pixel
	can.resize(context.cols, context.rows)
	// The cover() function draws an image (cam) to the canvas covering
	// the whole frame. The aspect ratio can be adjusted with the second
	// parameter.
	can.cover(cam, a).mirrorX().quantize(pal).writeTo(data)
}

export function main(coord, context, cursor, buffer) {
	// Coord also contains the index of each cell
	const color = data[coord.index]
    // console.log(color)
	// Add some chars to the output
	const index = Math.floor(color.v * (density.length-1))
	return {
		char       : density[index],
		color      : 'white',
		// convert {r,g,b} obj to a valid CSS hex string
		backgroundColor : rgb2hex(color)
	}
}

//random function for picking the random color from the three wha colors
function random_item(items)
{ 
	return items[Math.floor(Math.random()*items.length)]; 
}