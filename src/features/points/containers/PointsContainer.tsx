import React, { FC, Fragment, useEffect, useState } from 'react';
import { destroyPoint, listPoints, updatePoint } from '../PointService';

import { addMsg } from '../../../services/MsgService';

import IPoint from '../IPoint';
import PointList from '../components/PointList';
import CreatePointContainer from './CreatePointContainer';

interface IProps{
  hike_id: number;
  afterUpdated?: (hike_id:number) => void;
}

const PointsContainer: FC<IProps> = ({ hike_id, afterUpdated }) => {

  const [points, setPoints] = useState<IPoint[]|undefined>(undefined);

  useEffect(() => {
    listPoints(hike_id).then(setPoints);
  }, [hike_id]);

  function handleUpdate(point:IPoint){
    updatePoint(point).then(() => {
      setPoints((points || []).map(p => p.id === point.id ? point : p));
      handleUpdated();
    });
  }

  function handleDelete(point:IPoint){
    destroyPoint(point.id as number).then(() => {
      setPoints((points || []).filter((p => p.id !== point.id)));
      addMsg('Point Deleted');
      handleUpdated();
    });
  }

  function handleAfterCreatePoint(){
    listPoints(hike_id).then(setPoints);
    addMsg('Point Created');
    handleUpdated();
  }

  function handleUpdated(){
    if(afterUpdated){
      afterUpdated(hike_id)
    }
  }

  return (
    <Fragment>
      <PointList
        points={points}
        onUpdatePoint={handleUpdate}
        onDeletePoint={handleDelete} />
      <CreatePointContainer
        hike_id={hike_id}
        afterCreatePoint={handleAfterCreatePoint} />
    </Fragment>
  );
}

export default PointsContainer;
