'use strict';

var React = require('react');
var toastr = require('toastr');

var ProductStore = require('../../stores/ProductStore');
var ProductList = require('../Products/ProductList');


var LandingPage = React.createClass({
    getInitialState: function () {
        return {
            source: '',
            id: ProductStore.getSelectedProductId(),
            title: ProductStore.getSelectedTitle(),
            image: ProductStore.getSelectedImage(),
            products: ProductStore.getAllProducts()
        };
    },

    statics: {
        willTransitionFrom: function (transition, component) {
            /* Get the title and image for display in future pages */
            var id = ProductStore.getSelectedProductId();
            var title = ProductStore.getSelectedTitle();
            var image = ProductStore.getSelectedImage();
            localStorage.setItem("id", id);
            localStorage.setItem("title", title);
            localStorage.setItem("image", image);
        }
    },

    /* Register to be re-rendered on changes at the ProductStore */
    componentWillMount: function () {
        ProductStore.addChangeListener(this._onChange);
    },
    /* Un-Register with the dispatcher when the component goes away */
    componentWillUnmount: function () {
        ProductStore.removeChangeListener(this._onChange);
    },

    /* On changes to the Product Store, update the state, with the new product information */
    _onChange: function () {
        this.setState({products: ProductStore.getAllProducts()});
    },

    componentDidMount: function () {
        if (this.isMounted()) {
            /* Read the URL query string parameter source */
            var sourceValue = this.props.query.source;
            if (!(sourceValue == "Google") && !(sourceValue == "Facebook") && !(sourceValue == "Twitter")) {
                toastr.info("Be sure to set your source.  Try localhost:9000/#/landing?source=Facebook! Your source: '" +
                    sourceValue + "', is not valid, so we will use Google");
                /* Invalid value for source, choose a default value */
                sourceValue = "Google";
            }
            console.log("source=", this.props.query.source);
            /* Store the source in the state */
            this.state.source = sourceValue;
            /* Store the source value in local storage */
            localStorage.setItem("source", sourceValue);
            /* Access the zeeto API */
            var zeetoData = ProductStore.getAllProducts();
            /* Set the products state to the zeeto API Data */
            this.setState({products: zeetoData});
            //toastr.success("Product data loaded successfully");
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

    saveSelected: function (event) {
        event.preventDefault();
        if (!this.userFormIsValid()) {
            return;
        }
        //ProductApi.saveProduct(this.state.product);
        localStorage.setItem("firstName", this.state.user.firstName);
        localStorage.setItem("lastName", this.state.user.lastName);
        localStorage.setItem("email", this.state.user.email);
        localStorage.setItem("phone", this.state.user.phone);
        localStorage.setItem("street", this.state.user.street);
        localStorage.setItem("city", this.state.user.city);
        localStorage.setItem("state", this.state.user.state);
        localStorage.setItem("zip", this.state.user.zip);
        this.setState({dirty: false});
        toastr.success('User saved.');
        this.transitionTo("thank-you");
    },

    render: function () {

        return (
            <div>
                <h1>Check out these free samples!</h1>
                <h2>Select a sample below</h2>

                <ProductList products={this.state.products}/>

            </div>
        );
    }
});

module.exports = LandingPage;
