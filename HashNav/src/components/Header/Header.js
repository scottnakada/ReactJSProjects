'use strict';

var React = require('react');
var Navbar = require('../../components/Navbar/Navbar');

var Header = React.createClass({
    render: function () {
        return (
            <div>
                <Navbar />
                <div className="jumbotron">
                    <h1>Hash Tag Navigation Demo</h1>
                    <p>Use # tags in the route to select pages, without using a router.</p>
                </div>
            </div>
        );
    }
});

module.exports = Header;