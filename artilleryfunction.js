/*
This file generates random endpoints (i.e. listing ID #'s) for Artillery stress testing. 
*/

'use strict';

const createRandomEndpoint = (context, events, done) => {
    let id = Math.floor(Math.random() * (999999-7190) + 7190);
    // console.log(`Random ID ${id} was created.`);
    context.vars.listingID = id;
    return done();
};

module.exports = { createRandomEndpoint }
