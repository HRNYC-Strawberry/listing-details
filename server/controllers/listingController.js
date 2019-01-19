const { Pool } = require("pg");
const pool = new Pool({
    user: 'helenjsoh',
    database: 'postgres',
    host: 'localhost', // EC2 address for deployed DB
    port: 5432
});

const retrieveOne = (req, res, next) => {
  const { id } = req.params;
  let retrievequery = `SELECT * FROM listings WHERE _id = ${id}`
  pool.query(retrievequery, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results.rows);
    }
  })
}

module.exports.retrieveOne = retrieveOne;