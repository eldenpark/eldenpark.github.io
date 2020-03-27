import React from 'react';
import styled from 'styled-components';

import { useIsomorphicData } from '@@src/universal/contexts/IsomorphicDataContext';

const StyledFooter = styled.div({
  '& button, & a': {
    '&:hover': {
      borderBottom: 'none',
    },
    borderBottom: '1px solid #bdbdbd',
    display: 'inline',
  },
  '& span:not(:first-child)': {
    marginLeft: '0.4em',
  },
  color: '#bdbdbd',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 'auto',
  padding: '90px 0 1em 0',
});

const Top = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const Bottom = styled.div({
  '& a': {
    borderBottom: 'none',
  },
  fontSize: '1rem',
});

const Footer = () => {
  const {
    builtAt,
    contentData,
    latestCommitHash,
    repositoryUrl,
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
      <Top>
        <p>
          <span>{date.getFullYear()}</span>
          <span>{contentData.general?.name}</span>
        </p>
        <div>
          <button
            onClick={handleClickTop}
            type="button"
          >
            Top
          </button>
        </div>
      </Top>
      <Bottom>
        <p>
          <span>Updated at</span>
          <span>{`${date.getMonth() + 1}/${date.getFullYear()},`}</span>
          <span>
            <a href={repositoryUrl}>{`[^1] ${latestCommitHash}`}</a>
          </span>
        </p>
      </Bottom>
    </StyledFooter>
  );
};

export default Footer;
