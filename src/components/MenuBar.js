import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { KeyboardArrowLeft, KeyboardArrowRight } from 'styled-icons/material';

const MenuBar = props => {
  return (
    <MenuWrapper>
      <div className="section-change">
        <KeyboardArrowLeft
          size="24"
          id="left"
          onClick={props.handleSectionChange}
          style={{ cursor: 'pointer' }}
        />
        {props.section}
        <KeyboardArrowRight
          size="24"
          id="right"
          onClick={props.handleSectionChange}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  width: 100%;
  height: 40px;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  .section-change {
    display: flex;
    align-items: center;
  }
`;

MenuBar.propTypes = {
  handleSectionChange: PropTypes.func
};

export default MenuBar;
