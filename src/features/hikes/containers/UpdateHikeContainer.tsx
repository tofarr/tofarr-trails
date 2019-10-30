import React, { FC, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Add';

import IHike from '../IHike';
import { updateHike, destroyHike } from '../HikeService';
import HikeForm from '../components/HikeForm';
import IHikeTag from '../../hikeTags/IHikeTag';
import { listTags, readAllTags } from '../../tags/TagService';
import { createHikeTag, destroyHikeTag, listHikeTags } from '../../hikeTags/HikeTagService';
import ITag from '../../tags/ITag';

export interface IHikeContainerProps{
  hike: IHike;
  afterDestroy?: (hike:IHike) => void;
}

const UpdateHikeContainer: FC<IHikeContainerProps> = (props) => {

  const hikeId = props.hike.id as number;
  const [hike, setHike] = useState<IHike>(props.hike);
  const [selectableTags,setSelectableTags] = useState<ITag[]|undefined>(undefined);
  const [selectedTags,setSelectedTags] = useState<ITag[]|undefined>(undefined);

  useEffect(() => {
    listHikeTags(hikeId).then((hikeTags: IHikeTag[]) => {
      readAllTags(hikeTags.map(hikeTag => hikeTag.tag_id)).then(setSelectedTags)
    });
  }, [hikeId]);

  function handleSearchTags(){
    listTags().then(setSelectableTags);
  }

  function handleUpdate(_hike: IHike){
    updateHike(_hike).then(setHike);
  }

  function handleDestroy(){
    destroyHike(hike.id as number).then(()=>{
      const { afterDestroy } = props;
      if(afterDestroy){
        afterDestroy(hike);
      }
    });
  }

  function handleAddTag(tag:ITag){
    createHikeTag(hike.id as number, tag.id as number).then(() => {
      let newTags = (selectedTags || []).slice();
      newTags.push(tag);
      setSelectedTags(newTags);
    });
  }

  function handleRemoveTag(tag: ITag){
    destroyHikeTag(hike.id as number, tag.id as number).then(() => {
      if(selectedTags){
        setSelectedTags(selectedTags.filter((selectedTag) => selectedTag.id !== tag.id));
      }
    });
  }

  return (
    <HikeForm
      hike={hike}
      onUpdateHike={handleUpdate}
      selectableTags={selectableTags}
      onSearchTags={handleSearchTags}
      selectedTags={selectedTags || []}
      onAddTag={handleAddTag}
      onRemoveTag={handleRemoveTag}>
      <Button fullWidth color="secondary" variant="contained" onClick={() => handleDestroy()}>
        <DeleteIcon />
        Delete Hike
      </Button>
    </HikeForm>
  );
}

export default UpdateHikeContainer;
