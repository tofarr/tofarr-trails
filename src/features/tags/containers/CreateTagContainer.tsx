import React, { FC, FormEvent, useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
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
    createTag(tag).then((tag: ITag) => {
      newTag().then((tag: ITag) => {
        setTag(tag);
        if(afterCreateTag){
          afterCreateTag(tag);
        }
      })
    });
  }

  return (
    <form onSubmit={handleCreate}>
      <Box p={1}>
        <Box pb={1}>
          <Typography variant="h4">Create Tag</Typography>
        </Box>
        {!!tag &&
          <TagForm tag={tag} onUpdateTag={setTag}>
            {!!tag &&
              <Button type="submit" color="primary" variant="contained">
                <AddIcon />
                Create Tag
              </Button>
            }
          </TagForm>
        }
      </Box>
    </form>
  );
}

export default CreateTag;
