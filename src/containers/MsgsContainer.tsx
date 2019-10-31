import { Component } from 'react';
import { IMsg, subscribeToMsgs, unsubscribeFromMsgs } from '../services/MsgService';

interface IProps{
  children: (props: IState) => any;
}

interface IState{
  msgs: IMsg[]
}

export default class MsgsContainer extends Component<IProps, IState> {
  state = {
    msgs: []
  }

  constructor(props:IProps){
    super(props);
    this.setMsgs = this.setMsgs.bind(this);
  }

  setMsgs(msgs: IMsg[]){
    this.setState({ msgs });
  }

  componentDidMount(){
    subscribeToMsgs(this.setMsgs);
  }

  componentWillUnmount(){
    unsubscribeFromMsgs(this.setMsgs);
  }

  render(){
    return this.props.children(this.state);
  }
}
