import React, { Component } from "react";
import Slider from "./Slider";
import styled from "styled-components";
import copy from "../assets/copy.png";

const SliderContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ResultContainer = styled.div`
  height: 100%;
  width: 25%;
  color: #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

class RGBContainer extends Component {
  state = {
    values: {
      red: 255,
      green: 255,
      blue: 255
    },
    valuesHex: {
      red: "ff",
      green: "ff",
      blue: "ff"
    }
  };

  myCallback = dataFromChild => {
    let { values, valuesHex } = { ...this.state };
    if (dataFromChild[0].id === "r") {
      values.red = dataFromChild[0].value;
      valuesHex.red = dataFromChild[0].valueHex;
    } else if (dataFromChild[0].id === "g") {
      values.green = dataFromChild[0].value;
      valuesHex.green = dataFromChild[0].valueHex;
    } else if (dataFromChild[0].id === "b") {
      values.blue = dataFromChild[0].value;
      valuesHex.blue = dataFromChild[0].valueHex;
    }
    this.setState(state => ({
      values,
      valuesHex
    }));
  };

  sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  handleCopy = (e, hex) => {
    const parent = e.target.parentNode.classList;

    parent.toggle("clicked");
    this.sleep(1000).then(() => {
      parent.toggle("clicked");
    });
    const el = document.createElement("textarea");
    el.value = hex;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  render() {
    const { red, green, blue } = { ...this.state.values };
    const hex =
      "#" +
      this.state.valuesHex.red +
      this.state.valuesHex.green +
      this.state.valuesHex.blue;
    return (
      <>
        <div className="rgbcontainer">
          <SliderContainer>
            <Slider callbackFromParent={this.myCallback} id="r" />
            <Slider callbackFromParent={this.myCallback} id="g" />
            <Slider callbackFromParent={this.myCallback} id="b" />
          </SliderContainer>
          <ResultContainer values={this.state.values}>
            <div className="wrap">
              <p className="labeled">
                <span style={{ fontWeight: "bold" }}>RGB</span>
              </p>
              <p>{`rgb(${red}, ${green}, ${blue})`}</p>
            </div>
            <div className="wrap">
              <p className="labeled">
                <span style={{ fontWeight: "bold" }}>HEX</span>
              </p>
              <p>{hex}</p>
            </div>
            <div className="cc">
              <div
                className="color"
                style={{
                  backgroundColor: hex
                }}></div>
              <div className="copy" onClick={e => this.handleCopy(e, hex)}>
                <span>copied!</span>
                <img src={copy} alt="copy to clipboard" />
              </div>
            </div>
          </ResultContainer>
        </div>
      </>
    );
  }
}

export default RGBContainer;
