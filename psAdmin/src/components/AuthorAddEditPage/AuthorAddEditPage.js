"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('../AuthorAddEditForm/AuthorAddEditForm');
var AuthorActions = require('../../actions/AuthorActions');
var AuthorStore = require('../../stores/AuthorStore');
var toastr = require('toastr');

/* Add or edit author data */
var AuthorAddEditPage = React.createClass({
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
            author: {id: '', firstName: '', lastName: ''},
            errors: {},
            dirty: false
        };
    },

    /* Set the state before the page is rendered */
    componentWillMount: function () {
        /* This page can be accessed /author create author, or /author/:id update author */
        /* Read the id parameter to see if this is an update or create operation */
        var authorId = this.props.params.id;
        /* authorid specified means this is an update */
        if (authorId) {
            /* For async calls, need to handle callbacks, for api simulator, no problem */
            /* May want to do an API call here */
            /* Load the updated author information here */
            this.setState({author: AuthorStore.getAuthorById(authorId)});
        }
    },

    /* Called for every key press */
    setAuthorState: function (event) {
        /* The form has been modified, set the dirty flag to true */
        this.setState({dirty: true});
        /* Find the name and value of the field that was updated */
        var field = event.target.name;
        var value = event.target.value;
        /* Update the state for the field */
        this.state.author[field] = value;
        /* Return the updated state */
        return this.setState({author: this.state.author});
    },

    /* Check to see if the author form is valid */
    authorFormIsValid: function () {
        /* Assume the form is valid, and clear any error messages */
        var formIsValid = true;
        this.state.errors = {}; // Clear any previous errors.

        /* The firstName must have at least 3 characters */
        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = 'First name must be at least 3 characters.';
            formIsValid = false;
        }

        /* The last name must have at least 3 characters */
        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = 'Last name must be at least 3 characters.';
            formIsValid = false;
        }

        /* Update the state with any new error messages */
        this.setState({errors: this.state.errors});

        /* Return the form status */
        return formIsValid;
    },

    /* Save the author */
    saveAuthor: function (event) {
        /* Prevent the default javascript button press behavior */
        event.preventDefault();

        /* Validate the form */
        if (!this.authorFormIsValid()) {
            return;
        }

        /* If the author id already exists, we are updating the author */
        if (this.state.author.id) {
            /* Update the author */
            AuthorActions.updateAuthor(this.state.author);
        } else {
            /* Create a new author */
            AuthorActions.createAuthor(this.state.author);
        }
        /* All changes saved, the form is no longer dirty */
        this.setState({dirty: false});
        toastr.success('Author saved.');
        /* Go back to the authors page */
        this.transitionTo("authors");
    },

    /* Render the author add/edit page */
    render: function () {
        return (
            <div>
                <AuthorForm
                    author={this.state.author}
                    onChange={this.setAuthorState}
                    onSave={this.saveAuthor}
                    errors={this.state.errors}
                />
            </div>
        );
    }
});

module.exports = AuthorAddEditPage;
