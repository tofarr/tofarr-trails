import React, { ChangeEvent, FC, ReactNode } from 'react';
import { Grid, TextField } from '@material-ui/core';
import IPoint from '../IPoint';

interface IProps{
  point: IPoint;
  onUpdatePoint: (Point:IPoint) => void;
  actionComponent?: (Point:IPoint) => ReactNode
}

const PointForm: FC<IProps> = ({ point, onUpdatePoint, actionComponent}) => (
  <Grid container>
    <Grid item xs={6} sm={4} md>
      <TextField
        fullWidth
        type="number"
        label="Latitude"
        value={point.latitude}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onUpdatePoint({...point, latitude: parseFloat(event.target.value)})} />
    </Grid>
    <Grid item xs={6} sm={4} md>
      <TextField
        fullWidth
        type="number"
        label="Longitude"
        value={point.longitude}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onUpdatePoint({...point, longitude: parseFloat(event.target.value)})} />
    </Grid>
    <Grid item xs={6} sm={4} md>
      <TextField
        fullWidth
        type="number"
        label="Altitude"
        value={point.altitude}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onUpdatePoint({...point, altitude: parseFloat(event.target.value)})} />
    </Grid>
    {!!actionComponent &&
      <Grid item xs={6} sm={4} md="auto">
        {actionComponent(point)}
      </Grid>
    }
  </Grid>
);

export default PointForm;
