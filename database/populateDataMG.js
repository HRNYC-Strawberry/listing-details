// This is the file used to populate mongoDB

const mongoose = require("mongoose");
const Listing = require("./models/ListingSchema.js");
const faker = require("faker");
const { performance, PerformanceObserver } = require("perf_hooks");
const stream = require("stream");
const fs = require("fs");

/* for debugging */
const util = require("util");
const debug = util.debuglog("performance");

var t0 = performance.now();

// global variables
var batch = [];
var start = 1;
var end = 1000;
var globalID = 1;

async function generateData() {
  // let dataArray = [];
  // let storageArray = [];
  let listing;
  for (let i = 1; i <= 10000; i++) {
    let item = {};
    item._id = globalID;
    globalID++;

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

    if (i >= 75 && i < 100) {
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

    batch.push(item);
  }
  insertData();
}
// generateData();

// TO POPULATE MONGO DB
function insertData() {
  Listing.insertMany(batch, {ordered: false}, (err, data) => {
    if (err) {
      console.log(err);
    } else if (start <= end) {
      start++
      console.log(start);
      batch = [];
      generateData();
    } else {
      console.timeEnd('DB Insert');
    }
  })
}

// async function insertThings(j) {
//   for( var i =0; i< j;i++){
//     batch = [];
//     await generateData()
//     await Listing.insertMany(batch, {ordered:"false"}).then(() =>{});
//   }
// }
// insertThings(1)

console.time('DB Insert')
insertData();

// To load DB:
// for (var i = 0; i < dataArray.length; i++) {
//   let data = dataArray[i];
//   listing = new Listing({
//     id: data.id,
//     price: data.price,
//     squareFootage: data.squareFootage,
//     pricePerSquareFoot: data.pricePerSquareFoot,
//     rooms: data.rooms,
//     beds: data.beds,
//     baths: data.baths,
//     houseType: data.houseType,
//     neighborhood: data.neighborhood,
//     streetAddress: data.streetAddress,
//     stars: data.stars,
//     realty: data.realty,
//     shortRealty: data.shortRealty,
//     realtor: data.realtor
//   });
//   storageArray.push(listing);
// }
// listing.collection.insertMany(storageArray, err => {
//   if (err) {
//     console.log(err);
//   } else {
//     var t1 = performance.now();
//     console.log("Completed.");
//   }
// });

// Drop db before seed
// Listing.remove({}).exec((err, results) => {
//   if (err) {
//     console.log(err);
//   }
//   const myListing = new Listing;
//   myListing.generateData();
// });