var _ = require('lodash');
var xhr = require('./XHRDriver');

/* Assume we are using mock data for testing */
var useMockData = false;

/* Setup a data structure to hold the zeeto data */
var zeetoData = [];
var zeetoRawData;

var zeetoAPIURL = "http://www.getitfree.us/api/posts.json?filter=popular&limit=8";

function processIncomingData(zeetoRawData) {
    /* Scan thru the raw data to extract the data needed */
    for (var key in zeetoRawData) {
        zeetoData.push({
            id: zeetoRawData[key].id,
            title: zeetoRawData[key].title,
            image: zeetoRawData[key].images[0],
            description: zeetoRawData[key].description
        });
    }
}

function showProcessedData() {
    for (var key in zeetoData) {
        console.log("Key:" + key +
            ", id=" + zeetoData[key].id +
            ", title=" + zeetoData[key].title +
            ", image=" + zeetoData[key].image
        );
    }
}

var _clone = function (item) {
    return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

var ProductApi = {
    getAllProducts: function (callback) {
        /* See if we are using mock data, or accessing the API */
        if (useMockData) {
            console.log("Connecting to mock API to retrieve data");
            /* Read mock data from the file ZeetoData.js */
            var zeetoRawData = require('./ProductData').zeetoData;

            /* Process the raw data */
            processIncomingData(zeetoRawData.data);
            //showProcessedData();
            callback(null, _clone(zeetoData));
        } else {
            console.log("Connecting to Zeeto API to retrieve data");
            xhr('GET', zeetoAPIURL, 'application/json', {}, function (error, response) {
                if (error) {
                    callback(error, null);
                } else {
                    zeetoRawData = response;
                    processIncomingData(zeetoRawData.data);
                    //showProcessedData();
                    callback(null, _clone(zeetoData));
                }
            });

        }

        /* Return from the program while waiting for the data to be processed */
        /* The returned data will be sent back via the callback */
    }
};

module.exports = ProductApi;
