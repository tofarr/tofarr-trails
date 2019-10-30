import React, { FC, Fragment } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Add';

import ITag from '../ITag';
import TagForm from './TagForm';

export interface ITagListProps{
  tags: ITag[];
  onUpdateTag: (tag:ITag) => void;
  onDeleteTag?: (tag:ITag) => void;
}


const TagList: FC<ITagListProps> = ({ tags, onUpdateTag, onDeleteTag }) => {
  return <Fragment>
      <Box p={1}>
        <Typography variant="h4">Tags</Typography>
      </Box>
      {tags.map(tag =>
        <Box key={tag.id} pl={1} pr={1} pb={4}>
          <Grid container spacing={2} alignItems="center">
            {!!tag && <Grid item xs={12} sm={12} md>
              <TagForm tag={tag} onUpdateTag={onUpdateTag} />
            </Grid>}
            {!!onDeleteTag && <Grid item>
              <Button color="secondary" variant="contained" onClick={() => onDeleteTag(tag)}>
                <DeleteIcon />
                Delete Tag
              </Button>
            </Grid>}
          </Grid>
        </Box>)}
      </Fragment>
}

export default TagList;
