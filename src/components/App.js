import React, { Component } from "react";
import RGBContainer from "./RGBContainer";
import HSLContainer from "./HSLContainer";
import CMYKContainer from "./CMYKContainer";

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <div className="color-vis">
          <RGBContainer />
        </div>
        <hr />
        <div className="color-vis">
          <HSLContainer />
        </div>
        <hr />
        <div className="color-vis">
          <CMYKContainer />
        </div>
      </>
    );
  }
}

export default App;
