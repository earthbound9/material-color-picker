import React, { Component } from 'react';
import styled from 'styled-components';
import ColorType from '../ColorType';
import ColorCode from '../ColorCode';

class IbmColors extends Component {
  render() {
    const {
      colorValue,
      currentColor,
      colorType,
      isDark,
      handleColorType,
      handleClipboard
    } = this.props;
    return (
      <Wrapper
        isDark={isDark}
        style={{ background: currentColor, color: 'white' }}
      >
        {this.props.colors.map((color, index) => (
          <ColorGroup key={index}>
            <div className="name">
              <h4>{color.name.toUpperCase()}</h4>
            </div>
            <div className="box">
              {color.values.map((item, index) => (
                <ColorBox
                  key={index}
                  data-color={item.value}
                  onClick={this.props.handleColorPick}
                  style={{ backgroundColor: item.value }}
                />
              ))}
            </div>
          </ColorGroup>
        ))}
        <ColorSelector>
          <ColorType
            style={{ marginBottom: '5px' }}
            bgColor={currentColor}
            isDark={isDark}
            colorType={colorType}
            handleClipboard={handleClipboard}
            onChange={handleColorType}
            ibm
          />
          <ColorCode
            colorValue={colorValue}
            colorType={colorType}
            handleClipboard={handleClipboard}
            isDark={isDark}
          />
        </ColorSelector>
      </Wrapper>
    );
  }
}

export default IbmColors;

const Wrapper = styled.div`
  padding: 5px 10px;
  height: calc(100vh - 50px);
  position: relative;

  h4 {
    font-size: 10px;
    font-weight: 600;
    margin: 0;
    padding: 4px;
    color: ${props => (props.isDark ? 'white' : '#333')};
  }
`;

const ColorGroup = styled.div`
  display: grid;
  grid-template-columns: 120px auto;
  grid-gap: 2px;
  .name {
    grid-column: 1;
    margin-top: 4px;
  }
  .box {
    grid-column: 2;
    display: flex;
  }
`;

const ColorBox = styled.div`
  width: 40px;
  height: 25px;
  margin: 1px;
  cursor: pointer;

  &:hover {
    border-color: white;
  }
`;

const ColorSelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 80px;
`;
