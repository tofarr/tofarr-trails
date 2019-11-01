import React, { FC, FormEvent, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import IPoint from '../IPoint';
import { createPoint, newPoint } from '../PointService';
import PointForm from '../components/PointForm';

export interface IPointFormProps {
  hike_id: number;
  afterCreatePoint?: (point: IPoint) => void;
}

const CreateTag: FC<IPointFormProps> = ({ hike_id, afterCreatePoint }) => {

  const [point, setPoint] = useState<IPoint | undefined>(undefined);

  useEffect(() => {
    newPoint(hike_id).then(setPoint);
  }, [hike_id]);

  function handleCreate(event: FormEvent){
    event.preventDefault();
    if(!point){
      return;
    }
    createPoint(point).then((createdPoint:IPoint) => {
      newPoint(hike_id).then((point:IPoint) => {
        setPoint(point);
        if(afterCreatePoint){
          afterCreatePoint(createdPoint);
        }
      })
    });
  }

  return (
    <form onSubmit={handleCreate}>
      <Box pb={1}>
        <Typography variant="h4">Create Point</Typography>
      </Box>
      {!!point &&
        <PointForm
          point={point}
          onUpdatePoint={setPoint}
          actionComponent={
            (point:IPoint) => (
              <Button type="submit" color="primary" variant="contained">
                <AddIcon />
                Create Point
              </Button>
            )
          } />
      }
    </form>
  );
}

export default CreateTag;
