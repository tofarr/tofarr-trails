import React, { FC, Fragment, useEffect, useState } from 'react';
import { findIndex } from 'lodash';

import { addMsg } from '../../../services/MsgService';

import { destroyTag, listTags, updateTag } from '../TagService';
import ITag from '../ITag';
import CreateTagContainer from '../containers/CreateTagContainer';
import TagList from '../components/TagList';

const TagsContainer: FC = () => {

  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    listTags().then(setTags);
  }, []);

  function handleUpdateTag(tag: ITag){
    updateTag(tag).then(() => {
      const newTags = tags.slice();
      newTags[findIndex(tags, { id: tag.id })] = tag;
      setTags(newTags);
    });
  }

  function handleDeleteTag(tag: ITag){
    destroyTag(tag.id as number).then(() => {
      const newTags = tags.slice();
      newTags.splice(findIndex(tags, { id: tag.id }), 1);
      setTags(newTags);
      addMsg('Tag Deleted');
    });
  }

  function handleAfterCreateTag(){
    listTags().then(setTags);
    addMsg('Tag Created');
  }

  return <Fragment>
    <CreateTagContainer afterCreateTag={handleAfterCreateTag} />
    <TagList tags={tags} onUpdateTag={handleUpdateTag} onDeleteTag={handleDeleteTag} />
  </Fragment>
}

export default TagsContainer;
