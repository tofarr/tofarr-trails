import React, { FC, Fragment, useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';

import { addMsg } from '../../../services/MsgService';
import ListCollapse from '../../../components/ListCollapse';

import { listHikes } from '../HikeService';
import IHike from '../IHike';
import CreateHikeContainer from './CreateHikeContainer';
import UpdateHikeContainer from './UpdateHikeContainer';

const HikesContainer: FC = () => {

  const [hikes, setHikes] = useState<IHike[]|undefined>(undefined);

  useEffect(() => {
    listHikes().then(setHikes);
  }, []);

  function handleAfterCreateHike(hike: IHike){
    const newHikes = (hikes || []).slice();
    newHikes.splice(0, 0, hike);
    setHikes(newHikes);
    addMsg('Hike Created');
  }

  function handleAfterDestroyHike(deletedHike: IHike){
    setHikes((hikes || []).filter(hike => hike.id !== deletedHike.id));
    addMsg('Hike Deleted');
  }

  function renderHike(hike:IHike){
    return (
      <Box pb={4}>
        <UpdateHikeContainer hike={hike} afterDestroy={handleAfterDestroyHike} />
      </Box>
    );
  }

  return (
    <Fragment>
      <Box pt={1} pb={1}>
        <Typography variant="h4">Hikes</Typography>
      </Box>
      <CreateHikeContainer afterCreateHike={handleAfterCreateHike} />
      {!!hikes && <ListCollapse items={hikes} component={renderHike} />}
    </Fragment>
  );
}

export default HikesContainer;
