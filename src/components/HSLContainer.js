import React, { Component } from "react";
import SliderH from "./SliderH";
import SliderS from "./SliderS";
import SliderL from "./SliderL";
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

class HSLContainer extends Component {
  state = {
    values: {
      hue: 0,
      saturation: 100,
      lightness: 50
    }
  };

  myCallback = dataFromChild => {
    let values = { ...this.state.values };
    if (dataFromChild[0].id === "h") values.hue = dataFromChild[0].value;
    else if (dataFromChild[0].id === "s")
      values.saturation = dataFromChild[0].value;
    else if (dataFromChild[0].id === "l")
      values.lightness = dataFromChild[0].value;
    this.setState(state => ({
      values: values
    }));
  };

  HSLToHex = (h, s, l) => {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h <= 360) {
      r = c;
      g = 0;
      b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length === 1) r = "0" + r;
    if (g.length === 1) g = "0" + g;
    if (b.length === 1) b = "0" + b;

    return "#" + r + g + b;
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

  HSLToRGB = (h, s, l) => {
    // Must be fractions of 1
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h <= 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return ["rgba(" + r + "," + g + "," + b + ", 1)", `rgb(${r}, ${g}, ${b})`];
  };

  render() {
    const { hue, saturation, lightness } = { ...this.state.values };
    const hex = this.HSLToHex(hue, saturation, lightness);
    // console.log(this.HSLToRGB(360, 100, 50));
    const rgbString = this.HSLToRGB(hue, saturation, lightness)[1];
    rgbString.substring();
    return (
      <>
        <div className="rgbcontainer">
          <SliderContainer>
            <SliderH callbackFromParent={this.myCallback} id="h" />
            <SliderS
              color={this.HSLToRGB(this.state.values.hue, 100, 50)[0]}
              callbackFromParent={this.myCallback}
              id="s"
            />
            <SliderL
              color={this.HSLToRGB(this.state.values.hue, 100, 50)[0]}
              callbackFromParent={this.myCallback}
              id="l"
            />
          </SliderContainer>
          <ResultContainer values={this.state.values}>
            <div className="wrap">
              <p className="labeled">
                <span style={{ fontWeight: "bold" }}>HSL</span>
              </p>
              <p>{`hsl(${hue}, ${saturation}%, ${lightness}%)`}</p>
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
              <div className="color" style={{ backgroundColor: hex }}></div>
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

export default HSLContainer;
