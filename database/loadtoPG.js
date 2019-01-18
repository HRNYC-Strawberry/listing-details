const { performance } = require("perf_hooks");

var t0 = performance.now();

// Don't require createpsDB.js because it will run the file and drop DB

const { Pool } = require("pg");
const pool = new Pool({
    user: 'helenjsoh',
    database: 'postgres',
    port: 5432
});

pool.query(`COPY listings FROM '/Users/helenjsoh/Desktop/Listing-Details-Sidebar/database/data.csv' DELIMITER ',' CSV HEADER`, (err, res) => {
    if (err) {
      console.log('Error with copy query: ', err);
    } else {
      console.log('Copy query was completed.');
      var t1 = performance.now();
      console.log("Time: " + (t1 - t0) / 1000 + "seconds");
    }
});