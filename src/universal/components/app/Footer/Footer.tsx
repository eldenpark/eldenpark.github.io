import React from 'react';
import styled from 'styled-components';

import { useIsomorphicData } from '@@src/universal/contexts/IsomorphicDataContext';

const StyledFooter = styled.div({
  '& button': {
    '&:hover': {
      borderBottom: 'none',
    },
    borderBottom: '1px solid #bdbdbd',
  },
  '& span:last-child': {
    marginLeft: '0.5em',
  },
  color: '#bdbdbd',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 100,
  padding: '18px 0',
});

const Footer = () => {
  const {
    builtAt,
    contentData,
  } = useIsomorphicData()!;

  const date = React.useMemo(() => {
    return new Date(builtAt);
  }, [builtAt]);

  const handleClickTop = React.useCallback(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <StyledFooter>
      <div>
        <p>
          <span>{date.getFullYear()}</span>
          <span>{contentData.general?.name}</span>
        </p>
        <p>
          <span>Last updated at</span>
          <span>{`${date.getMonth() + 1}/${date.getFullYear()}`}</span>
        </p>
      </div>
      <div>
        <button
          onClick={handleClickTop}
          type="button"
        >
          Top
        </button>
      </div>
    </StyledFooter>
  );
};

export default Footer;
