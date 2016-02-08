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

/* Private variable for storing course data */
var _courses = [];

/* Use object assign to mix the methods from the EventEmitter class with our
 custom CourseStore class.  This is creating a new class, with EventEmitter as a base class
 */
var CourseStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAllCourses: function () {
        return _courses;
    },

    getCourseById: function (id) {
        return _.find(_courses, {id: id});
    }
});

Dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.INITIALIZE:
            _courses = action.initialData.courses;
            CourseStore.emitChange();
            break;
        case ActionTypes.CREATE_COURSE:
            _courses.push(action.course);
            CourseStore.emitChange();
            break;
        case ActionTypes.UPDATE_COURSE:
            /* Find the existing course in the _courses array, by id */
            var existingCourse = _.find(_courses, {id: action.course.id});
            /* Find the index of the _courses array for the existing Course record */
            var existingCourseIndex = _.indexOf(_courses, existingCourse);
            /* Replace 1 record, starting at the existing courses record, and replace with the new course record */
            _courses.splice(existingCourseIndex, 1, action.course);
            /* Let everyone interested that there has been a change */
            CourseStore.emitChange();
            break;
        case ActionTypes.DELETE_COURSE:
            /* Remove the course (by id) from the store */
            _.remove(_courses, function (course) {
                /* Loop thru the _courses array, finding courses, and return true (delete) any
                 row where the course.id equals the action.id
                 */
                return action.id === course.id;
            });
            /* Let everyone interested that there has been a change */
            CourseStore.emitChange();
            break;
        default:
            break;
    }
});

module.exports = CourseStore;
