"use strict";

var React = require('react');
var Input = require('../common/TextInput');

/* Show the Course Add/Edit form */
var CourseAddEditForm = React.createClass({
    /*
     Inputs for this component
     course - object containing the id, first and last name of an course, required
     onSave - function to be executed when the Save button is pressed required
     onChange - function to be executed when a field changes, required
     errors - object containing error message for each field
     */
    propTypes: {
        course: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    /* Render the Form */
    render: function () {
        return (
            <form>
                <Input
                    name="title"
                    label="Title"
                    onChange={this.props.onChange}
                    placeholder="Title"
                    value={this.props.course.title}
                    error={this.props.errors.title}
                />

                <Input
                    name="watchHref"
                    label="Link URL"
                    placeholder="Link URL"
                    onChange={this.props.onChange}
                    value={this.props.course.watchHref}
                    error={this.props.errors.watchHref}
                />

                <Input
                    name="duration"
                    label="Duration"
                    onChange={this.props.onChange}
                    placeholder="Duration"
                    value={this.props.course.duration}
                    error={this.props.errors.duration}
                />

                <Input
                    name="category"
                    label="Category"
                    onChange={this.props.onChange}
                    placeholder="Category"
                    value={this.props.course.category}
                    error={this.props.errors.category}
                />

                <input
                    type="submit"
                    value="Save"
                    className="btn btn-default"
                    onClick={this.props.onSave}
                />

            </form>
        );
    }
});

module.exports = CourseAddEditForm;
