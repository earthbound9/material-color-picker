import React from 'react'
import styled from 'styled-components'

const ColorRanges = () => {
  return (
    <RangesContainer>
      <div />
      <div className='ranges'>
        <div className='range'>50</div>
        <div className='range'>100</div>
        <div className='range'>200</div>
        <div className='range'>300</div>
        <div className='range'>400</div>
        <div className='range'>500</div>
        <div className='range'>600</div>
        <div className='range'>700</div>
        <div className='range'>800</div>
        <div className='range'>900</div>
        <div className='range'>A 100</div>
        <div className='range'>A 200</div>
        <div className='range'>A 400</div>
        <div className='range'>A 700</div>
      </div>
    </RangesContainer>
  )
}

const RangesContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  margin-bottom: 2px;

  .range {
    width: 25px;
    margin: 0;
    font-size: 0.7rem;
    font-weight: 500;
    text-align: center;
  }

  .ranges {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`

export default ColorRanges
