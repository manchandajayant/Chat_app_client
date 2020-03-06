import React from "react";
import superagent from "superagent";

class App extends React.Component {
  onSubmit = async event => {
    event.preventDefault();
    try {
      const res = await superagent
        .post("http://localhost:4000/message")
        .send({ text: "Hardcoded" });

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <div>
        Hello!!This app is working
        <form onSubmit={this.onSubmit}>
          <input type="text" />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
