'use strict';

/* Assume we are not in debug mode */
var debug = false;

/* XML Http Request Driver function */
/*
 Inputs:
 method: 'GET', 'POST', 'PUT', 'DELETE'
 path: URL and path to the data desired
 content-type: 'application/json' for JSON; but could also be
 'application/x-www-form-urlencoded' for data encoded in the URL
 data: data to send
 callback: function to call on completion of the operation, returns two arguments
 the first argument is an error (or null if no error),
 the second argument is the return data or null if no data
 */

var xhr = function (method, path, contentType, data, callback) {
    if (debug) console.log("xhr: method=" + method + "\n     path=" + path +
        "\n     content-type=" + contentType + "\n     data=" + data + "\n============\n");
    if (debug) console.log("xhr: Instantiating an XHR");
    /* Create an XML Http Request Instance */
    var request = new XMLHttpRequest();

    if (debug) console.log("xhr: Setting up ready state monitor");
    /* Monitor the readyState to see when the the operation is done */
    /* NOTE, we are setting this up before requesting the operation, */
    /* so we will be ready when the operation is completed */
    request.onreadystatechange = function () {
        /*
         readyState values:
         0 - UNSENT - Client has been created.  open() not called yet.
         1 - OPENED - open() has been called.
         2 - HEADERS_RECEIVED - send() has been called, and headers and status are available.
         3 - LOADING - Downloading: responseText holds partial data.
         4 - DONE - The operation is complete.
         */
        /* Normally we only care about ready state 4; but we are including it here for debugging */
        if (request.readyState !== 4) {
            if (debug) {
                if (request.readyState == 0) {
                    console.log("xhr: READY STATE = UNSENT");
                } else if (request.readyState == 1) {
                    console.log("xhr: READY STATE = OPENED");
                } else if (request.readyState == 2) {
                    console.log("xhr: READY STATE = HEADERS_RECEIVED");
                } else if (request.readyState == 3) {
                    console.log("xhr: READY STATE = LOADING");
                }
            }
            /* Return if readyState is not done */
            return;
        }

        if (debug) console.log("xhr: READY STATE = DONE");
        /* If we didn't return above, the ready state must be 4 (DONE) now */
        if (request.readyState == 4 && (request.status !== 200 && request.status !== 201)) {
            callback(new Error('XHR Failed: ' + path + ', status = ' + request.status), null);
        }

        if (debug) console.log("xhr: DATA RECEIEVED OK, CALLING CALLBACK");
        if (debug) console.log("xhr: response=" + request.responseText);
        /* Return the server data */
        callback(null, JSON.parse(request.responseText));
    };

    if (debug) console.log("xhr: Opening xhr with method=" + method +
        ", at path='" + path + "', and async=true(default)");
    /*
     Open an XHR Request
     open(method, path, async) to initialize the request.

     method: a string of an HTTP method to use, such as 'GET', 'POST', 'PUT', 'DELETE'.
     This will match the Verb on the API table up top.
     path: a string of the full path to send the request to. This will include the API
     endpoint URL as well as the path.
     async: a boolean flag that dictates whether the script should run asynchronously.
     NOTE: async should always be true to prevent blocking.  Stopping JavaScript
     execution especially hurts time sensitive things like rendering or event
     listening/handling
     */
    request.open(method, path, true);

    if (debug) console.log("xhr: Setting the content-type to: " + contentType);
    /* Set the content type to JSON data format */
    request.setRequestHeader('Content-Type', contentType);

    /* Is this a json or urlencoded format data */
    if (contentType == "application/json") {
        if (debug) console.log("xhr: Sending the XHR request in JSON format");
        /* Send the XHR request, remember the response will be taken care of in the onreadystate callback */
        request.send(JSON.stringify(data));
    } else {
        if (debug) console.log("xhr: Sending the XHR request in url encoded format");
        /* urlencoded data */
        request.send(data);
    }

};

module.exports = xhr;
