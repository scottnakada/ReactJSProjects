(function () {
    'use strict';

    /* Setup a tick timer */
    var TimerComponent = React.createClass({
        propTypes: {
            onInterval: React.PropTypes.func.isRequired,
            interval: React.PropTypes.number.isRequired
        },
        render: function () {
            return <div style={{display: 'none'}}/>
        },
        componentDidMount: function () {
            setInterval(this.props.onInterval, this.props.interval);
        }
    });
    /* Initialize a global tick counter */
    var tickCtr = 0;

    /* Timer Interval function */
    function thingToDo() {
        tickCtr++;
        /* Just print tick to the console */
        console.log('tick ' + tickCtr);
    }

    /* Render it */
    /* Setup the TimerComponent with an Interval function thingToDo, and an interval of 1sec */
    ReactDOM.render((

            <TimerComponent onInterval={thingToDo} interval={1000}/>

        ),
        document.getElementById("container")
    );
})();
