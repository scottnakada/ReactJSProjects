"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('../CourseAddEditForm/CourseAddEditForm');
var CourseActions = require('../../actions/CourseActions');
var CourseStore = require('../../stores/CourseStore');
var toastr = require('toastr');

/* Add or edit course data */
var CourseAddEditPage = React.createClass({
    /* Allow transitions to other pages */
    mixins: [
        Router.Navigation
    ],

    statics: {
        /* If the form hasn't been saved, ask the user if he wants to leave without saving data */
        willTransitionFrom: function (transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },

    /* Initialize the state variables of the component */
    getInitialState: function () {
        return {
            course: {id: '', firstName: '', lastName: ''},
            errors: {},
            dirty: false
        };
    },

    /* Set the state before the page is rendered */
    componentWillMount: function () {
        /* This page can be accessed /course create course, or /course/:id update course */
        /* Read the id parameter to see if this is an update or create operation */
        var courseId = this.props.params.id;
        /* courseid specified means this is an update */
        if (courseId) {
            /* For async calls, need to handle callbacks, for api simulator, no problem */
            /* May want to do an API call here */
            /* Load the updated course information here */
            this.setState({course: CourseStore.getCourseById(courseId)});
        }
    },

    /* Called for every key press */
    setCourseState: function (event) {
        /* The form has been modified, set the dirty flag to true */
        this.setState({dirty: true});
        /* Find the name and value of the field that was updated */
        var field = event.target.name;
        var value = event.target.value;
        /* Update the state for the field */
        this.state.course[field] = value;
        /* Return the updated state */
        return this.setState({course: this.state.course});
    },

    /* Check to see if the course form is valid */
    courseFormIsValid: function () {
        /* Assume the form is valid, and clear any error messages */
        var formIsValid = true;
        this.state.errors = {}; // Clear any previous errors.

        /* The title must have at least 3 characters */
        if (this.state.course.title.length < 3) {
            this.state.errors.firstName = 'Title must be at least 3 characters.';
            formIsValid = false;
        }

        /* The Link URL must have at least 3 characters */
        if (this.state.course.watchHref.length < 1) {
            this.state.errors.watchHref = 'Link URL must be at least 3 characters.';
            formIsValid = false;
        }

        /* The length must have at least 3 characters */
        if (this.state.course.duration.length < 3) {
            this.state.errors.duration = 'Duration must be at least 3 characters.';
            formIsValid = false;
        }

        /* The category must have at least 3 characters */
        if (this.state.course.category.length < 3) {
            this.state.errors.category = 'Category must be at least 3 characters.';
            formIsValid = false;
        }

        /* Update the state with any new error messages */
        this.setState({errors: this.state.errors});

        /* Return the form status */
        return formIsValid;
    },

    /* Save the course */
    saveCourse: function (event) {
        /* Prevent the default javascript button press behavior */
        event.preventDefault();

        /* Validate the form */
        if (!this.courseFormIsValid()) {
            return;
        }

        /* If the course id already exists, we are updating the course */
        if (this.state.course.id) {
            /* Update the course */
            CourseActions.updateCourse(this.state.course);
        } else {
            /* Use a default instructor */
            this.state.course.author = {name: "Scott Nakada", id: "scott-nakada"};
            /* Create a new course */
            CourseActions.createCourse(this.state.course);
        }
        /* All changes saved, the form is no longer dirty */
        this.setState({dirty: false});
        toastr.success('Course saved.');
        /* Go back to the courses page */
        this.transitionTo("courses");
    },

    /* Render the course add/edit page */
    render: function () {
        return (
            <div>
                <CourseForm
                    course={this.state.course}
                    onChange={this.setCourseState}
                    onSave={this.saveCourse}
                    errors={this.state.errors}
                />
            </div>
        );
    }
});

module.exports = CourseAddEditPage;
