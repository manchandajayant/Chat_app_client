import React from "react";
import superagent from "superagent";
import { connect } from "react-redux";

class App extends React.Component {
  state = {
    text: ""
  };

  onSubmit = async event => {
    event.preventDefault();

    try {
      const res = await superagent
        .post("http://localhost:4000/message")
        .send({ text: this.state.text });

      console.log(res);
      this.setState({
        text: ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  onChange = event => {
    console.log("text input made", event.target.value);
    this.setState({
      text: event.target.value
    });
  };

  reset = () => {
    this.setState({
      text: ""
    });
  };

  stream = new EventSource("http://localhost:4000/stream");
  //eventsource is built in js, sends a request to the stream

  componentDidMount = () => {
    //event mounts the data in console, when the data arrives over the stream, run the function and pass this is an argument.
    this.stream.onmessage = event => {
      //event.data is a json string
      //we need a real js object to use the data
      //to convert, us JSON.parse
      console.log("event.data test", event.data);
      const parse = JSON.parse(event.data);

      this.props.dispatch(parse);
      console.log(
        "props to be dispatched to the  store",
        this.props.dispatch(parse)
      );
      console.log("parsed data", parse);
    };
  };
  render() {
    const message = this.props.messages.map(msg => <div>{msg}</div>);
    return (
      <div>
        Hello!!This app is working
        <form onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onChange} value={this.state.text} />
          <button>Send</button>
          <button type="button" onClick={this.reset}>
            Reset
          </button>
        </form>
        <div>{message}</div>
      </div>
    );
  }
}
//connect is a thunk, it is a function that return another function
// Below is one way of writing it
function mapStateToProps(reduxState) {
  return {
    messages: reduxState.messages
  };
}
// const connector = connect(mapStateToProps);
// const connected = connector(App);
export default connect(mapStateToProps)(App);
