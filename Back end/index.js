'use strict'
// index.js
// This is our main server file


// include express
const express = require("express");

// parse requests
const bodyParser = require('body-parser');

// create object to interface with express
const app = express();

// include fetch
const fetch = require("cross-fetch");

// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
})

// Get JSON out of HTTP request body, JSON.parse, and put object into req.body
app.use(bodyParser.json());

// No static server or /public because this server
// is only for AJAX requests


app.get('/query/getList', function(req, res, next) {
  console.log("Received AJAX request");
  getDataFromCDEC(4, 2022)
  .then( function(data) {
    res.json(data);
  })
});

app.use('/query/getData', function(req, res, next) {
  console.log("Received AJAX request at /getData");
  let data = req.body;
  console.log(data);
  getDataFromCDEC(data.month, data.year)
  .then( function(data) {
    res.json(data);
  })
});

app.use(function(req, res, next) {
  res.json({msg: "No such AJAX request"})
});

// end of pipeline specification
// respond to all AJAX querires with this message
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});

const stations = 'SHA,ORO,CLE,NML,SNL,DNP,BER';
//+++++++++++++++++++++++++++++++++++++++++++++++++
// works now, sends all the data for given stations
async function getDataFromCDEC(month, year) {
  const api_url = `https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=${stations}&SensorNums=15&dur_code=M&Start=${year}-${month}&End=${year}-${month}`;
  let data = await getData(api_url);
  console.log(data);
  return data;
}

async function getData(api_url) {
  // send it off
  let fetchResponse = await fetch(api_url);
  let data = await fetchResponse.json();
  return data
}