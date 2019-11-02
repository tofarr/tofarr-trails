import React, { FC, Fragment, useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';

import { addMsg } from '../../../services/MsgService';

import { destroyTag, listTags, updateTag } from '../TagService';
import ITag from '../ITag';
import CreateTagContainer from '../containers/CreateTagContainer';
import TagList from '../components/TagList';

const TagsContainer: FC = () => {

  const [tags, setTags] = useState<ITag[]|undefined>(undefined);

  useEffect(() => {
    listTags().then(setTags);
  }, []);

  function handleUpdateTag(tag: ITag){
    updateTag(tag).then(() => {
      setTags((tags || []).map((t => t.id === tag.id ? tag : t)));
    });
  }

  function handleDeleteTag(tag: ITag){
    destroyTag(tag.id as number).then(() => {
      setTags((tags || []).filter((t => t.id !== tag.id)));
      addMsg('Tag Deleted');
    });
  }

  function handleAfterCreateTag(){
    listTags().then(setTags);
    addMsg('Tag Created');
  }

  return <Box>
    <Box pb={1} pt={1}>
      <Typography variant="h4">Tags</Typography>
    </Box>
    <CreateTagContainer afterCreateTag={handleAfterCreateTag} />
    <TagList tags={tags} onUpdateTag={handleUpdateTag} onDeleteTag={handleDeleteTag} />
  </Box>
}

export default TagsContainer;
