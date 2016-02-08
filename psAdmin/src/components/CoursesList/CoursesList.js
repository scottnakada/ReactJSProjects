"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var CourseActions = require('../../actions/CourseActions');
var toastr = require('toastr');

/* Display a list of courses */
var CoursesList = React.createClass({
    /* Expecting a required array of courses */
    propTypes: {
        courses: React.PropTypes.array.isRequired
    },

    /* Delete an course */
    deleteCourse: function (id, event) {
        /* Override the default action of Javascript */
        event.preventDefault();
        /* Generate a delete Course action */
        CourseActions.deleteCourse(id);
        toastr.success('Course Deleted');
    },

    /* Render the list of courses */
    render: function () {
        /* Create an course data row */
        var createCourseRow = function (course) {
            return (
                <tr key={course.id}>
                    <td>
                        <Link to="updateCourse" params={{id: course.id}}>
                            {course.id}
                        </Link>
                    </td>
                    <td>
                        {course.title}
                    </td>
                    <td>
                        <a href={course.watchHref}>Watch Video</a>
                    </td>
                    <td>
                        {course.author.name}
                    </td>
                    <td>
                        {course.length}
                    </td>
                    <td>
                        {course.category}
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.deleteCourse.bind(this, course.id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            )
        };
        /* Create a table for the course data */
        return (
            <div>
                <table className="table">
                    <thead>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Link</th>
                    <th>Author</th>
                    <th>Length</th>
                    <th>Category</th>
                    <th>Delete</th>
                    </thead>
                    <tbody>
                    {this.props.courses.map(createCourseRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = CoursesList;
