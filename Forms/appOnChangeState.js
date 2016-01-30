(function () {
    'use strict';

    /* Controlled Component, displays a text box with an initial value */
    /* The initial value of the text box is set in the getInitialState function */
    /* When rendering this, we render the current state of the textValue */
    /* On a change, we read the current value in the text box, and set that to the state */
    var TextBoxComponent = React.createClass({
        getInitialState: function() {
            return { textValue: "Initial Value"};
        },
        render: function () {
            return (
                <input type="text" value={this.state.textValue}
                    onChange={this.handleChange} />
            );
        },
        handleChange: function (event) {
            this.setState({textValue: event.target.value});
        }
    });

    /* Render it */
    ReactDOM.render((

            <TextBoxComponent />

        ),
        document.getElementById("container")
    );
})();
