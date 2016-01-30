(function () {
    'use strict';

    /* The Property Validation Test component */
    var PropValidTest = React.createClass({
        propTypes: {
            now: React.PropTypes.string.isRequired,
            someNum: function(props, propName, componentName) {
                if (props[propName] < 5) {
                    throw new Error (propName +
                        " must be 5 or greater.  " +
                        "It is currently: " + props[propName]);
                }

            }
        },
        render: function () {
            return (
                <div>
                    <h1>
                        Hello at {this.props.now}<br />
                        {this.props.someNum}
                    </h1>
                </div>
            );
        }
    });

    ReactDOM.render(
        <PropValidTest now={new Date().toString()} someNum={4}/>,
        document.getElementById("container"));
})();
