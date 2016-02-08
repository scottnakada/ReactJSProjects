"use strict";

var Dispatcher = require('../dispatcher/AppDispatcher');
var CourseApi = require('../api/CourseApi');
var ActionTypes = require('../constants/ActionTypes');

/* Define actions related to courses.  Dispatch actions to the dispatcher */
var CourseActions = {
    /* Create a new course */
    createCourse: function(course) {
        /* Save the course to the API, and create a pointer to the record */
        var newCourse = CourseApi.saveCourse(course);

        /* Hey dispatcher, go tell all the stores that an course was just created. */
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_COURSE,
            course: newCourse
        });
    },

    /* Update an course */
    updateCourse: function(course) {
        /* Save the updated course to the course API and create a pointer to the record */
        var updatedCourse = CourseApi.saveCourse(course);

        /* Dispatch the action to the dispatcher */
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_COURSE,
            course: updatedCourse
        });
    },

    /* Delete an course (by id) */
    deleteCourse: function(id) {
        /* Delete the course (by id) from the API */
        CourseApi.deleteCourse(id);

        /* Dispatch the delete action to the dispatcher */
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_COURSE,
            id: id
        })
    }
};

module.exports = CourseActions;
