"use strict";

/* Make the value of all keys equal to the key */
var keyMirror = require('react/lib/keyMirror');

/* List of actions for this app */
module.exports = keyMirror({
    INITIALIZE: null,
    /* Product related actions */
    SELECT_PRODUCT: null
});
