import React, { FC, FormEvent, useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import useErr from '../../../hooks/useErr';
import useWorking from '../../../hooks/useWorking';
import Loader from '../../../components/Loader';

import ITag from '../ITag';
import TagForm from '../components/TagForm';
import { newInstance, create } from '../TagService';

export interface ITagFormProps {
  afterCreateTag?: (tag: ITag) => void;
}

const CreateTag: FC<ITagFormProps> = ({ afterCreateTag }) => {

  const [tag, setTag] = useState<ITag | undefined>(undefined);
  const { err } = useErr();
  const {working, incrementWorking, decrementWorking } = useWorking();

  useEffect(() => {
    incrementWorking();
    newInstance().then((tag: ITag) => {
      decrementWorking();
      setTag(tag);
    }, (e: any) => {
      decrementWorking()
      err(e);
    });
  }, [err, incrementWorking, decrementWorking]);

  function handleCreate(event: FormEvent){
    event.preventDefault();
    if(!tag){
      return;
    }
    incrementWorking();
    create(tag).then((tag: ITag) => {
      decrementWorking();
      incrementWorking();
      newInstance().then((tag: ITag) => {
        decrementWorking();
        setTag(tag);
        if(afterCreateTag){
          afterCreateTag(tag);
        }
      }, (e: any) => {
        decrementWorking()
        err(e);
      });
    }, (e: any) => {
      decrementWorking()
      err(e);
    });
  }

  return (
    <form onSubmit={handleCreate}>
      <Box p={1}>
        <Box pb={1}>
          <Typography variant="h4">Create Tag</Typography>
        </Box>
        <Grid container spacing={2} alignItems="center">
          {!!tag && <Grid item xs={12} sm={12} md>
            <TagForm tag={tag} onUpdateTag={setTag} />
          </Grid>}
          <Grid item>
            {working ? <Loader /> : <Button type="submit" color="primary" variant="contained">
              <AddIcon />
              Create Tag
            </Button>}
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default CreateTag;
