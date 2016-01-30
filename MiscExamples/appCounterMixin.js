(function () {
    'use strict';

    var Highlight = {
        componentDidUpdate: function () {
            var node = $(React.findDOMNode(this));
            node.slideUp("slow", "linear");
            node.slideDown("slow", "linear");
        }
    };

    var Count = React.createClass({
        getInitialState: function () {
            var state = {counter: 1};
            setInterval(function () {
                this.setState({counter: this.state.counter + 1});
            }.bind(this), 4000);
            return state;
        },
        mixins: [Highlight],
        render: function () {
            return (
                <div>
                    <h1>Counter with Mixin</h1>

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
