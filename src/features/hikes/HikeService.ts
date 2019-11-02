import DbService from '../../services/DbService';
import { monitor } from '../../services/TaskService';

import IHike from './IHike';


DbService.version(1).stores({
  hikes: '++id, title'
})

function table(){
  return DbService.table<IHike>('hikes');
}

export function newHike(): Promise<IHike>{
  return new Promise((resolve) => {
    resolve({
      title: ''
    });
  });
}

export function createHike(hike: IHike) {
  return monitor('CREATE_HIKE', new Promise<IHike>((resolve,reject) => {
    hike.created_at = hike.updated_at = new Date().getTime();
    table().add(hike).then(id => resolve({ ...hike, id }), reject);
  }));
}

export function readHike(id: number) {
  return new Promise<IHike>((resolve, reject) => {
    table().get(id).then((hike) => {
      if(hike){
        resolve(hike);
      }else{
        reject('Unknown hike: '+hike);
      }
    }, reject);
  });
}

export function updateHike(hike: IHike) {
  return monitor('UPDATE_HIKE', new Promise<IHike>((resolve,reject) => {
    table().update(hike.id, hike).then(() => resolve(hike), reject);
  }));
}

export function destroyHike(id: number) {
  return monitor('DESTROY_HIKE', new Promise((resolve,reject) => {
    const hikes = table();
    const hikes_tags = DbService.table('hikes_tags');
    const points = DbService.table('points');
    DbService.transaction('rw', hikes, hikes_tags, points, () => {
      hikes.delete(id);
      hikes_tags.where({hike_id: id}).delete();
      points.where({hike_id: id}).delete();
    }).then(resolve).catch(reject);
  }));
}

export function listHikes() {
  return table().orderBy('title').toArray();
}
