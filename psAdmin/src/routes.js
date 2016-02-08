"use strict";

/* Use the react library */
var React = require('react');

/* Use the react-router library for routing */
var Router = require('react-router');
/* Define the default route, if none is specified */
var DefaultRoute = Router.DefaultRoute;
/* Create a reference to the Route component, used to define a route */
var Route = Router.Route;
/* Access the NotFoundRoute component of Router */
var NotFoundRoute = Router.NotFoundRoute;
/* Access the Redirect component of Router */
var Redirect = Router.Redirect;

/* Define the routes for this system */
var routes = (
    /* Load our app if only the / is specified */
    <Route name="app" path="/" handler={require('./components/app')}>
        /* Our default route will load the homePage */
        <DefaultRoute handler={require('./components/homePage/homePage')}/>
        /* /authors will load the authors page */
        <Route name="authors" handler={require('./components/authors/authorPage')}/>
        /* /addAuthor will load the manageAuthor page */
        <Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorPage')}/>
        /* /manageAuthor will load the manageAuthor page */
        <Route name="manageAuthor" path="author/:id" handler={require('./components/authors/manageAuthorPage')}/>
        /* /about will load the aboutPage */
        <Route name="about" handler={require('./components/about/aboutPage')}/>
        /* Handle not found routes */
        <NotFoundRoute handler={require('./components/common/notFoundPage')}/>
        /* Redirect from an old reference to about-us to about */
        <Redirect from="about-us" to="about"/>
        /* Autocorrect for spelling errors */
        <Redirect from="awthers" to="authors"/>
        /* Use wildcards to redirect to the about page */
        <Redirect from="about/*" to="about"/>
    </Route>
);

/* Export routes for use by other components */
module.exports = routes;
