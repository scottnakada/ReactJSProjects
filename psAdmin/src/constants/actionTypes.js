"use strict";

/* Make the value of all keys equal to the key */
var keyMirror = require('react/lib/keyMirror');

/* List of actions for this app */
module.exports = keyMirror({
    INITIALIZE: null,
    CREATE_AUTHOR: null,
    UPDATE_AUTHOR: null,
    DELETE_AUTHOR: null
});
