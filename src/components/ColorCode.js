import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

class ColorCode extends Component {
  state = {
    clicked: false
  };

  handleClassChange = e => {
    this.props.handleClipboard(e);
    this.setState({ clicked: true });

    const delay = () => {
      setTimeout(() => {
        this.setState({ clicked: false });
      }, 800);
    };
    delay();
  };

  render() {
    const { colorType, colorValue, isDark } = this.props;
    return (
      <div>
        <ColorCodeButton
          className={this.state.clicked && 'clicked'}
          onClick={this.handleClassChange}
          data-color={colorValue}
          colorType={colorType}
          isDark={isDark}
        >
          {colorValue}
        </ColorCodeButton>
      </div>
    );
  }
}

const buttonClick = keyframes`
  0% {
    opacity: 0;
  } 90% {
    opacity: 1;
    transform: scale(200);
  } 100% {
    opacity: 0;
  }
`;

const ColorCodeButton = styled('button')`
  padding-left: 10px;
  cursor: pointer;
  border: none;
  position: relative;
  background-color: ${props => (props.isDark ? '#78909c' : '#cfd8dc')};
  border-radius: 3px;
  border-bottom: ${props =>
    props.isDark ? '1px solid #cfd8dc' : '1px solid #333'};
  text-transform: ${props =>
    props.colorType === 'hexValue' ? 'uppercase' : 'lowercase'};
  padding: 5px 10px;
  color: ${props => (props.isDark ? 'white' : '$333')};
  margin: 0 0 2px 10px;
  outline: none;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
  overflow: hidden;

  &:hover {
    background-color: #cfd8dc;
    color: ${props => (props.isDark ? '#333' : 'white')};
  }

  &::after {
    content: '';
    position: absolute;
    display: block;
    opacity: 0;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    width: 1px;
    height: 1px;
    background: rgba(0, 0, 0, 0.2);
  }
  &.clicked::after {
    animation: ${props =>
      props.colorType === 'hexValue'
        ? `${buttonClick} 0.8s`
        : `${buttonClick} 0.5s`};
  }
`;

ColorCode.propTypes = {
  colorType: PropTypes.string,
  colorValue: PropTypes.string,
  isDark: PropTypes.bool,
  handleClipboard: PropTypes.func
};

export default ColorCode;
