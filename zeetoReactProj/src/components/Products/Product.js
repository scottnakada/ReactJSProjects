"use strict";

var React = require('react');

var Product = React.createClass({
    propTypes: {
        products: React.PropTypes.array.isRequired
    },
    render: function () {
        var createProductRow = function (product) {
            return (
                <div className="panel panel-primary col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 xol-xs-12"
                     key={product.id}
                     style={{maxHeight: 'inherit'}}>
                    <div className="panel-heading">
                        <div className="panel-title">
                            {product.title}
                        </div>
                    </div>
                    <div className="panel-body">
                        <img src={product.image} alt={product.title} width="100%"/>
                    </div>
                </div>
            )
        };
        return (
            <div className="row">
                {this.props.products.map(createProductRow, this)}
            </div>
        );
    }
});

module.exports = Product;
