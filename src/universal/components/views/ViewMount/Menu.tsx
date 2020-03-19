import React from 'react';
import styled from 'styled-components';

import {
  NavLink,
} from 'react-router-dom';

const StyledMenu = styled.ul({
  '& a': {
    '&:hover': {
      color: '#fff',
    },
    display: 'inline-block',
    paddingBottom: 4,
  },
  '& a.active': {
    borderBottom: '1px solid white',
  },
  '& li:not(:first-child)': {
    marginLeft: 12,
  },
  display: 'flex',
  marginTop: 30,
});

const Link: React.FC<any> = ({
  children,
  exact,
  to,
}) => {
  return (
    <li>
      <NavLink
        exact={exact}
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
};

const Menu = () => {
  return (
    <StyledMenu>
      <Link exact to="/">
        About
      </Link>
      <Link to="/projects.html">
        Projects
      </Link>
      <Link to="/music.html">
        Music
      </Link>
    </StyledMenu>
  );
};

export default Menu;
