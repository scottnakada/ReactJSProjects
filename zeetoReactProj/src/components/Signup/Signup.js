'use strict';

var React = require('react');
var Router = require('react-router');
var Product = require('../Products/Product');
var SignupForm = require('../Signup/SignupForm');
var toastr = require('toastr');
var xhr = require('../../api/XHRDriver');

var postData = '';
var submissionPath = "http://submissions.herokuapp.com/api/submissions";

var Signup = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function () {
        return {
            id: localStorage.getItem("id"),
            title: localStorage.getItem("title"),
            image: localStorage.getItem("image"),
            source: localStorage.getItem("source"),
            user: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                street: '',
                city: '',
                state: '',
                zip: ''
            },
            errors: {},
            dirty: false
        };
    },

    statics: {
        willTransitionTo: function (transition, params, query, callback) {

            /* Retrieve the title and image from local storage */
            var id = localStorage.getItem("id");
            var title = localStorage.getItem("title");
            var image = localStorage.getItem("image");

            /* See if title and image have been set on the landing page */
            if ((title == '') || (image == '')) {
                /* We need title and image for this page, ask if they want to proceed anyway */
                if (confirm("You havn't selected a product yet. Let's stay on this page?")) {
                    /* Abort the transition */
                    transition.abort();
                }
            }

            /* If we havn't aborted the transition so far, continue with the transition */
            callback();

        }
    },

    /* Called for every key press */
    setUserState: function (event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.user[field] = value;
        return this.setState({user: this.state.user});
    },

    ValidatePhone: function (inputPhone) {
        return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(inputPhone);
    },

    ValidateEmail: function (inputEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail);
    },

    ValidateZip: function (inputZip) {
        return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(inputZip);
    },

    userFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {}; // Clear any previous errors.

        if (this.state.user.firstName.length < 3) {
            this.state.errors.firstName = 'First name must be at least 3 characters.';
            formIsValid = false;
        }

        if (this.state.user.lastName.length < 3) {
            this.state.errors.lastName = 'Last name must be at least 3 characters.';
            formIsValid = false;
        }

        if (this.state.user.email.length < 3) {
            this.state.errors.email = 'Email must be at least 3 characters.';
            formIsValid = false;
        }

        if (!this.ValidateEmail(this.state.user.email)) {
            this.state.errors.email = 'This is not a valid email format.';
            formIsValid = false;
        }

        if (this.state.user.phone.length < 3) {
            this.state.errors.phone = 'Phone must be at least 3 characters.';
            formIsValid = false;
        }

        if (!this.ValidatePhone(this.state.user.phone)) {
            this.state.errors.phone = 'This is not a valid phone number format.';
            formIsValid = false;
        }

        if (this.state.user.street.length < 3) {
            this.state.errors.street = 'Street must be at least 3 characters.';
            formIsValid = false;
        }

        if (this.state.user.city.length < 3) {
            this.state.errors.city = 'City must be at least 3 characters.';
            formIsValid = false;
        }

        if (this.state.user.state.length < 2) {
            this.state.errors.state = 'State must be at least 2 characters.';
            formIsValid = false;
        }

        if (this.state.user.zip.length < 3) {
            this.state.errors.zip = 'Zip must be at least 3 characters.';
            formIsValid = false;
        }

        if (!this.ValidateZip(this.state.user.zip)) {
            this.state.errors.zip = 'This is not a valid zip code format.';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    },

    /* Format the data to post to the submissions web-site */
    formatPostData: function () {
        postData = '';
        postData += 'firstName=' + this.state.user.firstName;
        postData += '&lastName=' + this.state.user.lastName;
        postData += '&email=' + this.state.user.email;
        postData += '&phone=' + this.state.user.phone;
        postData += '&street=' + this.state.user.street;
        postData += '&city=' + this.state.user.city;
        postData += '&state=' + this.state.user.state;
        postData += '&zip=' + this.state.user.zip;
        postData += '&applicant=SMN';
        postData = encodeURI(postData);
        var cookieData = '';
        cookieData += 'source=' + localStorage.getItem("source");
        cookieData += ',id=' + localStorage.getItem("id");
        cookieData += ',title=' + localStorage.getItem("title");
        cookieData += ',image=' + localStorage.getItem("image");
        cookieData += ',firstName=' + localStorage.getItem("firstName");
        cookieData += ',lastName=' + localStorage.getItem("lastName");
        cookieData += ',email=' + localStorage.getItem("email");
        cookieData += ',phone=' + localStorage.getItem("phone");
        cookieData += ',street=' + localStorage.getItem("street");
        cookieData += ',city=' + localStorage.getItem("city");
        cookieData += ',state=' + localStorage.getItem("state");
        cookieData += ',zip=' + localStorage.getItem("zip");
        cookieData = encodeURI(cookieData);
        postData += '&cookie="' + cookieData + '"';
    },

    saveUser: function (event) {
        event.preventDefault();
        if (!this.userFormIsValid()) {
            return;
        }
        localStorage.setItem("firstName", this.state.user.firstName);
        localStorage.setItem("lastName", this.state.user.lastName);
        localStorage.setItem("email", this.state.user.email);
        localStorage.setItem("phone", this.state.user.phone);
        localStorage.setItem("street", this.state.user.street);
        localStorage.setItem("city", this.state.user.city);
        localStorage.setItem("state", this.state.user.state);
        localStorage.setItem("zip", this.state.user.zip);
        this.formatPostData();
        xhr('POST',
            submissionPath,
            'application/x-www-form-urlencoded',
            postData,
            function (error, response) {
                /* Post callback */
                if (error) {
                    console.log("Post callback:" + error);
                    throw error;
                }

                console.log("callback response:" + JSON.stringify(response));
            }
        );
        this.setState({dirty: false});
        toastr.success('Registration recieved!');
        this.transitionTo("thank-you");
    },

    render: function () {
        this.state.title = localStorage.getItem("title");
        this.state.image = localStorage.getItem("image");
        this.state.source = localStorage.getItem("source");
        return (
            <div>
                <h1>Please signup to recieve your product</h1>
                <Product products={
                    [{
                        id: this.state.id,
                        title: this.state.title,
                        image: this.state.image
                    }]
                }/>
                <SignupForm
                    user={this.state.user}
                    onChange={this.setUserState}
                    onSave={this.saveUser}
                    errors={this.state.errors}
                />
            </div>
        );
    }
});

module.exports = Signup;
