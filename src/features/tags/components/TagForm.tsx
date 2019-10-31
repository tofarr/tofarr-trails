import React, { ChangeEvent, FC } from 'react';
import { Grid, TextField } from '@material-ui/core';
import ColorPicker from '../../../components/ColorPicker';

import ITag from '../ITag';

export interface ITagFormProps {
  tag: ITag;
  onUpdateTag: (tag: ITag) => void;
}

const TagForm: FC<ITagFormProps> = ( { tag, onUpdateTag, children }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm>
        <TextField
          fullWidth
          variant="filled"
          label="Title"
          value={tag.title}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onUpdateTag({...tag, title: event.target.value})} />
      </Grid>
      <Grid item xs={12} sm="auto">
        <ColorPicker
          value={tag.color}
          onChange={(color: string) =>
            onUpdateTag({...tag, color})} />
      </Grid>
      {!!children &&
        <Grid item>
          {children}
        </Grid>
      }
    </Grid>
  );
}

export default TagForm;
