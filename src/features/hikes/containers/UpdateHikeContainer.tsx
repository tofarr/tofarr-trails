import React, { FC, Fragment, useEffect, useState } from 'react';
import { Button, Checkbox, Collapse, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Add';

import MoreToggle from '../../../components/MoreToggle';
import Timestamp from '../../../components/Timestamp';

import IHike from '../IHike';
import { updateHike, destroyHike } from '../HikeService';
import HikeForm from '../components/HikeForm';
import IHikeTag from '../../hikeTags/IHikeTag';
import { listTags, readAllTags } from '../../tags/TagService';
import { createHikeTag, destroyHikeTag, listHikeTags } from '../../hikeTags/HikeTagService';
import { createPoint } from '../../points/PointService';
import ITag from '../../tags/ITag';
import PointsContainer from '../../points/containers/PointsContainer';
import PointGraphContainer from '../../points/containers/PointGraphContainer';

export interface IHikeContainerProps{
  hike: IHike;
  afterDestroy?: (hike:IHike) => void;
}

const UpdateHikeContainer: FC<IHikeContainerProps> = (props) => {

  const hikeId = props.hike.id as number;
  const [hike, setHike] = useState<IHike>(props.hike);
  const [selectableTags,setSelectableTags] = useState<ITag[]|undefined>(undefined);
  const [selectedTags,setSelectedTags] = useState<ITag[]|undefined>(undefined);
  const [pointsMore,setPointsMore] = useState(false);
  const [graphMore,setGraphMore] = useState(false);
  const [recordId,setRecordId] = useState<number|undefined>(undefined);

  useEffect(() => {
    listHikeTags(hikeId).then((hikeTags: IHikeTag[]) => {
      readAllTags(hikeTags.map(hikeTag => hikeTag.tag_id)).then(setSelectedTags)
    });
  }, [hikeId]);

  function handleSearchTags(){
    listTags().then(setSelectableTags);
  }

  function handleUpdate(_hike: IHike){
    updateHike(_hike).then(setHike);
  }

  function handleDestroy(){
    destroyHike(hike.id as number).then(()=>{
      const { afterDestroy } = props;
      if(afterDestroy){
        afterDestroy(hike);
      }
    });
  }

  function handleAddTag(tag:ITag){
    createHikeTag(hike.id as number, tag.id as number).then(() => {
      let newTags = (selectedTags || []).slice();
      newTags.push(tag);
      setSelectedTags(newTags);
    });
  }

  function handleRemoveTag(tag: ITag){
    destroyHikeTag(hike.id as number, tag.id as number).then(() => {
      if(selectedTags){
        setSelectedTags(selectedTags.filter((selectedTag) => selectedTag.id !== tag.id));
      }
    });
  }

  function handleRecording(){
    if(recordId){
      navigator.geolocation.clearWatch(recordId);
      setRecordId(undefined);
      return;
    }else{
      setRecordId(navigator.geolocation.watchPosition(handlePosition));
    }
  }

  function handlePosition(position:Position){
    const { coords } = position;
    createPoint({
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude,
      hike_id: hike.id as number
    })
  }

  function renderActionComponent(){
    return (
      <Button fullWidth color="secondary" variant="contained" onClick={() => handleDestroy()}>
        <DeleteIcon />
        Delete Hike
      </Button>
    )
  }

  function renderMoreComponent(){
    return (
      <Fragment>
        <Grid container>
          <Grid item xs={12} sm>
            <Timestamp label="Created At" value={hike.created_at} />
          </Grid>
          <Grid item xs={12} sm>
            <Timestamp label="Updated At" value={hike.updated_at} />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color={recordId ? "secondary" : "default"}
              onClick={handleRecording}>
              <Checkbox checked={!!recordId} />
              Record
            </Button>
          </Grid>
        </Grid>

        <MoreToggle
          more={pointsMore}
          setMore={setPointsMore}
          moreLabel="Show Points"
          lessLabel="Hide Points" />

        <Collapse in={pointsMore} mountOnEnter={true}>
          <PointsContainer hike_id={hike.id as number} />
        </Collapse>


        <MoreToggle
          more={graphMore}
          setMore={setGraphMore}
          moreLabel="Show Graph"
          lessLabel="Hide Graph" />

        <Collapse in={graphMore}>
          <PointGraphContainer hike_id={hike.id as number} />
        </Collapse>

      </Fragment>
    )
  }

  return (
    <HikeForm
      hike={hike}
      onUpdateHike={handleUpdate}
      selectableTags={selectableTags}
      onSearchTags={handleSearchTags}
      selectedTags={selectedTags || []}
      onAddTag={handleAddTag}
      onRemoveTag={handleRemoveTag}
      actionComponent={renderActionComponent()}
      moreComponent={renderMoreComponent} />
  );
}

export default UpdateHikeContainer;
