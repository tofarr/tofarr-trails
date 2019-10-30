import DbService from '../../services/DbService';
import { randomColor } from '../../services/ColorService';

import ITag from './ITag';

DbService.version(1).stores({
  tags: '++id,&title'
})

function table(){
  return DbService.table<ITag>('tags');
}

export function newInstance(): Promise<ITag>{
  return new Promise((resolve) => {
    resolve({
      title: 'New Tag',
      description: '',
      color: randomColor(),
    });
  });
}

export function create(tag: ITag) {
  tag.created_at = tag.updated_at = new Date().getTime();
  return new Promise<ITag>((resolve,reject) => {
    table().add(tag).then((id) => {
      resolve({ ...tag, id });
    }, reject);
  });
}

export function read(id: number) {
  return table().get(id);
}

export function readAll(ids: number[]){
  return new Promise<ITag[]>((resolve, reject) => {
    const tags: ITag[] = []
    let toResolve = ids.length;

    if(!toResolve){
      resolve(tags);
      return;
    }

    ids.forEach((id, index) => {
      read(id).then((tag) => {
        tags[index] = tag as ITag;
        if(!--toResolve){
          resolve(tags);
        }
      }, (e: any) => {
        toResolve++;
        reject(e);
      })
    })

  })

}

export function update(tag: ITag) {
  tag.updated_at = new Date().getTime();
  return table().update(tag.id, tag);
}

export function destroy(id: number) {
  return table().delete(id);
}

export function list() {
  return table().orderBy('title').toArray();
}
