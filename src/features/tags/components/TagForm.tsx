import React, { ChangeEvent, FC, useState } from 'react';
import { Box, Collapse, Grid, TextField } from '@material-ui/core';

import ColorPicker from '../../../components/ColorPicker';
import MoreToggle from '../../../components/MoreToggle';
import Timestamp from '../../../components/Timestamp';

import ITag from '../ITag';

export interface ITagFormProps {
  tag: ITag;
  onUpdateTag: (tag: ITag) => void;
}

const TagForm: FC<ITagFormProps> = ( { tag, onUpdateTag, children }) => {

  const [more,setMore] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md>
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={12} sm>
            <TextField
              fullWidth
              variant="filled"
              label="Title"
              value={tag.title}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onUpdateTag({...tag, title: event.target.value})} />
          </Grid>
          <Grid item>
            <ColorPicker
              value={tag.color}
              onChange={(color: string) =>
                onUpdateTag({...tag, color})} />
          </Grid>
          <Grid item>
            <MoreToggle more={more} setMore={setMore} />
          </Grid>
        </Grid>
        <Grid item>
          <Collapse in={more}>
            <Box pt={2}>
              {!!tag.id &&
                <Grid container>
                  <Grid item xs={12} sm>
                    <Timestamp label="Created At" value={tag.created_at} />
                  </Grid>
                  <Grid item xs={12} sm>
                    <Timestamp label="Updated At" value={tag.updated_at} />
                  </Grid>
                </Grid>
              }
              <TextField
                fullWidth
                multiline
                variant="filled"
                label="Description"
                value={tag.description}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onUpdateTag({...tag, description: event.target.value})} />
            </Box>
          </Collapse>
        </Grid>
      </Grid>
      {!!children &&
        <Grid item xs={12} sm="auto">
          {children}
        </Grid>
      }
    </Grid>
  );
}

export default TagForm;
