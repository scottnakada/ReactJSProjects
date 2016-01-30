(function () {
    'use strict';

    /* First component, just displays 1st Component */
    var FirstComponent = React.createClass({
        render: function () {
            return (
                <p>
                    1st Component
                </p>
            );
        }
    });

    /* Second component, just displays 2nd Component */
    var SecondComponent = React.createClass({
        render: function () {
            return (
                <p>
                    2nd Component
                </p>
            );
        }
    });

    /* Appender - displays all of its children, className draws a box around everything using css */
    var AppenderComponent = React.createClass({
        render: function () {
            return (
                <div className="appender">
                    {this.props.children}
                </div>
            );
        }
    });

    /* Render the appender component, with multiple first and second components */
    /* You can add or delete children here, and the appender will handle it */
    ReactDOM.render((
        <div>
            <AppenderComponent>
                <FirstComponent />
                <SecondComponent />
                <FirstComponent />
                <SecondComponent />
            </AppenderComponent>
        </div>
    ),
        document.getElementById("container")
    );


})();
