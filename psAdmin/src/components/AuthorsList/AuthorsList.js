"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorActions = require('../../actions/AuthorActions');
var toastr = require('toastr');

/* Display a list of authors */
var AuthorsList = React.createClass({
    /* Expecting a required array of authors */
    propTypes: {
        authors: React.PropTypes.array.isRequired
    },

    /* Delete an author */
    deleteAuthor: function (id, event) {
        /* Override the default action of Javascript */
        event.preventDefault();
        /* Generate a delete Author action */
        AuthorActions.deleteAuthor(id);
        toastr.success('Author Deleted');
    },

    /* Render the list of authors */
    render: function () {
        /* Create an author data row */
        var createAuthorRow = function (author) {
            return (
                <tr key={author.id}>
                    <td>
                        <Link to="updateAuthor" params={{id: author.id}}>
                            {author.id}
                        </Link>
                    </td>
                    <td>
                        {author.firstName} {author.lastName}
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.deleteAuthor.bind(this, author.id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            )
        };
        /* Create a table for the author data */
        return (
            <div>
                <table className="table">
                    <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Delete</th>
                    </thead>
                    <tbody>
                    {this.props.authors.map(createAuthorRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = AuthorsList;
