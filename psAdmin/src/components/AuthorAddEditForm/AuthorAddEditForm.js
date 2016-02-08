"use strict";

var React = require('react');
var Input = require('../common/TextInput');

/* Show the Author Add/Edit form */
var AuthorAddEditForm = React.createClass({
    /*
     Inputs for this component
     author - object containing the id, first and last name of an author, required
     onSave - function to be executed when the Save button is pressed required
     onChange - function to be executed when a field changes, required
     errors - object containing error message for each field
     */
    propTypes: {
        author: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    /* Render the Form */
    render: function () {
        return (
            <form>
                <Input
                    name="firstName"
                    label="First Name"
                    onChange={this.props.onChange}
                    placeholder="First Name"
                    value={this.props.author.firstName}
                    error={this.props.errors.firstName}
                />

                <Input
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    onChange={this.props.onChange}
                    value={this.props.author.lastName}
                    error={this.props.errors.lastName}
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

module.exports = AuthorAddEditForm;
