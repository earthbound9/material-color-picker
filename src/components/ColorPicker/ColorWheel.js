import React, { Component } from 'react'
import styled from 'styled-components'
import ReinventedColorWheel from 'reinvented-color-wheel'
import PropTypes from 'prop-types'

class ColorWheel extends Component {
  state = {
    color: 'hsl(141,39%,30%)'
  }

  componentDidMount () {
    var colorWheel = new ReinventedColorWheel({
      // appendTo is the only required property. specify the parent element of the color wheel.
      appendTo: document.getElementById('my-color-picker-container'),

      // followings are optional properties and their default values.

      hsl: [0, 100, 50], // initial hsl value; if both hsl and hsv are specified, hsv is applied and hsl is ignored.
      wheelDiameter: 250,
      wheelThickness: 25,
      handleDiameter: 20,
      wheelReflectsSaturation: false,
      onChange: this.props.handleColorChange
    })

    // set color in HSV color space
    colorWheel.setHSV(240, 100, 100)
  }

  render () {
    return (
      <ColorBox onChange={this.handleColorChange}>
        <div id='my-color-picker-container' />
      </ColorBox>
    )
  }
}

const ColorBox = styled('div')`
  .reinvented-color-wheel,
  .reinvented-color-wheel--hue-wheel,
  .reinvented-color-wheel--hue-handle,
  .reinvented-color-wheel--sv-space,
  .reinvented-color-wheel--sv-handle {
    touch-action: manipulation;
    touch-action: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .reinvented-color-wheel {
    position: relative;
    display: inline-block;
    line-height: 0;
    border-radius: 50%;
  }

  .reinvented-color-wheel--hue-wheel {
    border-radius: 50%;
  }

  .reinvented-color-wheel--sv-space {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .reinvented-color-wheel--hue-handle,
  .reinvented-color-wheel--sv-handle {
    position: absolute;
    box-sizing: border-box;
    pointer-events: none;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 0 0 1px black inset;
  }
`

ColorWheel.propTypes = {
  handleColorChange: PropTypes.func
}

export default ColorWheel
