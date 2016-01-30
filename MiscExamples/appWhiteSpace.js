(function () {
    'use strict';

    /* Babel handles whitespace a little different than JSX */
    /* In JSX, the first line would have no space between Bob and Alice; but in Babel there is a space */
    /* In JSX, the 2nd, 3rd, and 4th lines would have multiple spaces; but in Babel there is one space */
    /* In the 5th example, we are able to increase the number of spaces in Babel */
    ReactDOM.render((
        <div>
            {"Bob"} {"Alice"}<br />
            {"Bob"} {"   " + "Alice"}<br />
            {"Bob"} {"   "} {"Alice"}<br />
            {"Bob"} {"   Alice"}<br />
            {"Bob"}&nbsp;&nbsp;{"Alice"}
        </div>
    ),
        document.getElementById("container")
    );


})();
