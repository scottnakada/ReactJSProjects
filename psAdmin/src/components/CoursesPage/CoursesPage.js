"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var CourseActions = require('../../actions/CourseActions');
var CourseStore = require('../../stores/CourseStore');
var CoursesList = require('../CoursesList/CoursesList');

/* Show a list of courses controller page*/
var CoursesPage = React.createClass({
    getInitialState: function () {
        /* Set the initial state by getting the courses from the CourseStore */
        return {
            courses: CourseStore.getAllCourses()
        };
    },

    /* Register to be re-rendered on changes at the CourseStore */
    componentWillMount: function () {
        CourseStore.addChangeListener(this._onChange);
    },
    /* Un-Register with the dispatcher when the component goes away */
    componentWillUnmount: function () {
        CourseStore.removeChangeListener(this._onChange);
    },

    /* On changes to the Course Store, update the state, with the new course information */
    _onChange: function () {
        this.setState({courses: CourseStore.getAllCourses()});
    },

    /* Render the CoursesPage */
    render: function () {
        return (
            <div>
                <h1>Courses</h1>
                <Link to="addCourse" className="btn btn-primary btn-lrg">Add Course</Link>
                <CoursesList courses={this.state.courses}/>
            </div>
        );
    }
});

module.exports = CoursesPage;
