import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class ColorScale extends Component {
  render() {
    const { ranges } = this.props;
    return (
      <Wrapper>
        {ranges[0] ? (
          ranges.map((range, key) => {
            return (
              <ScaleBoxContainer key={key}>
                <ScaleBox
                  onClick={this.props.handleColorScalePick}
                  style={{ background: range.lightest }}
                />
                <ScaleBox
                  onClick={this.props.handleColorScalePick}
                  style={{ background: range.lighter }}
                />
                <ScaleBox
                  onClick={this.props.handleColorScalePick}
                  style={{ background: range.light }}
                />
                <ScaleBox
                  onClick={this.props.handleColorScalePick}
                  style={{ background: range.base }}
                />
                <ScaleBox
                  onClick={this.props.handleColorScalePick}
                  style={{ background: range.dark }}
                />
                <ScaleBox
                  onClick={this.props.handleColorScalePick}
                  style={{ background: range.darker }}
                />
                <ScaleBox
                  onClick={this.props.handleColorScalePick}
                  style={{ background: range.darkest }}
                />
              </ScaleBoxContainer>
            );
          })
        ) : (
          <ScaleBoxContainer>
            <ScaleBox style={{ background: 'grey' }} />
            <ScaleBox style={{ background: 'grey' }} />
            <ScaleBox style={{ background: 'grey' }} />
            <ScaleBox style={{ background: 'grey' }} />
            <ScaleBox style={{ background: 'grey' }} />
            <ScaleBox style={{ background: 'grey' }} />
            <ScaleBox style={{ background: 'grey' }} />
          </ScaleBoxContainer>
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100vw;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScaleBoxContainer = styled.div`
  display: flex;
`;

const ScaleBox = styled.div`
  width: 60px;
  height: 30px;
  border: 1px solid white;
  cursor: pointer;
`;

ColorScale.propTypes = {
  ranges: PropTypes.array,
  handleColorScale: PropTypes.func
};

export default ColorScale;
