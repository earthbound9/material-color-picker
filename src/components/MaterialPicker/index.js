import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ColorRanges from './ColorRanges';

const MaterialPicker = props => {
  return (
    <Container isDark={props.isDark} currentColor={props.currentColor}>
      <div className="box">
        <ColorRanges />

        {props.colorList.map((color, key) => {
          const sortedShades = color.shades.sort((a, b) => a.range - b.range);
          return (
            <ColorRow key={key} dark={props.isDark}>
              <div className="name-box">
                <h5>{color.name}</h5>
              </div>
              <ColorWrapper>
                {sortedShades.map((shade, key) => (
                  <ColorBox
                    key={key}
                    onClick={props.colorPick}
                    className="col"
                    data-color={shade.value}
                    hex={shade.value}
                  />
                ))}
              </ColorWrapper>
            </ColorRow>
          );
        })}
      </div>
    </Container>
  );
};

const Container = styled.div.attrs({
  style: props => ({
    backgroundColor: props.currentColor,
    color: props.isDark ? 'white' : 'black'
  })
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 83vh;
  padding-top: 10px;

  .box {
    display: flex;
    flex-direction: column;
  }
`;

const ColorRow = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  justify-content: start;
  width: min-content;

  h5 {
    font-size: 0.8rem;
    font-weight: 500;
    margin: 0;
    padding: 0 0 5px 5px;
    align-self: flex-end;
  }

  .name-box {
    border-bottom: ${props =>
      props.dark ? '0.5px solid #eeeeee' : '0.5px solid #333'};
    display: flex;
  }
`;

const ColorWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ColorBox = styled.div.attrs({
  style: props => ({ backgroundColor: props.hex })
})`
  width: 25px;
  height: 25px;
  margin: 1px;
  cursor: pointer;

  &:hover {
    border-radius: 8px;
  }
`;
MaterialPicker.propTypes = {
  colorPick: PropTypes.func,
  isDark: PropTypes.bool,
  currentColor: PropTypes.string,
  colorList: PropTypes.array
};

export default MaterialPicker;
