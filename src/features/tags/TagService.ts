import DbService from '../../services/DbService';
import { randomColor } from '../../services/ColorService';
import { monitor } from '../../services/TaskService';

import ITag from './ITag';

DbService.version(1).stores({
  tags: '++id,&title'
})

function table(){
  return DbService.table<ITag>('tags');
}

export function newTag(): Promise<ITag>{
  return new Promise((resolve) => {
    resolve({
      title: '',
      description: '',
      color: randomColor(),
    });
  });
}

export function createTag(tag: ITag) {
  tag.created_at = tag.updated_at = new Date().getTime();
  return new Promise<ITag>((resolve,reject) => {
    table().add(tag).then((id) => {
      resolve({ ...tag, id });
    }, reject);
  });
}

export function readTag(id: number) {
  return table().get(id);
}

export function readAllTags(ids: number[]){
  return new Promise<ITag[]>((resolve, reject) => {
    Promise.all(ids.map(id => readTag(id))).then((tags) => {
      resolve(tags as ITag[])
    }, reject);
  });
}

export function updateTag(tag: ITag) {
  tag.updated_at = new Date().getTime();
  return table().update(tag.id, tag);
}

export function destroyTag(id: number) {
  return monitor('DESTROY_HIKE', new Promise((resolve,reject) => {
    const tags = table();
    const hikes_tags = DbService.table('hikes_tags');
    DbService.transaction('rw', tags, hikes_tags, () => {
      tags.delete(id);
      hikes_tags.where({tag_id: id}).delete();
    }).then(resolve).catch(reject);
  }));
}

export function listTags() {
  return table().orderBy('title').toArray();
}
