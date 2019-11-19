import React from "react";
import styled from "styled-components";

const Input = styled.input`
  margin: 0px;
  padding: 0px;
  -webkit-appearance: none;
  /* box-sizing: border-box; */
  width: 100%;
  min-width: 600px;
  height: 25px;
  /* border: 1px solid #ccc; */
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 255, 0, 1) 16.66%,
    rgba(0, 255, 0, 1) 33.33%,
    rgba(0, 255, 255, 1) 50%,
    rgba(0, 0, 255, 1) 66.66%,
    rgba(255, 0, 255, 1) 83.33%,
    rgba(255, 0, 0, 1) 101%
  );
  outline: none;
  -webkit-transition: 0.2s;
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 35px;
    border-radius: 3px;
    border: 2px solid #fff;
    background-color: white;
    cursor: pointer;
  }
  ::-moz-range-thumb {
    width: 15px;
    height: 35px;
    border-radius: 3px;
    border: 2px solid #fff;
    background-color: white;
    cursor: pointer;
  }
`;

const NumberInput = styled.input`
  width: 80px;
  height: 40px;
  padding: 2px 4px;
  margin-left: 50px;
`;

class SliderH extends React.Component {
  state = {
    value: 0
  };

  handleValueChange = e => {
    let value = e.target.value;
    value = value > 360 ? 360 : value;
    value = value < 0 ? 0 : value;
    this.setState(
      {
        value
      },
      () => this.someFn()
    );
  };

  someFn = () => {
    const listInfo = [{ id: this.props.id, value: this.state.value }];
    this.props.callbackFromParent(listInfo);
  };

  render() {
    return (
      <div className="slider-container">
        <Input
          type="range"
          min="0"
          max="360"
          value={this.state.value}
          id={this.props.id}
          onChange={this.handleValueChange}
          // step="1"
        />
        <NumberInput
          type="number"
          min="0"
          max="100"
          value={this.state.value}
          onChange={this.handleValueChange}
        />
      </div>
    );
  }
}

export default SliderH;
