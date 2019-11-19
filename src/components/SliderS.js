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
  background: ${({ color }) =>
    `linear-gradient(90deg, rgba(128,128,128,1) 0%, ${color} 100%)`};
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

class SliderS extends React.Component {
  state = {
    value: 100,
    color: this.props.color
  };

  handleValueChange = e => {
    let value = e.target.value;
    value = value > 100 ? 100 : value;
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
    // console.log(this.state.color);
    return (
      <div className="slider-container">
        <Input
          type="range"
          min="0"
          max="100"
          value={this.state.value}
          id={this.props.id}
          onChange={this.handleValueChange}
          step="0.2"
          color={this.props.color}
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

export default SliderS;
