"use strict";

var Dispatcher = require('../dispatcher/AppDispatcher');
var AuthorApi = require('../api/AuthorApi');
var ActionTypes = require('../constants/ActionTypes');

/* Define actions related to authors.  Dispatch actions to the dispatcher */
var AuthorActions = {
    /* Create a new author */
    createAuthor: function(author) {
        /* Save the author to the API, and create a pointer to the record */
        var newAuthor = AuthorApi.saveAuthor(author);

        /* Hey dispatcher, go tell all the stores that an author was just created. */
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_AUTHOR,
            author: newAuthor
        });
    },

    /* Update an author */
    updateAuthor: function(author) {
        /* Save the updated author to the author API and create a pointer to the record */
        var updatedAuthor = AuthorApi.saveAuthor(author);

        /* Dispatch the action to the dispatcher */
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_AUTHOR,
            author: updatedAuthor
        });
    },

    /* Delete an author (by id) */
    deleteAuthor: function(id) {
        /* Delete the author (by id) from the API */
        AuthorApi.deleteAuthor(id);

        /* Dispatch the delete action to the dispatcher */
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_AUTHOR,
            id: id
        })
    }
};

module.exports = AuthorActions;
