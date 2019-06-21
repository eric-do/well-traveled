import React from 'react';
import styled from 'styled-components';
import { device } from '../device.js';
import { Link } from 'react-router-dom';

const Navbar = styled.div`
  background: #39CCCC;
  display: inline-block;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: 'Open Sans', sans-serif;

  @media only screen and (max-width: 768px){
    .section-title {
      display: none;
    }
  }

  @media only screen and ${device.tablet} {
    .fa-bars {
      display: none;
    }
  }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    margin-left: 5px;
    margin-right: 5px;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const Header = () => (
  <Navbar>
    <StyledLink to="/travel" className="link">Travel</StyledLink>
    <StyledLink to="/profile" className="link">Profile</StyledLink>
    <i className="fas fa-bars"></i>
  </Navbar>
);

export default Header;