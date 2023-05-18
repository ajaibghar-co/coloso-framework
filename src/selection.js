/**
 * Data
 */
const structureMap = {
  Tiny: "Flower",
  Mirror: "Mandelbrot",
  Sweaty: "Spiral",
  Closed: "Blockchain",
  Sticky: "Spiral",
  Open: "Watermelon",
  Massive: "Spiral",
  Community: "Flower",
  Shoddy: "Lissajous",
  Sketchy: "Watermelon",
  Hard: "Blockchain",
  Fluffy: "Lissajous",
  Fetish: "Lissajous",
  Unknown: "Lissajous",
  Underground: "Flower",
  Gloryhole: "Mandelbrot",
  Dates: "Spiral",
  Weird: "Lissajous",
  Homely: "Watermelon",
  Kinship: "Flower",
  Collaborative: "Watermelon",
  Vestibule: "Watermelon",
  Fantasy: "Mandelbrot",
  Sanctuary: "Blockchain",
  Shelter: "Blockchain",
  Tenderness: "Flower",
  Trauma: "Mandelbrot",
  Intersectional: "Watermelon",
  Fluid: "Spiral",
  Heels: "Blockchain",
  Jewels: "Mandelbrot",
};

const structureIndices = {
  None: -1,
  Mandelbrot: 0,
  Blockchain: 1,
  Watermelon: 2,
  Flower: 3,
  Spiral: 4,
  Lissajous: 5,
};

const colorMap = {
  Light: "set5",
  Dark: "set4",
  Cocktails: "set1",
  Glitter: "set0",
  Hip: "set1",
  Sinister: "set4",
  Pink: "set6",
  Love: "set0",
  Nature: "set4",
  Colorful: "set1",
  Neon: "set2",
  Glitzy: "set1",
  Joy: "set3",
  Romantic: "set3",
  Cosy: "set5",
  Urban: "set2",
  Privacy: "set5",
  Metal: "set5",
  True: "set4",
  Celebration: "set3",
  Euphoria: "set1",
  Emotions: "set0",
  Intimacy: "set6",
  Vulnerable: "set5",
  Sober: "set6",
  Smelly: "set4",
  Confetti: "set0",
  Cake: "set0",
  Garden: "set2",
  Summer: "set2",
  Lipstick: "set3",
  Lace: "set3",
  Flow: "set6",
  Perfume: "set6",
};

const colorIndices = {
  None: -1,
  set0: 0,
  set1: 1,
  set2: 2,
  set3: 3,
  set4: 4,
  set5: 5,
  set6: 6,
};

const movementMap = {
  Discoball: "pattern7",
  Naughty: "pattern9",
  Dance: "pattern4",
  Heartbeat: "pattern4",
  Performance: "pattern10",
  Vogueing: "pattern6",
  Bubbles: "pattern4",
  Druggy: "pattern10",
  Notorious: "pattern6",
  Intense: "pattern6",
  Drag: "pattern8",
  Sexy: "pattern9",
  Fight: "pattern6",
  Transition: "pattern9",
  Conquer: "pattern8",
  Desire: "pattern7",
  Furry: "pattern7",
  Hedonistic: "pattern10",
  Therapeutic: "pattern8",
  Addiction: "pattern9",
  Transgressive: "pattern10",
  Bassline: "pattern4",
  Exciting: "pattern4",
  Tango: "pattern6",
  Shuffle: "pattern7",
  Spin: "pattern7",
  Flow: "pattern8",
  Grinding: "pattern8",
  Waacking: "pattern9",
  Flair: "pattern10",
};

const movementIndices = {
  None: -1,
  pattern4: 0,
  pattern6: 1,
  pattern7: 2,
  pattern8: 3,
  pattern9: 4,
  pattern10: 5,
};

const sketchParams = {
  Mandelbrot: ["sketch-it1", "sketch-it2", "sketch-it3"],
  Blockchain: ["sketch-seed", "sketch-dim"],
  Watermelon: ["sketch-seed1", "sketch-seed2", "sketch-seed3", "sketch-seed4"],
  Flower: [],
  Spiral: ["sketch-swidth"],
  Lissajous: ["sketch-x1", "sketch-y1"],
};

/**
 * Useful Algorithms
 */
// source : https://stackoverflow.com/a/19270021/2767642
function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function sample2Choices(set, map) {
  var choiceKeys = new Set();
  while (choiceKeys.size < 2) {
    let selectionCandidates = Object.keys(set);
    let choice =
      selectionCandidates[
        Math.floor(Math.random() * selectionCandidates.length)
      ];
    choiceKeys.add(choice);
  }
  //   console.log(choiceKeys);
  let a = [];
  for (let key of choiceKeys) {
    // console.log(key, set[key]);
    a.push(...set[key]);
  }
  return a;
}

function createMapOfCategoryAndItems(map) {
  let set = new Set();
  for (let key in map) {
    // console.log(key, map[key]);
    set.add(map[key]);
  }
  //   console.log(set);
  //   let mapOfCategoryAndItems = {};
  //   for (let key of set) {
  //     console.log(key);
  //     mapOfCategoryAndItems[key] = Object.keys(map).filter((item)=>item[])
  //   }
  //   console.log(mapOfCategoryAndItems);

  let mapOfCategoryAndItems = {};
  for (let key of set) {
    // console.log(key);
    if (!mapOfCategoryAndItems[key]) {
      mapOfCategoryAndItems[key] = [];
    }
    for (let mapKey in map) {
      if (map[mapKey] == key) {
        mapOfCategoryAndItems[key].push(mapKey);
      }
    }
  }
  return mapOfCategoryAndItems;
}

/**
 * Test Suite
 */
function testSampling() {
  let structureSet = createMapOfCategoryAndItems(structureMap);
  let structureChoicesToGiveUser = sample2Choices(structureSet, structureMap);
  let randomizedStructureChoices = getRandom(structureChoicesToGiveUser, 5);
  console.log("STRUCTURE CHOICES:", randomizedStructureChoices);
  console.log(
    "STRUCTURE MAPPED VALUES:",
    randomizedStructureChoices.map((choice) => structureMap[choice])
  );

  let colorSet = createMapOfCategoryAndItems(colorMap);
  let colorChoicesToGiveUser = sample2Choices(colorSet, colorMap);
  let randomizedColorChoices = getRandom(colorChoicesToGiveUser, 5);
  console.log("COLORS CHOICES: ", randomizedColorChoices);
  console.log(
    "COLOR MAPPED VALUES: ",
    randomizedColorChoices.map((choice) => colorMap[choice])
  );

  let movementSet = createMapOfCategoryAndItems(movementMap);
  let movementChoicesToGiveUser = sample2Choices(movementSet, movementMap);
  let randomizedMovementChoices = getRandom(movementChoicesToGiveUser, 5);
  console.log("MOVEMENT CHOICES: ", randomizedMovementChoices);
  console.log(
    "MOVEMENT MAPPED VALUES:",
    randomizedMovementChoices.map((choice) => movementMap[choice])
  );
}

let structureSet = createMapOfCategoryAndItems(structureMap);
let colorSet = createMapOfCategoryAndItems(colorMap);
let movementSet = createMapOfCategoryAndItems(movementMap);

export {
  structureMap,
  structureSet,
  structureIndices,
  colorMap,
  colorIndices,
  colorSet,
  movementMap,
  movementIndices,
  movementSet,
  sample2Choices,
  getRandom,
};

testSampling();
