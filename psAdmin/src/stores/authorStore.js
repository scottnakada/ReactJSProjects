"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
/* Combine the key value pairs from multiple objects into a single object */
/* This is a kludge to allow ES5 javascript do something that is a part of ES6 */
var assign = require('object-assign');
var _ = require('lodash');
var toastr = require('toastr');
var CHANGE_EVENT = 'change';

/* Private variable for storing author data */
var _authors = [];

/* Use object assign to mix the methods from the EventEmitter class with our
 custom AuthorStore class.  This is creating a new class, with EventEmitter as a base class
 */
var AuthorStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAllAuthors: function () {
        return _authors;
    },

    getAuthorById: function (id) {
        return _.find(_authors, {id: id});
    }
});

Dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.INITIALIZE:
            _authors = action.initialData.authors;
            AuthorStore.emitChange();
            break;
        case ActionTypes.CREATE_AUTHOR:
            _authors.push(action.author);
            AuthorStore.emitChange();
            break;
        case ActionTypes.UPDATE_AUTHOR:
            /* Find the existing author in the _authors array, by id */
            var existingAuthor = _.find(_authors, {id: action.author.id});
            /* Find the index of the _authors array for the existing Author record */
            var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
            /* Replace 1 record, starting at the existing authors record, and replace with the new author record */
            _authors.splice(existingAuthorIndex, 1, action.author);
            /* Let everyone interested that there has been a change */
            AuthorStore.emitChange();
            break;
        case ActionTypes.DELETE_AUTHOR:
            /* Remove the author (by id) from the store */
            _.remove(_authors, function (author) {
                /* Loop thru the _authors array, finding authors, and return true (delete) any
                 row where the author.id equals the action.id
                 */
                return action.id === author.id;
            });
            /* Let everyone interested that there has been a change */
            AuthorStore.emitChange();
            break;
        default:
            toastr.info("Unknown actiontype '" + action.actionType + "' called in the dispatcher for AuthorStore");
            break;
    }
});

module.exports = AuthorStore;
