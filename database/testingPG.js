const { Pool } = require("pg");
const pool = new Pool({
    user: 'postgres',
    password: 'mysecretpassword',
    host: 'ec2-52-14-170-98.us-east-2.compute.amazonaws.com',
    database: 'postgres',
    port: 80
});

var testQuery = ``;