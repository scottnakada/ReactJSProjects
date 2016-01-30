(function () {
    'use strict';

    var Quiz = React.createClass({
        propTypes: {
            books: React.PropTypes.array.isRequired
        },
        getInitialState: function () {
            return _.extend({
                bgClass: 'neutral',
                showContinue: false
            }, this.props.data.selectGame());
        },
        handleBookSelected: function (title) {
            var isCorrect = this.state.checkAnswer(title);
            this.setState({
                bgClass: isCorrect ? 'pass' : 'fail',
                showContinue: isCorrect
            })
        },
        handleContinue: function () {
            this.setState(this.getInitialState());
        },
        handleAddGame: function () {
            routie('add');
        },
        render: function () {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            <img src={this.state.author.imageUrl} className="authorimage col-md-3" alt=""/>
                        </div>
                        <div className="col-md-7">
                            {this.state.books.map(function (book) {
                                return <Book
                                    onBookSelected={this.handleBookSelected}
                                    title={book}/>
                            }, this)}
                        </div>
                        <div className={"col-md-1 " + this.state.bgClass}>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <br />
                            <input
                                id="addGameButton"
                                type="button"
                                value="Add Game"
                                className="btn btn-primary btn-lg pull-left"
                                onClick={this.handleAddGame}>
                            </input>
                            {this.state.showContinue ? (
                                <input
                                    onClick={this.handleContinue}
                                    type="submit"
                                    value="Continue"
                                    className="btn btn-success btn-lg pull-right">
                                </input>) : <span />
                            }
                        </div>
                    </div>
                </div>
            );
        }
    });

    /* The book component */
    var Book = React.createClass({
        propTypes: {
            title: React.PropTypes.string.isRequired
        },
        handleClick: function () {
            this.props.onBookSelected(this.props.title);
        },
        render: function () {
            return (
                <div className="bg-info title" onClick={this.handleClick}>
                    <h4>{this.props.title}</h4>
                </div>
            );
        }
    });

    var AddGameFormComponent = React.createClass({
        propTypes: {
            onGameFormSubmitted: React.PropTypes.func.isRequired
        },
        handleSubmit: function () {
            this.props.onGameFormSubmitted(getRefs(this));
            return false;
        },
        render: function () {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <h1>Add Game</h1>
                        <form role="form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input ref="imageUrl" type="text" className="form-control" placeholder="Image Url"/>
                            </div>
                            <div className="form-group">
                                <input ref="answer1" type="text" className="form-control" placeholder="Answer 1"/>
                            </div>
                            <div className="form-group">
                                <input ref="answer2" type="text" className="form-control" placeholder="Answer 2"/>
                            </div>
                            <div className="form-group">
                                <input ref="answer3" type="text" className="form-control" placeholder="Answer 3"/>
                            </div>
                            <div className="form-group">
                                <input ref="answer4" type="text" className="form-control" placeholder="Answer 4"/>
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div>
            );
        }
    });

    var data = [
        {
            name: 'Mark Twain',
            imageUrl: 'images/authors/marktwain.jpg',
            books: ['The Adventures of Huckleberry Finn']
        },
        {
            name: 'Joseph Conrad',
            imageUrl: 'images/authors/josephconrad.png',
            books: ['Heart of Darkness']
        },
        {
            name: 'J.K. Rowling',
            imageUrl: 'images/authors/jkrowling.jpg',
            imageSource: 'Wikimedia Commons',
            imageAttribution: 'Daniel Ogren',
            books: ['Harry Potter and the Sorcerers Stone']
        },
        {
            name: 'Stephen King',
            imageUrl: 'images/authors/stephenking.jpg',
            imageSource: 'Wikimedia Commons',
            imageAttribution: 'Pinguino',
            books: ['The Shining', 'IT']
        },
        {
            name: 'Charles Dickens',
            imageUrl: 'images/authors/charlesdickens.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['David Copperfield', 'A Tale of Two Cities']
        },
        {
            name: 'William Shakespeare',
            imageUrl: 'images/authors/williamshakespeare.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
        }
    ];

    var selectGame = function () {
        var books = _.shuffle(this.reduce(function (p, c, i) {
            return p.concat(c.books);
        }, [])).slice(0, 4);

        var answer = books[_.random(books.length - 1)];

        return {
            books: books,
            author: _.find(this, function (author) {
                return author.books.some(function (title) {
                    return title === answer;
                });
            }),

            checkAnswer: function (title) {
                return this.author.books.some(function (t) {
                    return t === title;
                });
            }
        }
    };

    data.selectGame = selectGame;

    routie({
        '': function () {
            ReactDOM.render(
                <Quiz data={data}/>,
                document.getElementById("app"));
        },
        'add': function () {
            ReactDOM.render(
                <AddGameFormComponent
                    onGameFormSubmitted={handleAddGameFormSubmitted}
                />,
                document.getElementById("app"));
        }
    });

    function handleAddGameFormSubmitted(data) {
        var quizData = [{
            imageUrl: data.imageUrl,
            books: [data.answer1, data.answer2, data.answer3, data.answer4]
        }];
        quizData.selectGame = selectGame;
        ReactDOM.render(
            <Quiz data={quizData}/>,
            document.getElementById("app"));
    };

    /* getRefs helper function */
    /* for each ref in the component, create a result object, with the refName, and the value
     equal to the .value part of the DOM Node.  Only works if all refs have a value.
     */
    function getRefs(component) {
        var result = {};
        Object.keys(component.refs).forEach(function (refName) {
            result[refName] = component.refs[refName].getDOMNode().value;
        });
        return result;
    }

})();
