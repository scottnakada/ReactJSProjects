(function () {
    'use strict';

    var Count = React.createClass({
        getInitialState: function () {
            var state = {counter: 1};
            setInterval(function () {
                this.setState({counter: this.state.counter + 1});
            }.bind(this), 1000);
            return state;
        },
        render: function () {
            return (
                <div>
                    <h1>Counter</h1>

                    <CountDisplay counter={this.state.counter} />
                </div>
            );
        }
    });

    var CountDisplay = React.createClass({
        render: function() {
            return (
                <p>{this.props.counter}</p>
            );
        }
    });

    /* Render it */
    ReactDOM.render(
        <Count />,
        document.getElementById("container"
        ));
})();
