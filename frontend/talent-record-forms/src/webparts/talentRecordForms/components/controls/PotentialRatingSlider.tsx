import * as React from 'react';
import {Slider} from "antd";

export default class PotentialRatingSlider extends React.Component{

  formatTip = (value)=>{
    //Todo : refactor to make it more intelligent
    if (value == 0)
      return "A";
    if (value == 50)
      return "B";
    if (value == 100)
      return "C";
    return value;
  }
  render(){
    return(
      <Slider marks={{0:'A',50:'B',100:'C'}} tipFormatter={this.formatTip}  defaultValue={0} step={null}/>
    )
  }
}
