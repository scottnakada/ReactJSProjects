"use strict";

var Dispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');
var ProductApi = require('../api/ProductApi');

var InitializeActions = {
    initApp: function () {
        ProductApi.getAllProducts(function (error, products) {
            /* Was there an error getting the data? */
            if (error) {
                throw error;
            }
            /* Otherwise, dispatch the INITIALIZE action to initialize the data */
            Dispatcher.dispatch({
                actionType: ActionTypes.INITIALIZE,
                initialData: {
                    products: products
                }
            });
        })
    }
};

module.exports = InitializeActions;
