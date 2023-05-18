async function add(db, monument) {
  const {
    monumentName,
    monumentLocation,
    stringList,
    creatorName,
    creatorLocation,
    structure,
    color,
    movement,
    params,
  } = monument;

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO monuments (string_list, monument_name, monument_location, creator_name, creator_location, params, structure, color, movement) VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        stringList,
        monumentName,
        monumentLocation,
        creatorName,
        creatorLocation,
        params,
        structure,
        color,
        movement,
      ],
      function (err) {
        if (err) {
          console.log(err);
          return reject("error inserting monument");
        } else {
          console.log(this);
          return resolve({ id: this.lastID, ...monument });
        }
      }
    );
  });
}

async function count(db) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT COUNT(*) as count FROM monuments`, (error, row) => {
      if (error) {
        return reject("error getting monument");
      } else {
        const { count } = row;
        return resolve(count);
      }
    });
  });
}

async function getById(db, id) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM monuments WHERE ID=${id}`, (error, row) => {
      if (error) {
        console.log(error);
        return reject("error getting monument");
      } else {
        return resolve({
          ...row,
          slug: `${row.monument_name}-${row.creator_name}-${row.id}`,
        });
      }
    });
  });
}

async function getBySlug(db, slug) {
  const id = slug.split("-")[2];
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM monuments WHERE ID=${id}`, (error, row) => {
      if (error) {
        console.log(error);
        return reject("error getting monument");
      } else {
        return resolve({
          ...row,
          slug: `${row.monument_name}-${row.creator_name}-${row.id}`,
        });
      }
    });
  });
}

async function getAll(db) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM monuments`, (error, rows) => {
      if (error) {
        console.log("error getting monument");
        return reject("error getting monument");
      } else {
        return resolve(
          rows.map((row) => {
            return {
              ...row,
              slug: `${row.monument_name}-${row.creator_name}-${row.id}`,
            };
          })
        );
      }
    });
  });
}

async function getPaginated(db, pageNum, pageSize) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM monuments LIMIT ${pageSize} OFFSET ${pageNum * pageSize}`,
      (error, rows) => {
        if (error) {
          return reject("could not get page");
        } else {
          return resolve(
            rows.map((row) => {
              return {
                ...row,
                slug: `${row.monument_name}-${row.creator_name}-${row.id}`,
              };
            })
          );
        }
      }
    );
  });
}

async function deleteAll(db) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM monuments`, [], (err, row) => {
      if (err) {
        return reject("error deleting ");
      } else {
        return resolve(row);
      }
    });
  });
}

export { add, count, getAll, getPaginated, getById, getBySlug, deleteAll };
