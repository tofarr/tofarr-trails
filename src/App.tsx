import React, { Fragment, useState} from 'react';
import { Button, Container, Paper } from '@material-ui/core';
import HikesContainer from './features/hikes/containers/HikesContainer';
import TagsContainer from './features/tags/containers/TagsContainer';
import MsgsContainer from './containers/MsgsContainer';
import Msgs from './components/Msgs';

const App: React.FC = () => {
  return (
    <Fragment>
      <Container>
        <HikesContainer />
        <TagsContainer />
        <MsgsContainer>
          {({msgs}) => <Msgs msgs={msgs} />}
        </MsgsContainer>
      </Container>
    </Fragment>
  );
}

export default App;
