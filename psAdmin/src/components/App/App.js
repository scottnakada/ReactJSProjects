/*eslint-disable strict */ // Disabling check because we can't run strict mode.  Need global variables.

var React = require('react');
var Header = require('../common/Header');
var Footer = require('../common/Footer');
var RouteHandler = require('react-router').RouteHandler;
$ = jQuery = require('jquery');

/* Define the structure for all pages, to include a Header (with navbar), and a Footer */
/* All other pages are inserted here with the RouteHandler */
var App = React.createClass({
    render: function () {

        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <RouteHandler />
                </div>
                <Footer />
            </div>
        );
    }
});

module.exports = App;