(function () {
    'use strict';

    /* This accesses an uncontrolled text field by reference */
    /* After the component has loaded (componentDidMount), the field is
        in the DOM, and we can access the reference thru refs.inputField.
        Once we know what it is in the DOM, we access the .value field to
        set the initial value. */

    var RefTestComponent = React.createClass({
        render: function () {
            return (
                <input type="text" ref="inputField"
                       onChange={this.handleChange}/>
            );
        },
        componentDidMount: function () {
            this.refs.inputField.getDOMNode().value = "set by ref";
        },
        handleChange: function (event) {
            console.log(event.target.value);
        }
    });

    /* Render it */
    ReactDOM.render((

            <RefTestComponent />

        ),
        document.getElementById("container")
    );
})();
