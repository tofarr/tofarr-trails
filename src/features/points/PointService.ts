import DbService from '../../services/DbService';
import { monitor } from '../../services/TaskService';

import IPoint from './IPoint';

DbService.version(1).stores({
  points: '++id,hike_id'
});

function table(){
  return DbService.table<IPoint>('points');
}

export function newPoint(hike_id:number): Promise<IPoint>{
  return new Promise((resolve) => {
    resolve({
      hike_id,
      latitude: 0,
      longitude: 0,
      altitude: undefined
    });
  });
}

export function createPoint(point: IPoint) {
  return monitor('CREATE_HIKE_POINT', new Promise<IPoint>((resolve, reject) => {
    const points = table();
    const hikes = DbService.table('hikes');
    DbService.transaction('rw', points, hikes, () => {
      point.created_at = point.updated_at = new Date().getTime();
      points.add(point).then((id) => {
        hikes.get(point.hike_id).then((hike) => {
          hike.updated_at = new Date().getTime();
          hikes.put(hike).then(() => {
            point.id = id;
            resolve(point);
          }, reject);
        }, reject);
      }, reject);
    });
  }));
}

export function destroyPoint(id: number) {
  return monitor('DESTROY_HIKE_POINT', new Promise((resolve, reject) => {
    const points = table();
    const hikes = DbService.table('hikes');
    DbService.transaction('rw', points, hikes, () => {
      points.get(id).then((point) => {
        points.delete(id).then(() => {
          hikes.get((point as IPoint).hike_id).then((hike) => {
            hike.updated_at = new Date().getTime();
            hikes.put(hike).then(() => {
              resolve();
            }, reject);
          }, reject);
        }, reject);
      }, reject);
    });
  }));
}

export function updatePoint(point:IPoint) {
  return monitor('DESTROY_HIKE_POINT', new Promise((resolve, reject) => {
    const points = table();
    const hikes = DbService.table('hikes');
    DbService.transaction('rw', points, hikes, () => {
      point.updated_at = new Date().getTime();
      points.update(point.id, point).then(() => {
        hikes.get(point.hike_id).then((hike) => {
          hike.updated_at = new Date().getTime();
          hikes.put(hike).then(() => {
            resolve(point);
          }, reject);
        }, reject);
      }, reject);
    });
  }));
}


export function listPoints(hike_id: number){
  return monitor('LIST_HIKE_POINTS', table().where({hike_id: hike_id}).toArray());
}
