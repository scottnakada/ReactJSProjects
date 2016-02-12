'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Navbar = require('../Navbar/Navbar');

var Header = React.createClass({
    render: function () {
        return (
            <div>
                <Navbar />
                <div className="jumbotron">
                    <h1>Get Free Products!</h1>
                    <p>Zeeto Interview Project<br />
                        by Scott Nakada</p>
                </div>
            </div>
        );
    }
});

module.exports = Header;