(function () {
    'use strict';

    /* Inner component, included in the Outer component */
    var Inner = React.createClass({
        render: function() {
            return <h3>Inner</h3>;
        }
    });

    /* Outer Component contains the Inner component */
    var Outer = React.createClass({
        render: function() {
            return <div>
                    <h2>Outer</h2>
                    <Inner />
                </div>
        }
    });

    /* Render it */
    ReactDOM.render(<Outer />, document.body);
})();
