import React from "react";
import superagent from "superagent";

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
  render() {
    return (
      <div>
        Hello!!This app is working
        <form onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onChange} value={this.state.text} />
          <button>Send</button>
          <button onClick={this.reset}>Reset</button>
        </form>
      </div>
    );
  }
}

export default App;
