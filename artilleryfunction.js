/*
This file generates random endpoints (i.e. listing ID #'s) for Artillery stress testing. 
*/

'use strict';

const createRandomEndpoint = (context, events, done) => {
    let id = Math.random() * (1999999-10) + 10;
    context.vars.listingID = id;
    return done();
};

module.exports = { createRandomEndpoint }
