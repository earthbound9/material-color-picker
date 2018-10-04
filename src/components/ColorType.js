import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ColorType = props => {
  const { bgColor, isDark, colorType } = props;
  return (
    <FormWrapper bgColor={bgColor} isDark={isDark}>
      <form onChange={props.onChange}>
        <input
          type="radio"
          name="colorValue"
          id="hexValue"
          defaultChecked={colorType === 'hexValue' && true}
        />
        <label htmlFor="hexValue">HEX</label>

        <input
          type="radio"
          name="colorValue"
          id="rgbValue"
          defaultChecked={colorType === 'rgbValue' && true}
        />
        <label htmlFor="rgbValue">RGB</label>

        <input
          type="radio"
          name="colorValue"
          id="hslValue"
          defaultChecked={colorType === 'hslValue' && true}
        />
        <label htmlFor="hslValue">HSL</label>
      </form>

      {props.children}
    </FormWrapper>
  );
};

const FormWrapper = styled('div')`
  background-color: ${props => props.bgColor};
  color: ${props => (props.isDark ? 'white' : '#333')};
  display: flex;
  height: 60px;
  align-items: center;
  padding: ${props => (props.padding ? '0 0 0 55px' : '0')};

  form {
    display: flex;
    align-items: center;
  }

  input {
    appearance: none;
    display: inline-block;
    position: relative;
    height: 20px;
    width: 20px;
    border: 0;
    border-radius: 50px;
    cursor: pointer;
    margin: 0 5px;
    outline: none;
    background-color: #607d8b;

    &:checked::before {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 10px;
      height: 10px;
      border-radius: 50px;
      background-color: #1de9b6;
    }
  }
`;

ColorType.propTypes = {
  bgColor: PropTypes.string,
  isDark: PropTypes.bool,
  handleColorType: PropTypes.func,
  colorValue: PropTypes.string,
  colorType: PropTypes.string,
  handleClipboard: PropTypes.func,
  checked: PropTypes.any
};

export default ColorType;
