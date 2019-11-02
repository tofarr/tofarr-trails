import React, { FC, FormEvent, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ITag from '../ITag';
import TagForm from '../components/TagForm';
import { newTag, createTag } from '../TagService';

export interface ITagFormProps {
  afterCreateTag?: (tag: ITag) => void;
}

const CreateTag: FC<ITagFormProps> = ({ afterCreateTag }) => {

  const [tag, setTag] = useState<ITag | undefined>(undefined);

  useEffect(() => {
    newTag().then(setTag);
  }, []);

  function handleCreate(event: FormEvent){
    event.preventDefault();
    if(!tag){
      return;
    }
    createTag(tag).then((createdTag: ITag) => {
      newTag().then((tag: ITag) => {
        setTag(tag);
        if(afterCreateTag){
          afterCreateTag(createdTag);
        }
      })
    });
  }

  return (
    <form onSubmit={handleCreate}>
      {!!tag &&
        <TagForm
          initialExpanded={true}
          tag={tag}
          onUpdateTag={setTag}
          actionComponent={
            <Button type="submit" color="primary" variant="contained">
              <AddIcon />
              Create Tag
            </Button>
          } />
      }
    </form>
  );
}

export default CreateTag;
