import React, { FC, FormEvent, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import useErr from '../../../hooks/useErr';
import useWorking from '../../../hooks/useWorking';

import IHike from '../IHike';
import ITag from '../../tags/ITag';
import { newInstance, create } from '../HikeService';
import { list } from '../../tags/TagService';
import HikeForm from '../components/HikeForm';

export interface IHikeFormProps {
  afterCreateHike?: (hike: IHike) => void;
}

const CreateHike: FC<IHikeFormProps> = ({ afterCreateHike }) => {

  const [hike, setHike] = useState<IHike | undefined>(undefined);
  const [selectableTags, setSelectableTags] = useState<ITag[]|undefined>(undefined);
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const { err } = useErr();
  const { incrementWorking, decrementWorking } = useWorking();

  useEffect(() => {
    incrementWorking();
    newInstance().then((hike: IHike) => {
      decrementWorking();
      setHike(hike);
    }, (e: any) => {
      decrementWorking()
      err(e);
    });
  }, [err, incrementWorking, decrementWorking]);

  function handleCreateHike(event: FormEvent){
    event.preventDefault();
    incrementWorking();
    create(hike as IHike).then((newHike) => {
      setHike(newHike);
      if(afterCreateHike){
        afterCreateHike(newHike);
      }
    }, (e) => {
      decrementWorking()
      err(e);
    })
  }

  function handleSearch(){
    incrementWorking();
    list().then((tags: ITag[]) => {
      decrementWorking();
      setSelectableTags(tags);
    }, (e: any) => {
      decrementWorking()
      err(e);
    })
  }

  function handleAddHikeTag(tag: ITag){
    const newTags = selectedTags.slice();
    newTags.push(tag);
    setSelectedTags(newTags);
  }

  function handleRemoveHikeTag(tagToRemove: ITag){
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagToRemove.id));
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
          onRemoveTag={handleRemoveHikeTag}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            <AddIcon />
            Create Hike
          </Button>
        </HikeForm>}
      </Box>
    </form>
  );
}

export default CreateHike;
