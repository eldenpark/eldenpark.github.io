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
  '& span:not(:first-child)': {
    marginLeft: '0.5em',
  },
  alignItems: 'flex-end',
  color: '#bdbdbd',
  display: 'flex',
  height: 180,
  justifyContent: 'space-between',
  marginTop: 'auto',
});

const Footer = () => {
  const {
    builtAt,
    contentData,
    latestCommitHash,
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
          <span>{`${date.getMonth() + 1}/${date.getFullYear()},`}</span>
          <span>{`[-1] ${latestCommitHash}`}</span>
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
