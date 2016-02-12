"use strict";

var Dispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');
var EventEmitter = require('events').EventEmitter;
/* Combine the key value pairs from multiple objects into a single object */
/* This is a kludge to allow ES5 javascript do something that is a part of ES6 */
var assign = require('object-assign');
var _ = require('lodash');
var toastr = require('toastr');

var CHANGE_EVENT = 'change';

/* Private variable for storing product data */
var _products = [];
var _selectedProduct = {
    id: '',
    title: '',
    image: ''
};


/* Use object assign to mix the methods from the EventEmitter class with our
 custom ProductStore class.  This is creating a new class, with EventEmitter as a base class
 */
var ProductStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAllProducts: function () {
        return _products;
    },

    getProductById: function (id) {
        return _.find(_products, {id: id});
    },

    getSelectedProductId: function () {
        return _selectedProduct.id;
    },

    getSelectedTitle: function () {
        return _selectedProduct.title;
    },

    getSelectedImage: function () {
        return _selectedProduct.image;
    }

});

Dispatcher.register(function (action) {
    //toastr.info("Dispatcher Action: actionType=" + action.actionType);
    switch (action.actionType) {
        case ActionTypes.INITIALIZE:
            _products = action.initialData.products;
            ProductStore.emitChange();
            break;
        case ActionTypes.SELECT_PRODUCT:
            //console.log("ProductStore: selecting a product, id=" + action.selectedProduct.id +
            //    ", title=" + action.selectedProduct.title +
            //    ", image=" + action.selectedProduct.image);
            /* Store the id of the product which has been selected */
            _selectedProduct.id = action.selectedProduct.id;
            _selectedProduct.title = action.selectedProduct.title;
            _selectedProduct.image = action.selectedProduct.image;
            break;
        default:
            break;
    }
});

module.exports = ProductStore;
