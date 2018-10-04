import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

class Button extends Component {
  state = {
    clicked: false
  };

  handleClassChange = e => {
    this.setState({ clicked: true });

    const delay = () => {
      setTimeout(() => {
        this.setState({ clicked: false });
      }, 1000);
    };
    delay();
  };
  render() {
    return (
      <div>
        <ButtonStyled
          className={this.state.clicked && 'clicked'}
          onClick={this.props.onClick}
        >
          {this.props.text}
        </ButtonStyled>
      </div>
    );
  }
}

const buttonClick = keyframes`
  0% {
    opacity: 0;
  } 90% {
    opacity: 1;
    transform: scale(110);
  } 100% {
    opacity: 0;
  }
`;

const ButtonStyled = styled.button`
  padding-left: 10px;
  cursor: pointer;
  border: none;
  position: relative;
  background-color: #b0bec5;
  border-radius: 3px;
  border-bottom: 2px solid #455a64;
  padding: 5px 10px;
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
    background: rgba(0, 0, 0, 0.4);
  }

  &.clicked::after {
    animation: ${buttonClick} 0.6s;
  }
`;
Button.propTypes = {
  text: PropTypes.string
};
export default Button;
