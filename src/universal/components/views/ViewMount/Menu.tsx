import {
  NavLink,
} from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { useContentData } from '@@src/universal/contexts/IsomorphicDataContext';

const StyledMenu = styled.ul({
  '& a': {
    '&:hover': {
      color: '#fff',
    },
    display: 'inline-block',
    paddingBottom: 4,
  },
  '& a.active': {
    borderBottom: '1px solid #fff',
    color: '#fff',
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
  const { menus } = useContentData();
  const menuCompoennts = React.useMemo(() => {
    return menus.items.map((menu) => {
      return (
        <Link
          exact={menu.exact && menu.exact === 'true'}
          to={menu.url}
        >
          {menu.label}
        </Link>
      )
    });
  }, [menus]);

  return (
    <StyledMenu>
      {menuCompoennts}
    </StyledMenu>
  );
};

export default Menu;
