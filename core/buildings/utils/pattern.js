import { opSmoothUnion } from "../../src/modules/sdf.js"
import { fract } from "../../src/modules/num.js"
import { stroke } from "../../sugarrush/draw.js"
import { gnoise, random } from "../../sugarrush/generative.js"
import { sdPointedArch } from "../../sugarrush/sdf.js"

export function pattern1(y, res) { return Math.abs((y*res) % Math.abs(res/2) - Math.abs(res/4)) }

export function pattern2(coord, context, time) {
	let st = {
		x: coord.x/context.cols ,
		y: coord.y/context.rows
	}

  let t = time ? time : 0
  let x = coord.x
  let y = coord.y

  let cx = Math.floor(Math.abs(Math.sin(x*400+t)) * 30.0)
  let cy = Math.floor(Math.abs(Math.sin(y*1200 +t)) * 30.0)

	return cx + cy
}

export const pattern3 = (coord, context, time) => {
  let n = Math.floor(Math.abs(Math.sin(coord.y)) * coord.x) + Math.floor(Math.abs(Math.cos(time)) * coord.y)
  let res = 30
  return n % res 
}

// throbbing
export const pattern4 = (coord, context, time) => {
  let st = {
		x: coord.x/context.cols ,
		y: coord.y/context.rows
	}

  let res = Math.floor(gnoise(time)*5) + 1
  // res = 3

  let resy = Math.floor(gnoise(st.y ) * 10) + 1
  let resx = Math.floor(gnoise(st.x ) * 10) + 1
  let offy = Math.floor(coord.y/resy) % 2 == 0 ? 1 : 0
  let offx = Math.floor(coord.x/resx) % res == 0 ? res-1 : res-2
  return (offx + offy) % res
}

// static
export const pattern5 = (coord, context, time) => {
  return 0
}

// staccato
export const pattern6 = (coord, context, time) => {
  return Math.floor(time)
}

// left to right
export const pattern7 = (coord, context, time) => {
  return Math.floor(coord.x+time);
}

// top to bottom
export const pattern8 = (coord, context, time) => {
  return Math.floor(coord.y+time);
}

// side to side
export const pattern9 = (coord, context, time) => {
  return Math.floor(coord.y+coord.x+time);
}

// mod xor
export const pattern10 = (coord, context, time) => {
  const t1 = Math.floor(context.frame / 2)
	const t2 = Math.floor(context.frame / 128)
	const x = coord.x
	const y = coord.y + t1
	const m = t2 * 2 % 30 + 31
	const i = (x + y^x - y) % m & 1
	const c = (t2 + i) 
	return c
}


export const pattern11 = (coord, context, time) => {
  const x = coord.x
	const y = coord.y
	const o = Math.sin(y * Math.sin(time) * 2 + x * 0.04 + time) * 20
	const i = Math.round(Math.abs(x  + o)) 
  return i
}

export const pattern12 = (coord, context, time) => {
	const m = Math.min(context.cols, context.rows)
	const a = context.metrics.aspect

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}

	let pt = {
		x : st.x,
		y : fract(st.y * 1.0) - 0.5
	}

	const sdf1 = sdPointedArch(pt, 1.0, 1.0)
  const sdf2 = sdPointedArch(pt, 1.0, -1.0)
  const sdf3 = 1.0-opSmoothUnion(sdf1, sdf2, 0.0)


	let n = 0
  for(let i = 0; i < 5; i++) {
    const sh3 = stroke(sdf3, i/5, 0.1 , 0.001)
    n += sh3
  }

	
	return Math.floor((n*(st.y+st.x))+time*2.0)
}

// TODO: pass seed
const seed = Math.random()*10000.0
export const pattern13 = (coord, context, time) => {
	const m = Math.min(context.cols, context.rows)
  const a = context.metrics.aspect

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}

	// st.y += sin(st.x*5.0)*0.2
  st.y += gnoise(st.x*6.0 + random(seed)*20.)+0.2
  // st.x += gnoise(st.y*10.0 + random(seed))
  st.x += Math.sin(st.y*10.0)*0.2

  let mod1 =
		Math.floor(st.y*4.0) % 2 == 0 ?
		Math.floor(Math.abs(st.y*20.0+time)) :
		0 
	return mod1


}

// let points = []

// let N = 4
// let prev = 0
// for(let i = -1; i < 1; i+=1/(N-1)) {
// 	let off, p
// 	if(prev == 0) {
// 		off = 0.5 + (Math.random()*2-1)*0.2
// 		p = vec2(off, i)
// 	}
// 	else {
// 		off = prev + (Math.random()*2-1)*0.3
// 		p = vec2(off, i)
// 	}
// 	prev = off
// 	points.push(p)
// }

  // // circle pattern
  // let cf = 1
	// for(let i = 0; i < points.length; i++) {
	// 	let p = points[i]
	// 	let x = p.x + gnoise(st.x+t)*0.2
	// 	let y = p.y + gnoise(st.y+t)*0.2
	// 	let c1 = circleSDF(st, vec2(x, y))-0.7
	// 	// let c1 = circleSDF(st, vec2(x, y))-st.y make longer fluidity
	// 	let c2 = circleSDF(st, vec2(x, y))-0.7
	// 	let c3 = circleSDF(st, vec2(x, y))-0.9
		
	// 	// let f1 = opSmoothSubtraction(c2, c1, 0.5)
	// 	// f1 = c1*c2

	// 	cf = opSmoothUnion(cf, (c1), 0.0)
	// }


export const patterns = [pattern4, pattern6, pattern7, pattern8]