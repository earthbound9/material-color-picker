import React, { Component } from 'react';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

import ColorWheel from './ColorWheel';
import ColorScale from './ColorScale';
import ColorPalette from './ColorPalette';
import Button from '../Button';
import ColorType from '../ColorType';
import ColorCode from '../ColorCode';

class ColorPicker extends Component {
  state = {
    color: 'hsl(240,100%,50%)',
    colorValue: '#0000FF',
    colorType: 'hexValue',
    ranges: [],
    palette: []
  };

  componentDidMount() {
    const color = this.state.color;
    const type = this.props.colorTypeGlobal;
    this.colorTypeFac(color, type);
  }

  colorTypeFac = (color, type = this.state.colorType) => {
    if (type === 'hexValue') {
      this.setState({ colorValue: tinycolor(color).toHexString() });
    } else if (type === 'rgbValue') {
      this.setState({ colorValue: tinycolor(color).toRgbString() });
    } else if (type === 'hslValue') {
      this.setState({ colorValue: tinycolor(color).toHslString() });
    }
  };

  colorFac = (type, color, num) => {
    if (type === 'dark') {
      return tinycolor(color)
        .darken(num)
        .toHslString();
    } else if (type === 'light') {
      return tinycolor(color)
        .lighten(num)
        .toHslString();
    }
  };

  handleColorChange = color => {
    const colorHsl = `hsl(${color.hsl[0]}, ${color.hsl[1]}%, ${color.hsl[2]}%)`;

    this.setState({
      color: colorHsl
    });

    this.colorTypeFac(colorHsl);
    this.handleColorScale();
  };

  handleColorScale = () => {
    const clr = tinycolor(this.state.color).toHslString();

    const ranges = [
      {
        base: clr,
        dark: this.colorFac('dark', clr, 10),
        darker: this.colorFac('dark', clr, 20),
        darkest: this.colorFac('dark', clr, 30),
        light: this.colorFac('light', clr, 10),
        lighter: this.colorFac('light', clr, 20),
        lightest: this.colorFac('light', clr, 30)
      }
    ];

    this.setState({
      ranges
    });
  };

  handleAddToPalette = e => {
    const clr = this.state.colorValue;

    this.setState({
      palette: this.state.palette.concat(clr)
    });
  };

  handleColorType = e => {
    const type = e.target.id;
    const color = this.state.color;
    this.setState({ colorType: type });

    this.colorTypeFac(color, type);
    this.props.handleColorType(e);
  };

  handleColorScalePick = e => {
    const clr = e.target.style.background;
    this.colorTypeFac(clr);
  };

  render() {
    const { color, colorValue, colorType, ranges, palette } = this.state;
    const { isDark, handleClipboard, colorTypeGlobal } = this.props;
    return (
      <Wrapper>
        <ColorBackdrop color={color} />
        <ColorWheelContainer>
          <ColorWheel handleColorChange={this.handleColorChange} />
          <ButtonSection>
            <Button text="Add To Palette" onClick={this.handleAddToPalette} />

            <ColorCode
              handleClipboard={handleClipboard}
              colorValue={colorValue}
              colorType={colorType}
              isDark={isDark}
              onClick={handleClipboard}
            />
            <ColorType
              onChange={this.handleColorType}
              colorValue={colorValue}
              colorType={colorTypeGlobal}
            />
          </ButtonSection>
        </ColorWheelContainer>

        <ColorScale
          ranges={ranges}
          handleColorScalePick={this.handleColorScalePick}
        />
        <ColorPalette
          handleColorPick={this.handleColorScalePick}
          palette={palette}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled('div')`
  width: 100vw;
  height: 93.8vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #cfd8dc;
`;
const ColorBackdrop = styled.div.attrs({
  style: props => ({
    backgroundColor: props.color
  })
})`
  width: 100vw;
  height: 200px;
  margin-bottom: 20px;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 210px;
`;

const ColorWheelContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export default ColorPicker;
