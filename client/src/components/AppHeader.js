import React from 'react';
import styled from 'styled-components';
import { device } from '../device.js';
import { Link } from 'react-router-dom';

const Navbar = styled.div`
  background: #39CCCC;
  display: inline-block;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  font-family: 'Open Sans', sans-serif;

  @media only screen and (max-width: 768px){
    .section-title {
      display: none;
    }
  }
`;

const BrandSection = styled.div`
  display: flex;
  align-self: start;
  width: 50%;
  font-size: 24px;
  color: white;
  margin-left: 10px;
`;

const LinkSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50%;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 18px;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const Header = () => (
  <Navbar>
    <BrandSection>WellTraveled</BrandSection>
    <LinkSection>
      <StyledLink to="/travel" className="link">Travel</StyledLink>
      <StyledLink to="/profile" className="link">Profile</StyledLink>
    </LinkSection>
  </Navbar>
);

export default Header;