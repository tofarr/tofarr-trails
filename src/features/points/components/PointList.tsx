import React, { FC, Fragment} from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Add';

import ListCollapse from '../../../components/ListCollapse';

import IPoint from '../IPoint';
import PointForm from './PointForm';

interface IProps{
  points: IPoint[]|undefined;
  onUpdatePoint: (point:IPoint) => void;
  onDeletePoint: (point:IPoint) => void;
}

const PointList: FC<IProps> = ({ points, onUpdatePoint, onDeletePoint }) => {
  return points ?    
    <ListCollapse
      items={points}
      component={point =>
        <PointForm
          point={point}
          onUpdatePoint={onUpdatePoint}
          actionComponent={
            (point:IPoint) => (
              <Button color="secondary" variant="contained" onClick={() => onDeletePoint(point)}>
                <DeleteIcon />
                Delete Point
              </Button>
            )
          } />
      } /> : null;
};

export default PointList;
