import React, { FC, Fragment, useEffect, useState } from 'react';
import { findIndex } from 'lodash';

import useErr from '../../../hooks/useErr';
import useWorking from '../../../hooks/useWorking';

import { destroy, list, update } from '../TagService';
import ITag from '../ITag';
import CreateTagContainer from '../containers/CreateTagContainer';
import TagList from '../components/TagList';

const TagsContainer: FC = () => {

  const [tags, setTags] = useState<ITag[]>([]);
  const { err } = useErr();
  const { incrementWorking, decrementWorking } = useWorking();

  useEffect(() => {
    incrementWorking();
    list().then((tags: ITag[]) => {
      decrementWorking();
      setTags(tags);
    }, (e: any) => {
      decrementWorking();
      err(e);
    });
  }, [err, decrementWorking, incrementWorking]);

  function handleUpdateTag(tag: ITag){
    incrementWorking();
    update(tag).then(() => {
      decrementWorking();
      const newTags = tags.slice();
      newTags[findIndex(tags, { id: tag.id })] = tag;
      setTags(newTags);
    }, (e: any) => {
      decrementWorking();
      err(e);
    });
  }

  function handleDeleteTag(tag: ITag){
    incrementWorking();
    destroy(tag.id as number).then(() => {
      decrementWorking();
      const newTags = tags.slice();
      newTags.splice(findIndex(tags, { id: tag.id }), 1);
      setTags(newTags);
    }, (e: any) => {
      decrementWorking();
      err(e);
    });
  }

  function handleAfterCreateTag(){
    incrementWorking();
    list().then((tags: ITag[]) => {
      decrementWorking();
      setTags(tags);
    }, (e: any) => {
      decrementWorking();
      err(e);
    });
  }

  return <Fragment>
    <CreateTagContainer afterCreateTag={handleAfterCreateTag} />
    <TagList tags={tags} onUpdateTag={handleUpdateTag} onDeleteTag={handleDeleteTag} />
  </Fragment>
}

export default TagsContainer;
