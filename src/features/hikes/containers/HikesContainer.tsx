import React, { FC, Fragment, useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';

import { addMsg } from '../../../services/MsgService';

import { listHikes } from '../HikeService';
import IHike from '../IHike';
import CreateHikeContainer from './CreateHikeContainer';
import UpdateHikeContainer from './UpdateHikeContainer';

const HikesContainer: FC = () => {

  const [hikes, setHikes] = useState<IHike[]>([]);

  useEffect(() => {
    listHikes().then(setHikes);
  }, []);

  function handleAfterCreateHike(hike: IHike){
    const newHikes = hikes.slice();
    newHikes.splice(0, 0, hike);
    setHikes(newHikes);
    addMsg('Hike Created');
  }

  function handleAfterDestroyHike(deletedHike: IHike){
    setHikes(hikes.filter(hike => hike.id !== deletedHike.id));
    addMsg('Hike Deleted');
  }

  return (
    <Fragment>
      <CreateHikeContainer afterCreateHike={handleAfterCreateHike} />
      <Box p={1}>
        <Typography variant="h4">Hikes</Typography>
      </Box>
      <Box pl={1} pr={1} pb={4}>
        {hikes.map(hike => <UpdateHikeContainer key={hike.id} hike={hike} afterDestroy={handleAfterDestroyHike} />)}
      </Box>
    </Fragment>
  );
}

export default HikesContainer;
