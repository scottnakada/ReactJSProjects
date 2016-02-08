'use strict';

var React = require('react');

var AboutPage = React.createClass({
    render: function () {
        return (
            <div>
                <h1>About</h1>
                <h4>
                    <p>
                        This application uses the following technologies:
                        <ul>
                            <li>React</li>
                            <li>React Router</li>
                            <li>Flux</li>
                            <li>Node</li>
                            <li>Gulp</li>
                            <li>Browserify</li>
                            <li>Bootstrap</li>
                        </ul>
                    </p>
                </h4>
            </div>
        );
    }
});

module.exports = AboutPage;