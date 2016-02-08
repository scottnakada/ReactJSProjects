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
    <Route name="app" path="/" handler={require('./components/App/App')}>
        /* Our default route will load the homePage */
        <DefaultRoute
            handler={require('./components/HomePage/HomePage')}/>
        /* /authors will load the privacy page */
        <Route
            name="authors"
            handler={require('./components/AuthorsPage/AuthorsPage')}
        />
        /* /author will load the AuthorAddEdit page */
        <Route
            name="addAuthor"
            path="author"
            handler={require('./components/AuthorAddEditPage/AuthorAddEditPage')}
        />
        /* /manageAuthor will load the manageAuthor page */
        <Route
            name="updateAuthor"
            path="author/:id"
            handler={require('./components/AuthorAddEditPage/AuthorAddEditPage')}
        />
        /* /courses will load the privacy page */
        <Route
            name="courses"
            handler={require('./components/CoursesPage/CoursesPage')}
        />
        /* /author will load the CourseAddEdit page */
        <Route
            name="addCourse"
            path="course"
            handler={require('./components/CourseAddEditPage/CourseAddEditPage')}
        />
        /* /manageAuthor will load the manageAuthor page */
        <Route
            name="updateCourse"
            path="course/:id"
            handler={require('./components/CourseAddEditPage/CourseAddEditPage')}
        />
        /* /privacy will load the privacy page */
        <Route
            name="privacy"
            handler={require('./components/PrivacyPage/PrivacyPage')}
        />
        /* /about will load the aboutPage */
        <Route
            name="about"
            handler={require('./components/AboutPage/AboutPage')}
        />
        /* Handle not found routes */
        <NotFoundRoute
            handler={require('./components/common/NotFoundPage')}
        />
    </Route>
);

/* Export routes for use by other components */
module.exports = routes;