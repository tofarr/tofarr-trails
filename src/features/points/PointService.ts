import DbService from '../../services/DbService';

import IPoint from './IPoint';

DbService.version(1).stores({
  points: '++id,hike_id'
})

function table(){
  return DbService.table<IPoint>('points');
}

export function create(point: IPoint) {
  return new Promise<IPoint>((resolve,reject) => {
    table().add(point).then((id) => {
      resolve({ ...point, id });
    }, reject);
  });
}

export function list(hike_id: number) {
  return table().where({hike_id: hike_id}).sortBy('id');
}

export function clear(hike_id: number){
  return table().where({hike_id: hike_id}).delete();
}
