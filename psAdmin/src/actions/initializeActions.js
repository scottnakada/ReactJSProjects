"use strict";

var Dispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/ActionTypes');
var AuthorApi = require('../api/AuthorApi');
var CourseApi = require('../api/CourseApi');

var InitializeActions = {
    initApp: function() {
        Dispatcher.dispatch({
            actionType: ActionTypes.INITIALIZE,
            initialData: {
                authors: AuthorApi.getAllAuthors(),
                courses: CourseApi.getAllCourses()
            }
        });
    }
};

module.exports = InitializeActions;
