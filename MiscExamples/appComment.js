(function () {
    'use strict';

    /* Define some posted data and comments */
    var post = {
        title: 'React v0.5',
        content: 'this release is the result of several months of hard work from members of the team and the community.',
        comments: ['Great work team!', 'Does not work on my machine.', 'What is this react?', 'Add a fourth comment!']
    };

    /* Post component */
    var Post = React.createClass({
        render: function () {
            return (
                <div>
                    <h1>{this.props.data.title}</h1>

                    <p>{this.props.data.content}</p>

                    <h2>Comments</h2>

                    {this.props.data.comments.map(function (comment) {
                        return <Comment content={comment}/>;
                    })}
                </div>
            );
        }
    });

    /* Comment component included inside of the Post component */
    var Comment = React.createClass({
        render: function () {
            return <div>{this.props.content}</div>;
        }
    });

    ReactDOM.render(
        <Post data={post}/>,
        document.getElementById("container")
    );
})();
