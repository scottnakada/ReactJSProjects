"use strict";

var React = require('react');
var Router = require('react-router');

var ProductActions = require('../../actions/ProductActions');

var ProductList = React.createClass({
    /* Allow transitions to other pages */
    mixins: [
        Router.Navigation
    ],

    propTypes: {
        products: React.PropTypes.array.isRequired
    },
    /* Select a Product */
    selectProduct: function (id, title, image, event) {
        /* Override the default action of Javascript */
        event.preventDefault();
        /* Generate a select Product action */
        ProductActions.selectProduct(id, title, image);
        this.transitionTo("signup");
    },
    render: function () {
        var createProductRow = function (product) {
            return (
                <div className="panel panel-primary col-lg-3 col-md-4 col-sm-6 col-xs-12"
                     key={product.id}
                     style={{height: 770}}>
                    <div className="panel-heading">
                        <div className="panel-title">
                            {product.title}
                        </div>
                    </div>
                    <div className="panel-body">
                        <img src={product.image} alt={product.title} width="100%"/>
                        <br />
                        <h2>Description:</h2>
                        <p dangerouslySetInnerHTML={{__html: product.description}}>
                        </p>
                        <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={this.selectProduct.bind(this, product.id, product.title, product.image)}>
                            Pick Me!
                        </button>
                    </div>
                </div>
            )
        };
        return (
            <div>
                <div>
                    {this.props.products.map(createProductRow, this)}
                </div>
            </div>
        );
    }
});

module.exports = ProductList;
