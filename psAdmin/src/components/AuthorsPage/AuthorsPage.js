"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var AuthorActions = require('../../actions/AuthorActions');
var AuthorStore = require('../../stores/AuthorStore');
var AuthorsList = require('../AuthorsList/AuthorsList');

/* Show a list of authors controller page*/
var AuthorsPage = React.createClass({
    getInitialState: function () {
        /* Set the initial state by getting the authors from the AuthorStore */
        return {
            authors: AuthorStore.getAllAuthors()
        };
    },

    /* Register to be re-rendered on changes at the AuthorStore */
    componentWillMount: function () {
        AuthorStore.addChangeListener(this._onChange);
    },
    /* Un-Register with the dispatcher when the component goes away */
    componentWillUnmount: function () {
        AuthorStore.removeChangeListener(this._onChange);
    },

    /* On changes to the Author Store, update the state, with the new author information */
    _onChange: function () {
        this.setState({authors: AuthorStore.getAllAuthors()});
    },

    /* Render the AuthorsPage */
    render: function () {
        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-primary btn-lrg">Add Author</Link>
                <AuthorsList authors={this.state.authors}/>
            </div>
        );
    }
});

module.exports = AuthorsPage;
