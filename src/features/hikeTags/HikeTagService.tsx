import DbService from '../../services/DbService';
import { monitor } from '../../services/TaskService';

import IHikeTag from './IHikeTag';

DbService.version(1).stores({
  hikes_tags: '++id,hike_id,&[hike_id+tag_id]'
})

function table(){
  return DbService.table<IHikeTag>('hikes_tags');
}

export function createHikeTag(hike_id: number, tag_id: number) {
  return monitor('CREATE_HIKE_TAG', new Promise((resolve, reject) => {
    const hikes_tags = table();
    const hikes = DbService.table('hikes');
    DbService.transaction('rw', hikes_tags, hikes, () => {
      let hikeTag: IHikeTag = {hike_id: hike_id, tag_id: tag_id};
      hikes_tags.add(hikeTag).then((id) => {
        hikes.get(hike_id).then((hike) => {
          hike.updated_at = new Date().getTime();
          hikes.put(hike).then(() => {
            hikeTag.id = id;
            resolve(hikeTag);
          }, reject);
        }, reject);
      }, reject);
    });
  }));
}

export function destroyHikeTag(hike_id: number, tag_id: number) {
  return monitor('DESTROY_HIKE_TAG', new Promise((resolve, reject) => {
    const hikes_tags = table();
    const hikes = DbService.table('hikes');
    DbService.transaction('rw', hikes_tags, hikes, () => {
      table().where({hike_id: hike_id, tag_id: tag_id}).delete().then(() => {
        hikes.get(hike_id).then((hike) => {
          hike.updated_at = new Date().getTime();
          hikes.put(hike).then(() => {
            resolve();
          }, reject);
        }, reject);
      }, reject);
    });
  }));
}

export function listHikeTags(hike_id: number){
  return monitor('LIST_HIKE_TAGS', table().where({hike_id: hike_id}).toArray());
}
