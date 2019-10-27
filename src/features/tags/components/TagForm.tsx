import React, { ChangeEvent, FC } from 'react';
import { Grid, TextField } from '@material-ui/core';
import ColorPicker from '../../../components/ColorPicker';

import ITag from '../ITag';

export interface ITagFormProps {
  tag: ITag;
  onUpdateTag: (tag: ITag) => void;
}

const TagForm: FC<ITagFormProps> = ( { tag, onUpdateTag }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>
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
    </Grid>
  );
}

export default TagForm;
