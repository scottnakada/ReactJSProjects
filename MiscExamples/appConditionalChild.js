(function () {
    'use strict';

    var HelloComponent = React.createClass({
        render: function () {
            return (
                <div>
                    {'Hello ' + this.props.name}
                </div>
            );
        }
    });

    var GoodByeComponent = React.createClass({
        render: function () {
            return (
                <p>
                    Goodbye
                </p>
            );
        }
    });

    ReactDOM.render(
        <div>
            {
                new Date().getMinutes() % 2 == 0
                    ? <HelloComponent name="Scott" />
                    : <GoodByeComponent />
            }
        </div>
        ,
        document.getElementById("container")
    );


})();
