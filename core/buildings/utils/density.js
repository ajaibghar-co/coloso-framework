export const density1 = '█▓▒░ ';
export const density2 = '┃━┏┓┗┛┣┫┳┻╋'
export const density3 =  ' ○•◘█'
export const density4 = '╣║╗╝╚╔╩╦╠═╬'
export const djapanese = '大一花'
export const dkannada = 'ೞಲಇಐ'
export const density6 = '╱ ╲ ╳'
export const density7 = '|/-\\'



export const densities = [density1, density2, density3, density4]

let density = densities[Math.floor(Math.random() * densities.length)]
density = density.split('').sort((a, b) => 0.5 - Math.random()).join('')

export const rdensity = density

//density characters for the LANDING PAGE
export const lp_den = [density1, density3, density6, density7]
let lp_random_den = lp_den[Math.floor(Math.random() * lp_den.length)]
lp_random_den = lp_random_den.split('').sort((a, b) => 0.5 - Math.random()).join('')

export const lpdensity = lp_random_den
