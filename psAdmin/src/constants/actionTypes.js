"use strict";

/* Make the value of all keys equal to the key */
var keyMirror = require('react/lib/keyMirror');

/* List of actions for this app */
module.exports = keyMirror({
    INITIALIZE: null,
    /* Author related actions */
    CREATE_AUTHOR: null,
    UPDATE_AUTHOR: null,
    DELETE_AUTHOR: null,
    /* Course Related Actions */
    CREATE_COURSE: null,
    UPDATE_COURSE: null,
    DELETE_COURSE: null
});
