"use strict";

var React = require('react');

var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/InitializeActions');

/* Initialize the Flux System */
InitializeActions.initApp();

/* Use this line for HTML history routing.  Tags are like: localhost:9000/authors, or localhost:9000 */
 Router.run(routes, function(Handler) {
/* Use this line for # URLs.  Tags are like: localhost:9000/#/authors, or localhost:9000/#/ */
/*     Router.run(routes, function(Handler) { */
    React.render(
        <Handler />,
        document.getElementById('app')
    );
});
