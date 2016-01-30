(function () {
    'use strict';

    /* Uncontrolled Component - is not under control of React.  It can */
    /* change state outside of react, and controls rendering itself.  */
    /* The key difference between the uncontrolled and controlled component */
    /* Is that the uncontrolled component does not set an initial value */
    var UnControlledComponent = React.createClass({
        render: function () {
            return (
                <input type="text" size="50"
                       onChange={this.handleChange}
                       defaultValue="Initial Value for Uncontrolled Component"/>
            );
        },
        handleChange: function (event) {
            console.log(event.target.value);
        }
    });

    /* Render it */
    ReactDOM.render((

            <UnControlledComponent />

        ),
        document.getElementById("container")
    );
})();
