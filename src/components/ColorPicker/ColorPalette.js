import React from 'react';
import styled from 'styled-components';

const ColorPalette = props => {
  return (
    <Wrapper>
      <PaletteBox
        onClick={props.handleColorPick}
        style={{ background: props.palette[0] || 'grey' }}
      />
      <PaletteBox
        onClick={props.handleColorPick}
        style={{ background: props.palette[1] || 'grey' }}
      />
      <PaletteBox
        onClick={props.handleColorPick}
        style={{ background: props.palette[2] || 'grey' }}
      />
      <PaletteBox
        onClick={props.handleColorPick}
        style={{ background: props.palette[3] || 'grey' }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const PaletteBox = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid white;
  margin-right: 4px;
  background: grey;
`;

export default ColorPalette;
