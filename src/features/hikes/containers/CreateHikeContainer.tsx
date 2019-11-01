import React, { FC, FormEvent, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import IHike from '../IHike';
import ITag from '../../tags/ITag';
import { newHike, createHike } from '../HikeService';
import { listTags } from '../../tags/TagService';
import { createHikeTag } from '../../hikeTags/HikeTagService';
import HikeForm from '../components/HikeForm';

export interface IHikeFormProps {
  afterCreateHike?: (hike: IHike) => void;
}

const CreateHike: FC<IHikeFormProps> = ({ afterCreateHike }) => {

  const [hike, setHike] = useState<IHike | undefined>(undefined);
  const [selectableTags, setSelectableTags] = useState<ITag[]|undefined>(undefined);
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  useEffect(() => {
    newHike().then(setHike);
  }, []);

  function handleCreateHike(event: FormEvent){
    event.preventDefault();
    createHike(hike as IHike).then((createdHike) => {
      Promise.all(selectedTags.map(tag => createHikeTag(createdHike.id as number, tag.id as number))).then(() => {
        newHike().then((_hike: IHike) => {
          setHike(_hike);
          setSelectedTags([]);
          if(afterCreateHike){
            afterCreateHike(createdHike);
          }
        });
      });
    });
  }

  function handleSearch(){
    listTags().then(setSelectableTags);
  }

  function handleAddHikeTag(tag: ITag){
    const newTags = selectedTags.slice();
    newTags.push(tag);
    setSelectedTags(newTags);
  }

  function handleRemoveHikeTag(tagToRemove: ITag){
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagToRemove.id));
  }

  function renderActionComponent(){
    return (
      <Button type="submit" fullWidth variant="contained" color="primary">
        <AddIcon />
        Create Hike
      </Button>
    )
  }

  return (
    <form onSubmit={handleCreateHike}>
      <Box p={1}>
        <Box pb={1}>
          <Typography variant="h4">Create Hike</Typography>
        </Box>
        {!!hike && <HikeForm
          hike={hike}
          onUpdateHike={setHike}
          selectableTags={selectableTags}
          onSearchTags={handleSearch}
          selectedTags={selectedTags}
          onAddTag={handleAddHikeTag}
          onRemoveTag={handleRemoveHikeTag}
          actionComponent={renderActionComponent()} />}
      </Box>
    </form>
  );
}

export default CreateHike;
