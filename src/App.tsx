import React, { Fragment } from 'react';
import { Container, Paper } from '@material-ui/core';
import HikesContainer from './features/hikes/containers/HikesContainer';
import TagsContainer from './features/tags/containers/TagsContainer';

const App: React.FC = () => {
  return (
    <Fragment>
      <Container>
        <HikesContainer />
        <TagsContainer />
      </Container>
    </Fragment>
  );
}

export default App;
