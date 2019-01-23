// Used this to generate data to CSV file
const faker = require("faker");
const fs = require("fs");
const Json2csvParser = require("json2csv").Parser;
const { performance } = require("perf_hooks");
const stream = fs.createWriteStream("data.csv");

var t0 = performance.now();
var prev = t0;

const fields = [
  "_id",
  "price",
  "squareFootage",
  "pricePerSquareFoot",
  "rooms",
  "beds",
  "baths",
  "houseType",
  "neighborhood",
  "streetAddress",
  "stars",
  "realty",
  "shortRealty",
  "realtor"
];
var opts = { fields: fields, header: false };

const json2csvParser = new Json2csvParser(opts);

let globalID = 1;

(async () => {
  for (var i = 0; i < 1000; i++) {
    await new Promise((resolve, reject) => {
      let arr = [];
      for (var j = 0; j < 10000; j++) {
        let item = {};
        item._id = globalID;

        if (i < 25) { 
          item.price = faker.random.number({
            min: 250000,
            max: 500000
          });
    
          item.squareFootage = faker.random.number({
            min: 350,
            max: 600
          });
    
          item.pricePerSquareFoot = faker.random.number({
            min: 600,
            max: 2000
          });
    
          item.rooms = faker.random.number({
            min: 1,
            max: 2
          });
    
          item.beds = faker.random.number({
            min: 1,
            max: 2
          });
    
          item.baths = faker.random.number({
            min: 1,
            max: 2
          });
        }
    
        if (i >= 25 && i < 50) {
          item.price = faker.random.number({
            min: 500000,
            max: 1000000
          });
    
          item.squareFootage = faker.random.number({
            min: 450,
            max: 900
          });
    
          item.pricePerSquareFoot = faker.random.number({
            min: 850,
            max: 2000
          });
    
          item.rooms = faker.random.number({
            min: 2,
            max: 5
          });
    
          item.beds = faker.random.number({
            min: 1,
            max: 2
          });
    
          item.baths = faker.random.number({
            min: 1,
            max: 2
          });
        }
    
        if (i >= 50 && i < 75) {
          item.price = faker.random.number({
            min: 1000000,
            max: 3000000
          });
    
          item.squareFootage = faker.random.number({
            min: 1000,
            max: 2500
          });
    
          item.pricePerSquareFoot = faker.random.number({
            min: 850,
            max: 2500
          });
    
          item.rooms = faker.random.number({
            min: 5,
            max: 8
          });
    
          item.beds = faker.random.number({
            min: 2,
            max: 4
          });
    
          item.baths = faker.random.number({
            min: 2,
            max: 4
          });
        }
    
        if (i >= 75) {
          item.price = faker.random.number({
            min: 3000000,
            max: 20000000
          });
    
          item.squareFootage = faker.random.number({
            min: 2000,
            max: 6000
          });
    
          item.pricePerSquareFoot = faker.random.number({
            min: 1500,
            max: 2600
          });
    
          item.rooms = faker.random.number({
            min: 7,
            max: 12
          });
    
          item.beds = faker.random.number({
            min: 3,
            max: 6
          });
    
          item.baths = faker.random.number({
            min: 3,
            max: 5
          });
        }
    
        let num1 = faker.random.number({
          max: 3
        });
    
        let num2 = faker.random.number({
          max: 4
        });
    
        const houseType = ["Condo", "Co-op", "House", "Townhouse"];
    
        const neighborhood = [
          "Brooklyn",
          "Manhattan",
          "Queens",
          "Staten Island",
          "Bronx"
        ];
    
        item.houseType = houseType[num1];
        item.neighborhood = neighborhood[num2];
        item.streetAddress = faker.address.streetAddress();
        item.stars = faker.random.number({
          min: 0,
          max: 30
        });
        item.realty = faker.company.companyName();
        item.shortRealty = faker.company.companySuffix();
        item.realtor = faker.name.findName();
    
        arr.push(item);
        globalID++
      }
      resolve(arr);
    }).then(async listings => {
      let csv = json2csvParser.parse(listings);
      await stream.write(csv + "\n");
      if (i % 100 === 0)
        console.log(
          "Load " +
            i +
            " took " +
            (performance.now() - prev) / 10 +
            " seconds."
        );
      prev = performance.now();
    })
  }
  stream.end();
  var t1 = performance.now();
  console.log("Generation took " + (t1 - t0) / 1000 + " seconds.");
})();