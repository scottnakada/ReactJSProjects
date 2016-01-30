(function () {
    'use strict';

    /* Controlled Component, displays a text box with an initial value */
    /* Rendered props are immutable; only state can change */
    var ControlledComponent = React.createClass({
        render: function () {
            return (
                <input type="text" value="Initial Value"/>
            );
        }
    });

    /* Render it */
    ReactDOM.render((

            <ControlledComponent />

        ),
        document.getElementById("container")
    );
})();
