const { performance } = require("perf_hooks");

var t0 = performance.now();
// Don't require createpsDB.js because it will run the file and drop DB

const { Pool } = require("pg");
const pool = new Pool({
    user: 'postgres',
    password: 'mysecretpassword',
    host: 'ec2-52-14-170-98.us-east-2.compute.amazonaws.com',
    database: 'postgres',
    port: 80
});

// local query: COPY listings from '/Users/helenjsoh/Desktop/Listing-Details-Sidebar/database/data.csv' DELIMITER ',' CSV HEADER`
pool.query(`COPY listings FROM '${__dirname}/data.csv' DELIMITER ',' CSV HEADER`, (err, res) => {
    if (err) {
      console.log('Error with copy query: ', err);
    } else {
      console.log('Copy query was completed.');
      var t1 = performance.now();
      console.log("Time: " + (t1 - t0) / 1000 + "seconds");
    }
});

// psql -h remotehost -d remote_mydb -U myuser -c "\copy mytable (column1, column2)  from '/path/to/local/file.csv' with delimiter as ','"