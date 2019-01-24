const { Pool } = require("pg");
const pool = new Pool({
  user: 'postgres',
  password: 'mysecretpassword',
  host: '52.14.170.98',
  database: 'postgres',
  port: 3210
});

// local setup:
// user: 'helenjsoh',
// database: 'postgres',
// host: 'localhost', // EC2 address for deployed DB
// port: 5432

const retrieveOne = (req, res, next) => {
  const { id } = req.params;
  console.log(typeof id);
  let retrievequery = `SELECT * FROM listings WHERE _id = ${id};`;
  console.log("Whats the retrieve query", retrievequery);
  pool.query(retrievequery, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log("Whats the results?", results);
      res.send(results.rows);
    }
  });
};

module.exports.retrieveOne = retrieveOne;