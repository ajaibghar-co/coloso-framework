import { config } from "./config.js";
import { createDbConnection } from "./db.js";
import {
  add,
  getById,
  deleteAll,
  count,
  getAll,
  getPaginated,
} from "./monument.js";

// create 50 monuments to be used for tests
const monuments = Array.from({ length: 50 }, (v, i) => {
  return {
    monumentName: `monumentName${i}`,
    string_list: `string list : ${i}`,
    monumentLocation: `monumentLocation${i}`,
    creatorName: `creatorName${i}`,
    creatorLocation: `creatorLocation${i}`,
    structure: `structure${i}`,
    color: `color${i}`,
    movement: `location${i}`,
    params: "{}",
  };
});

(async function main() {
  // get initialized db
  const { dbPath } = config;
  const db = createDbConnection(dbPath);

  // insert 50 monuments
  // for (let i = 0; i < 50; i++) {
  //   await add(db, monuments[i]);
  // }

  // const dbMonuments = await getAll(db);
  // console.log(dbMonuments);

  // const dbMonumentsPgOne = await getPaginated(db, 0, 10);
  // console.log(dbMonumentsPgOne);

  // const dbMonumentsPgTwo = await getPaginated(db, 2, 5);
  // console.log(dbMonumentsPgTwo);

  /**
   * Get all posts but in a paginated manner
   * This logic can be useful when you want to implement something like a "load more"
   * user flow for long lists
   */
  // const monumentCount = await count(db);
  // console.log(`found ${monumentCount} monuments`);
  // const PAGE_SIZE = 10;
  // for (let i = 0; i < monumentCount / PAGE_SIZE; i++) {
  //   const page = await getPaginated(db, i, PAGE_SIZE);
  //   console.log(`fetched page ${i} with ${page.length} monuments`);
  // }

  /**
   * Get total monuments
   */
  // const monumentCount = await count(db);
  // console.log(`Count is ${monumentCount}`);

  /**
   * Get a particular monument
   */
  // const monument = await getById(db, 660);
  // console.log(monument);

  // delete all monuments
  // const res = await deleteAll(db);
})();
