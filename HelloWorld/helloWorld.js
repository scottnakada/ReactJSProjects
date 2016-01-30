var HelloComponent = React.createClass({
    render: function () {
        return <div>
            <h1>Hola {this.props.name}!<br />
                The time is now: {this.props.now}</h1>
        </div>;
    }
});
ReactDOM.render(
    <HelloComponent name="Scott" now={new Date().toString()}/>,
    document.getElementById('container')
);