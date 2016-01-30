(function () {
    'use strict';

    /* By default, React escapes all special characters to prevent bad scripts from sneaking in */
    /* This Component uses the default method, and will display <strong>HELLO<strong> */
    var SafeComponent = React.createClass({
        render: function () {
            return (
                <p>
                    {this.props.dangerous}
                </p>

            );
        }
    });

    /* This method turns off React's escaping of special characters, and allows the special */
    /* characters to be interpreted; so this function displays HELLO in strong/bold characters */
    var DangerousComponent = React.createClass({
        render: function () {
            return (
                <p dangerouslySetInnerHTML={{__html:this.props.dangerous}}>
                </p>
            );
        }
    });

    /* Render it */
    ReactDOM.render((

            //<SafeComponent dangerous="<strong>HELLO</strong>"/>

            <DangerousComponent dangerous="<strong>HELLO</strong>"/>

        ),
        document.getElementById("container")
    );
})();
