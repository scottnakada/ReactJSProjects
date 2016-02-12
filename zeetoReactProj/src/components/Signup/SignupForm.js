"use strict";

var React = require('react');
var Input = require('../common/textInput');

var SignupForm = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    render: function () {
        return (
            <form>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <Input
                            name="firstName"
                            label="First Name"
                            onChange={this.props.onChange}
                            placeholder="First Name"
                            value={this.props.user.firstName}
                            error={this.props.errors.firstName}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <Input
                            name="lastName"
                            label="Last Name"
                            placeholder="Last Name"
                            onChange={this.props.onChange}
                            value={this.props.user.lastName}
                            error={this.props.errors.lastName}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <Input
                            name="email"
                            label="E-Mail"
                            placeholder="E-Mail"
                            onChange={this.props.onChange}
                            value={this.props.user.email}
                            error={this.props.errors.email}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <Input
                            name="phone"
                            label="Phone"
                            placeholder="Phone"
                            onChange={this.props.onChange}
                            value={this.props.user.phone}
                            error={this.props.errors.phone}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <Input
                            name="street"
                            label="Street"
                            placeholder="Street"
                            onChange={this.props.onChange}
                            value={this.props.user.street}
                            error={this.props.errors.street}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <Input
                            name="city"
                            label="City"
                            placeholder="City"
                            onChange={this.props.onChange}
                            value={this.props.user.city}
                            error={this.props.errors.city}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <Input
                            name="state"
                            label="State"
                            placeholder="State"
                            onChange={this.props.onChange}
                            value={this.props.user.state}
                            error={this.props.errors.state}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <Input
                            name="zip"
                            label="Zip"
                            placeholder="Zip"
                            onChange={this.props.onChange}
                            value={this.props.user.zip}
                            error={this.props.errors.zip}
                        />
                    </div>
                </div>

                <input
                    type="submit"
                    value="Save"
                    className="btn btn-primary btn-lg"
                    onClick={this.props.onSave}
                />
            </form>
        );
    }
});

module.exports = SignupForm;
