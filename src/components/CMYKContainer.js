import React, { Component } from "react";
import SliderCMYK from "./SliderCMYK";
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

class CMYKContainer extends Component {
  state = {
    values: {
      cyan: 100,
      magenta: 100,
      yellow: 100,
      black: 100
    }
  };

  myCallback = dataFromChild => {
    let { values } = { ...this.state };
    if (dataFromChild[0].id === "c") {
      values.cyan = dataFromChild[0].value;
    } else if (dataFromChild[0].id === "m") {
      values.magenta = dataFromChild[0].value;
    } else if (dataFromChild[0].id === "y") {
      values.yellow = dataFromChild[0].value;
    } else if (dataFromChild[0].id === "k") {
      values.black = dataFromChild[0].value;
    }
    this.setState(state => ({
      values
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

  CMYKtoRGB = (c, m, y, k) => {
    c = c / 100;
    m = m / 100;
    y = y / 100;
    k = k / 100;
    const r = (255 * (1 - c) * (1 - k)).toFixed(0);
    const g = (255 * (1 - m) * (1 - k)).toFixed(0);
    const b = (255 * (1 - y) * (1 - k)).toFixed(0);
    return [r, g, b];
  };

  render() {
    const { cyan, magenta, yellow, black } = { ...this.state.values };
    const rgb = this.CMYKtoRGB(cyan, magenta, yellow, black);
    const rgbString = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    const hexr = (rgb[0] & 0xff).toString(16);
    const hexg = (rgb[1] & 0xff).toString(16);
    const hexb = (rgb[2] & 0xff).toString(16);
    const hex =
      "#" +
      (hexr.length === 2 ? hexr : "0" + hexr) +
      (hexg.length === 2 ? hexg : "0" + hexg) +
      (hexb.length === 2 ? hexb : "0" + hexb);
    return (
      <>
        <div className="rgbcontainer">
          <SliderContainer>
            <SliderCMYK callbackFromParent={this.myCallback} id="c" />
            <SliderCMYK callbackFromParent={this.myCallback} id="m" />
            <SliderCMYK callbackFromParent={this.myCallback} id="y" />
            <SliderCMYK callbackFromParent={this.myCallback} id="k" />
          </SliderContainer>
          <ResultContainer values={this.state.values}>
            <div className="wrap">
              <p className="labeled">
                <span style={{ fontWeight: "bold" }}>CMYK</span>
              </p>
              <p>{`cmyk(${cyan}%, ${magenta}%, ${yellow}%, ${black}%)`}</p>
            </div>
            <div className="wrap">
              <p className="labeled">
                <span style={{ fontWeight: "bold" }}>RGB</span>
              </p>
              <p>{rgbString}</p>
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

export default CMYKContainer;
