import React from 'react';
import { Grow } from '@material-ui/core';

import ListCollapse, { IIdentifiable, IWrapper } from './ListCollapse';

export default class ListGrow<T extends IIdentifiable> extends ListCollapse<T> {

  renderWrapper(wrapper:IWrapper<T>) {
    return (
      <Grow
        key={wrapper.item.id}
        in={wrapper.in}
        timeout={this.props.timeout}
        onExited={() => this.handleRemove(wrapper.item.id as number)}>
        {this.props.component(wrapper.item)}
      </Grow>
    );
  }
}
