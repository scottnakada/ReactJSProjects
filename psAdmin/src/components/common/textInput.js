"use strict";

var React = require('react');

/* TextInput - Input a text field, and allow for error handling */
var TextInput = React.createClass({
    /*
     Inputs for this component
     name - name of the input field, string type, required
     label - label for the input field, string type, required
     onChange - function to perform whenever the field is changes, required
     placeholder - optional placeholder value of the field
     value - optional initial value of the field (component will always be a controlled component
     error - optional error string, displayed below the field
     */
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        error: React.PropTypes.string
    },
    /* Render the Text Input field */
    render: function () {
        /* Change the class of the field to add has-error, in case of an error */
        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " " + 'has-error';
        }
        /* Return the text input field HTML */
        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">

                    <input
                        type="text"
                        name={this.props.name}
                        className="form-control"
                        placeholder={this.props.placeholder}
                        ref={this.props.name}
                        onChange={this.props.onChange}
                        value={this.props.value}
                    />
                    <div className="input">{this.props.error}</div>
                </div>
            </div>
        );
    }
});

module.exports = TextInput;
