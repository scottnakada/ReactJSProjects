'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Navbar = require('./Navbar');

var Header = React.createClass({
    render: function () {
        return (
            <div>
                <Navbar />
                <div className="jumbotron">
                    <h1>Pluralsight Administration</h1>
                    <p>React, React Router, and Flux for ultra responsive web apps.</p>
                    <Link to="about" className="btn btn-info btn-lg">Learn More</Link>
                </div>
            </div>
        );
    }
});

module.exports = Header;