$ = jQuery = require('jquery');

var React = require('react');
var Home = require('./components/Home/Home');
var Header = require('./components/Header/Header');
var Footer = require('./components/Footer/Footer');
var About = require('./components/About/About');
var Privacy = require('./../../RouterNav/src/components/Privacy/Privacy');

(function (win) {
    'use strict';

    var App = React.createClass({
        render: function () {
            var Child;

            switch (this.props.route) {
                case 'home':
                    Child = Home;
                    break;
                case 'about':
                    Child = About;
                    break;
                case 'privacy':
                    Child = Privacy;
                    break;
                default:
                    Child = Home;
                    break;
            }

            return (
                <div>
                    <Header />

                    <Child/>

                    <Footer />
                </div>
            );
        }
    });

    function render() {
        var route = win.location.hash.substr(1);
        React.render(<App route={route}/>,
            document.getElementById('app'));
    }

    window.addEventListener('hashchange', render);
    render();
})(window);