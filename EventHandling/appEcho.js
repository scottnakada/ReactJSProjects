(function () {
    'use strict';

    /* Echo a text input box to the console */
    var EchoComponent = React.createClass({
        render: function () {
            return (
                <input type="text" onChange={this.handleChange}/>
            );
        },
        handleChange: function(event) {
            console.log(event.target.value);
        }
    });

    /* Render it */
    ReactDOM.render((

            <EchoComponent />

        ),
        document.getElementById("container")
    );
})();
