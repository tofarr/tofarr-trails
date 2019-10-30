import React, { FC, Fragment, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';

import useErr from '../../../hooks/useErr';
import useWorking from '../../../hooks/useWorking';

import { list } from '../HikeService';
import IHike from '../IHike';
import CreateHikeContainer from './CreateHikeContainer';
import UpdateHikeContainer from './UpdateHikeContainer';

const HikesContainer: FC = () => {

  const [hikes, setHikes] = useState<IHike[]>([]);
  const { err } = useErr();
  const { incrementWorking, decrementWorking } = useWorking();

  useEffect(() => {
    incrementWorking();
    list().then((hikes: IHike[]) => {
      decrementWorking();
      setHikes(hikes);
    }, (e: any) => {
      decrementWorking();
      err(e);
    });
  }, [err, decrementWorking, incrementWorking]);

  function handleAfterCreateHike(hike: IHike){
    const newHikes = hikes.slice();
    newHikes.splice(0, 0, hike);
    setHikes(newHikes);
  }

  function handleAfterDestroyHike(deletedHike: IHike){
    setHikes(hikes.filter(hike => hike.id !== deletedHike.id));
  }

  return (
    <Fragment>
      <CreateHikeContainer afterCreateHike={handleAfterCreateHike} />
      <Box pl={1} pr={1} pb={4}>
        {hikes.map(hike => <UpdateHikeContainer key={hike.id} hike={hike} afterDestroy={handleAfterDestroyHike} />)}
      </Box>
    </Fragment>
  );
}

export default HikesContainer;
