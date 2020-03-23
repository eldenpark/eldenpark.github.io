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
    borderBottom: '2px solid #fff',
    color: '#fff',
  },
  '& li:not(:first-child)': {
    marginLeft: 12,
  },
  display: 'flex',
  marginBottom: '1.0em',
});

const Link: React.FC<any> = ({
  children,
  exact,
  to,
}) => {
  const isActive = React.useCallback((match, location) => {
    let stemIsFound = false;
    if (to.endsWith('.html')) {
      const stem = to.substring(0, to.length - 5);
      stemIsFound = location.pathname.startsWith(stem);
    }
    return stemIsFound || !!match;
  }, [to]);

  return (
    <li>
      <NavLink
        exact={exact}
        isActive={isActive}
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
};

const Menu: React.FC = () => {
  const { views } = useContentData();
  const menuCompoennts = React.useMemo(() => {
    return views.items.map((item) => {
      return item.visibleOnMenu === 'true' && (
        <Link
          exact={!!item.exact && item.exact === 'true'}
          key={item.url}
          to={item.url}
        >
          {item.label}
        </Link>
      );
    });
  }, [views]);

  return (
    <StyledMenu>
      {menuCompoennts}
    </StyledMenu>
  );
};

export default Menu;
