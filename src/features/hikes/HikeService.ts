import DbService from '../../services/DbService';

import IHike from './IHike';


DbService.version(1).stores({
  hikes: '++id, title'
})

function table(){
  return DbService.table<IHike>('hikes');
}

export function newInstance(): Promise<IHike>{
  return new Promise((resolve) => {
    resolve({
      title: 'New Hike'
    });
  });
}

export function create(hike: IHike) {
  return new Promise<IHike>((resolve,reject) => {
    table().add(hike).then((id) => {
      resolve({ ...hike, id });
    }, reject);
  });
}

export function read(id: number) {
  return table().get(id);
}

export function update(hike: IHike) {
  return table().update(hike.id, hike);
}

export function destroy(id: number) {
  return table().delete(id);
}

export function list() {
  return table().orderBy('title').toArray();
}
