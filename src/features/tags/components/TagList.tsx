import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import ListCollapse from '../../../components/ListCollapse';

import ITag from '../ITag';
import TagForm from './TagForm';

export interface ITagListProps{
  tags: ITag[]|undefined;
  onUpdateTag: (tag:ITag) => void;
  onDeleteTag: (tag:ITag) => void;
}


const TagList: FC<ITagListProps> = ({ tags, onUpdateTag, onDeleteTag }) => {

  function renderTag(tag:ITag){
    return (
      <TagForm
        tag={tag}
        onUpdateTag={onUpdateTag}
        actionComponent={
          <Button color="secondary" variant="contained" onClick={() => onDeleteTag(tag)}>
            <DeleteIcon />
            Delete Tag
          </Button>
        } />
    );
  }

  return tags ? <ListCollapse items={tags} component={renderTag} /> : null;
}

export default TagList;
