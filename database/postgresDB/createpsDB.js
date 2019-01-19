const { Pool } = require("pg");
const pool = new Pool({
    user: 'postgres',
    password: 'mysecretpassword',
    host: 'ec2-52-14-170-98.us-east-2.compute.amazonaws.com',
    database: 'postgres',
    port: 80
});

var createQuery = `
DROP TABLE IF EXISTS listings;
CREATE TABLE listings (
    _id INT NOT NULL,
    price VARCHAR(20) NOT NULL,
    squareFootage VARCHAR(20) NOT NULL,
    pricePerSquareFoot VARCHAR(20) NOT NULL,
    rooms INT NOT NULL,
    beds INT NOT NULL,
    baths INT NOT NULL,
    houseType VARCHAR(100) NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    streetAddress VARCHAR(100) NOT NULL,
    stars INT NOT NULL,
    realty VARCHAR(100) NOT NULL,
    shortRealty VARCHAR(100) NOT NULL,
    realtor VARCHAR(100) NOT NULL
);`;

var createTable = () => {
    pool.query(createQuery, (err, res) => {
        if (err) {
            console.log('Error creating table in PG', err);
        } else {
            console.log('Table in PG has been created.');
        }
        pool.end();
    })
}
createTable();

module.exports.pool = pool;