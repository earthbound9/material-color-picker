import React, { Component } from 'react';
import { remote } from 'electron';
import tinycolor from 'tinycolor2';

import MenuBar from './components/MenuBar';
import MaterialPicker from './components/MaterialPicker/index';
import ColorType from './components/ColorType';
import ColorCode from './components/ColorCode';
import ColorPicker from './components/ColorPicker/index';
import matData from './material-colors.json';
import IbmColors from './components/IBMColors/';

const clipboard = remote.clipboard;

class App extends Component {
  state = {
    matColors: [],
    currentColor: 'rgb(144, 164, 174)',
    colorType: 'hexValue',
    colorValue: '#90a4ae',
    sections: ['IBM Colors', 'Material Colors', 'Color Picker'],
    currentSection: 'IBM Colors',
    sectionPosition: 0
  };

  componentDidMount() {
    this.setState({
      matColors: matData.colors
    });
  }

  handleColorType = e => {
    const type = e.target.id;
    const color = this.state.currentColor;
    this.setState({ colorType: type });

    if (type === 'hexValue') {
      this.setState({ colorValue: tinycolor(color).toHexString() });
    } else if (type === 'rgbValue') {
      this.setState({ colorValue: tinycolor(color).toRgbString() });
    } else if (type === 'hslValue') {
      this.setState({ colorValue: tinycolor(color).toHslString() });
    }
  };

  handleColorPick = e => {
    const hexColor = e.target.dataset.color;
    const type = this.state.colorType;

    this.setState({
      currentColor: hexColor
    });

    if (type === 'hexValue') {
      this.setState({ colorValue: hexColor });
    } else if (type === 'rgbValue') {
      this.setState({ colorValue: tinycolor(hexColor).toRgbString() });
    } else if (type === 'hslValue') {
      this.setState({ colorValue: tinycolor(hexColor).toHslString() });
    }
  };

  handleClipboard = e => {
    const colorCp = e.target.innerText;
    clipboard.writeText(colorCp);
  };

  handleSectionChange = e => {
    e.persist();
    const sectionClick = e.target.parentElement.id;
    const sectionNum = this.state.sectionPosition;
    let section;

    sectionClick.length > 1
      ? (section = e.target.parentElement.id)
      : (section = e.target.id);

    if (section === 'left' && sectionNum > 0) {
      this.setState({
        currentSection: this.state.sections[sectionNum - 1],
        sectionPosition: this.state.sectionPosition - 1
      });
    } else if (section === 'right' && sectionNum < 2) {
      this.setState({
        currentSection: this.state.sections[sectionNum + 1],
        sectionPosition: this.state.sectionPosition + 1
      });
    }
  };

  render() {
    const {
      currentColor,
      matColors,
      colorValue,
      colorType,
      currentSection
    } = this.state;
    const sortedColors = matColors.sort((a, b) => a.order - b.order);
    const isDark = tinycolor(currentColor).isDark();

    return (
      <div>
        <MenuBar
          handleSectionChange={this.handleSectionChange}
          section={this.state.currentSection}
        />
        {currentSection === 'Material Colors' && (
          <MaterialPicker
            className="section"
            colorList={sortedColors}
            currentColor={currentColor}
            colorPick={this.handleColorPick}
            isDark={isDark}
          />
        )}

        {currentSection === 'Color Picker' && (
          <ColorPicker
            handleColorType={this.handleColorType}
            handleClipboard={this.handleClipboard}
            colorTypeGlobal={colorType}
          />
        )}

        {currentSection === 'Material Colors' && (
          <ColorType
            bgColor={currentColor}
            isDark={isDark}
            onChange={this.handleColorType}
            colorValue={colorValue}
            colorType={colorType}
            handleClipboard={this.handleClipboard}
          >
            <ColorCode
              handleClipboard={this.handleClipboard}
              colorValue={colorValue}
              colorType={colorType}
              isDark={isDark}
            />
          </ColorType>
        )}
        {currentSection === 'IBM Colors' && <IbmColors />}
      </div>
    );
  }
}

export default App;
