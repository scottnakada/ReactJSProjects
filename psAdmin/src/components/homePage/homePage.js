'use strict';

var React = require('react');

var HomePage = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Welcome to the Pluralsight Administration Demo Project</h1>
                <h4><p>This project was created by following the instructions in the
                    Pluralsight course "Building Applications with React and Flux" by Cory House.
                    https://app.pluralsight.com/library/courses/react-flux-building-applications/table-of-contents</p>
                </h4>
            </div>
        );
    }
});

module.exports = HomePage;