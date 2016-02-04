'use strict';

var React = require('react');

var Footer = React.createClass({
    render: function () {
        return (
            <div className="footer">
                <div className="container">
                    <p>
                        <a href="http://www.quickstartprototypes.com">Quickstart Prototypes</a> |
                        <a href="mailTo:scottnakada@gmail.com">scottnakada@gmail.com</a> |
                        <a href="#privacy">Privacy</a>
                    </p>
                </div>
            </div>
        );
    }
});

module.exports = Footer;