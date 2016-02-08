'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
    render: function () {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="app" navbar-brand>
                                    <img src="images/pluralsight-logo.png" alt="Pluralsight Logo" height="30px"/>
                                </Link>
                            </li>
                            <li>
                                <Link to="app">Home</Link>
                            </li>
                            <li>
                                <Link to="authors">Authors</Link>
                            </li>
                            <li>
                                <Link to="about">About</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
});

module.exports = Header;