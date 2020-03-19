import React from 'react';
import styled from 'styled-components';
import {
  Route,
  Switch,
} from 'react-router-dom';

import IntroHeader from '@@src/universal/components/app/IntroHeader/IntroHeader';
import BioView from '@@src/universal/components/views/BioView/BioView';
import Footer from '@@src/universal/components/app/Footer/Footer';
import Menu from '@@src/universal/components/views/ViewMount/Menu';
import MusicView from '@@src/universal/components/views/MusicView/MusicView';
import ProjectView from '@@src/universal/components/views/ProjectView/ProjectView';

const StyledViewMount = styled.div({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  padding: '15 9',
});

const Inner = styled.div({
  maxWidth: 600,
  width: '100%',
});

const ViewWrapper = styled.div({
  marginTop: 24,
});

const ViewMount = () => {
  return (
    <StyledViewMount>
      <Inner>
        <IntroHeader />
        <Menu />
        <ViewWrapper>
          <Switch>
            <Route
              component={MusicView}
              path="/music.html"
            />
            <Route
              component={ProjectView}
              path="/projects.html"
            />
            <Route
              component={BioView}
              path="/"
            />
          </Switch>
        </ViewWrapper>
        <Footer />
      </Inner>
    </StyledViewMount>
  );
};

export default ViewMount;
