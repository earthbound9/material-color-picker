import React from 'react';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

import ColorType from '../ColorType';
import ColorCode from '../ColorCode';

const TailwindColors = props => {
  const {
    isDark,
    currentColor,
    colorValue,
    colorType,
    handleClipboard,
    handleColorType,
    handleColorPick
  } = props;
  return (
    <Wrapper bgColor={currentColor} isDark={isDark}>
      {props.colors.map((color, index) => (
        <Container key={index}>
          <ColorHeading
            style={{
              background: color.base,
              color: tinycolor(color.base).isDark() ? 'white' : '#333'
            }}
          >
            <h5>{color.name}</h5>
            <div>Base {color.base}</div>
          </ColorHeading>
          <ColorRanges>
            {color.colorScales.map(colorScale => (
              <ColorRange
                key={colorScale.id}
                color={colorScale.value}
                colorIsDark={tinycolor(colorScale.value).isDark()}
                onClick={handleColorPick}
                data-color={colorScale.value}
              >
                <p onClick={handleColorPick} data-color={colorScale.value}>
                  {colorScale.scale}
                </p>
              </ColorRange>
            ))}
          </ColorRanges>
        </Container>
      ))}
      <ColorTypeWrapper style={{ background: currentColor }}>
        <ColorType
          bgColor={currentColor}
          isDark={isDark}
          onChange={handleColorType}
          colorValue={colorValue}
          colorType={colorType}
          handleClipboard={handleClipboard}
        >
          <ColorCode
            handleClipboard={handleClipboard}
            colorValue={colorValue}
            colorType={colorType}
            isDark={isDark}
          />
        </ColorType>
      </ColorTypeWrapper>
    </Wrapper>
  );
};

export default TailwindColors;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.bgColor};
  height: calc(100vh - 40px);
  color: ${props => (props.isDark ? 'white' : '#333')};
`;

const Container = styled.div`
  width: 90%;
  margin-top: 5px;
  border-radius: 2px;
  overflow: hidden;
`;

const ColorHeading = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 20px;

  h5 {
    font-size: 15px;
    font-weight: 400;
  }
`;

const ColorRanges = styled.div`
  display: flex;
`;

const ColorRange = styled.div.attrs({
  style: props => ({
    background: props.color,
    color: props.colorIsDark ? 'white' : '#333'
  })
})`
  width: 100%;
  height: 30px;
  display: flex;
  cursor: pointer;

  &:hover {
    border-radius: 7px;
  }

  p {
    margin: auto;
  }
`;

const ColorTypeWrapper = styled.div`
  padding-left: 0px;
`;
