import React from 'react';
import styled from 'styled-components';

import { useContentData } from '@@src/universal/contexts/IsomorphicDataContext';
import Group from '@@src/universal/components/app/Group/Group';

const StyledBioView = styled.div({
});

const Message = styled.p({
  fontSize: '0.9em',
  marginBottom: 26,
});

const BioView: React.FC = () => {
  const {
    activities,
    awards,
    education,
    employment,
    interests,
    projectsAbbrev,
    talks,
  } = useContentData()!;

  return (
    <StyledBioView>
      <Message>
        *If you'd like to see my professional resume, please contact me.
      </Message>
      <Group group={interests} />
      <Group group={education} />
      <Group group={employment} />
      <Group group={projectsAbbrev} />
      <Group group={activities} />
      <Group group={awards} />
      <Group group={talks} />
    </StyledBioView>
  );
};

export default BioView;
