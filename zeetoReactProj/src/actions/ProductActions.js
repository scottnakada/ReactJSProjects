"use strict";

var Dispatcher = require('../dispatcher/AppDispatcher');
var ProductApi = require('../api/ProductApi');
var ActionTypes = require('../constants/ActionTypes');

/* Define actions related to products.  Dispatch actions to the dispatcher */
var ProductActions = {

    /* Select an product (by id) */
    selectProduct: function(id, title, image) {
        /* Dispatch the select action to the dispatcher */
        Dispatcher.dispatch({
            actionType: ActionTypes.SELECT_PRODUCT,
            selectedProduct: {
                id: id,
                title: title,
                image: image
            }
        })
    }
};

module.exports = ProductActions;
