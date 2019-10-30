import React, { FC, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Add';

import useErr from '../../../hooks/useErr';
import useWorking from '../../../hooks/useWorking';

import IHike from '../IHike';
import { update, destroy } from '../HikeService';
import HikeForm from '../components/HikeForm';
import IHikeTag from '../../hikeTags/IHikeTag';
import { list as listTags, readAll as readAllTags } from '../../tags/TagService';
import { create as createHikeTag, destroy as destroyHikeTag, list as listHikeTags } from '../../hikeTags/HikeTagService';
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
  const { err } = useErr();
  const {incrementWorking, decrementWorking } = useWorking();

  useEffect(() => {
    incrementWorking();
    listHikeTags(hikeId).then((hikeTags: IHikeTag[]) => {
      readAllTags(hikeTags.map(hikeTag => hikeTag.tag_id)).then((tags) => {
        decrementWorking();
        setSelectedTags(tags);
      }, (e: any) => {
        decrementWorking();
        err(e);
      });
    }, (e: any) => {
      decrementWorking();
      err(e);
    });
  }, [err, decrementWorking, incrementWorking, hikeId]);

  function handleSearchTags(){
    incrementWorking();
    listTags().then((tags) => {
        decrementWorking();
        setSelectableTags(tags);
    }, (e) => {
      decrementWorking()
      err(e);
    })
  }

  function handleUpdate(_hike: IHike){
    incrementWorking();
    update(_hike).then((id) => {
      decrementWorking();
      setHike({..._hike,id});
    }, (e) => {
      decrementWorking()
      err(e);
    })
  }

  function handleDestroy(){
    incrementWorking();
    destroy(hike.id as number).then(()=>{
      decrementWorking();
      const { afterDestroy } = props;
      if(afterDestroy){
        afterDestroy(hike);
      }
    }, (e) => {
      decrementWorking()
      err(e);
    });
  }

  function handleAddTag(tag:ITag){
    incrementWorking();
    createHikeTag(hike.id as number, tag.id as number).then(() => {
      decrementWorking();
      let newTags = (selectedTags || []).slice();
      newTags.push(tag);
      setSelectedTags(newTags);
    }, (e: any) => {
      decrementWorking()
      err(e);
    });
  }

  function handleRemoveTag(tag: ITag){
    incrementWorking();
    destroyHikeTag(hike.id as number, tag.id as number).then(() => {
      decrementWorking();
      if(selectedTags){
        setSelectedTags(selectedTags.filter((selectedTag) => selectedTag.id !== tag.id));
      }
    }, (e: any) => {
      decrementWorking()
      err(e);
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
