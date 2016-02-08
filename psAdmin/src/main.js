"use strict";

var React = require('react');

var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

/* Initialize the actions for Flux (start the dispatcher) */
InitializeActions.initApp();

/* Use this line for HTML history routing.  Tags are like: localhost:9000/authors, or localhost:9000 */
/*  Router.run(routes, Router.HistoryLocation, function(Handler) { */
/* Use this line for # URLs.  Tags are like: localhost:9000/#/authors, or localhost:9000/#/ */
Router.run(routes, function (Handler) {
    React.render(
        <Handler />,
        document.getElementById('app')
    );
});
