const { performance } = require("perf_hooks");
const { Pool } = require("pg");
const redis = require("redis");

const pool = new Pool({
  user: 'postgres',
  password: 'mysecretpassword',
  host: '52.14.170.98',
  database: 'postgres',
  port: 3210,
  max: 2000,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000
});

const client = redis.createClient(6379);

// local setup:
// user: 'helenjsoh',
// database: 'postgres',
// host: 'localhost', // EC2 address for deployed DB
// port: 5432

const retrieveOne = (req, res, next) => {
  const { id } = req.params;
  let retrievequery = `SELECT * FROM listings WHERE _id = ${id};`;
  pool.query(retrievequery, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      client.setex(id, 60, JSON.stringify(results));
      res.send(results.rows);
    }
  });
};

const cache = (req, res, next) => {
  const { id } = req.params;
  client.get(id, (err, data) => {
    if (err) {
      console.log('Error from cache: ', err);
    }

    if (data !== null) {
      console.log('Did cache work?');
      res.send((data));
    } else {
      next();
    }
  })
};

// let retrievequery = `SELECT * FROM listings WHERE _id = 7191;`;
// // console.log("Whats the retrieve query", retrievequery);
// var test = () => {
//   for (var i = 0; i < 100; i++) {
//     var t0 = performance.now();
//     var prev = t0;
//     pool.query(retrievequery, (err, results) => {
//       // console.log("Whats the results?", results);
//       var t1 = performance.now();
//       console.log("Query " + (t1 - t0) + " miliseconds.");
//     });
//   }
// };
// test();

module.exports.retrieveOne = retrieveOne;
module.exports.cache = cache;