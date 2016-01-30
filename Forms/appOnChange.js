(function () {
    'use strict';

    /* Controlled Component, displays a text box with an initial value */
    /* When you type in the input box, the field can change.  The
     * handleChange function will be called, and we can display the initial Value
      * followed by the new character.  However, this will immediately trigger
      * a render event, and the input field will change to the initial value */
    var ControlledComponent = React.createClass({
        render: function () {
            return (
                <input type="text" value="Initial Value: "
                    onChange={this.handleChange} />
            );
        },
        handleChange: function (event) {
            console.log(event.target.value);
        }
    });

    /* Render it */
    ReactDOM.render((

            <ControlledComponent />

        ),
        document.getElementById("container")
    );
})();
