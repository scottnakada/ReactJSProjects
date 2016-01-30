(function () {
    'use strict';

    /* Allow the user to enter a value in two fields.  When the Add
    button is pressed, call the handleAdd function to add the values of
    the two fields, accessing them by reference.
     */
    var RefTestComponent = React.createClass({
        render: function () {
            return (
                <div>
                    <h1>Enter a value in the two fields, and hit add to see the sum</h1>
                    <input type="text" ref="inputField_1"/><br />
                    <input type="text" ref="inputField_2"/><br />
                    <input type="button" value="Add" onClick={this.handleAdd} />
                </div>
            );
        },
        componentDidMount: function () {
            this.refs.inputField_1.getDOMNode().value = "0";
            this.refs.inputField_2.getDOMNode().value = "0";
        },
        handleAdd: function (event) {
            alert(parseFloat(this.refs.inputField_1.getDOMNode().value) +
                  parseFloat(this.refs.inputField_2.getDOMNode().value));
        }
    });

    /* Render it */
    ReactDOM.render((

            <RefTestComponent />

        ),
        document.getElementById("container")
    );
})();
