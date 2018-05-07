import * as React from 'react';
import {Slider} from "antd";

export default  class PerformanceRatingSlider extends React.Component{

  formatTip = (value)=>{
    //Todo : refactor to make it more intelligent
    if (value == 0)
      return 1;
    if (value == 25)
      return 2;
    if (value == 50)
      return 3;
    if (value == 75)
      return 4;
    if (value == 100)
      return 5;
    return value;
  }
  render(){
    return(
      <Slider marks={{0:'1',25:'2',50:'3',75:'4',100:'5'}} tipFormatter={this.formatTip}  defaultValue={0} step={null}/>
    )
  }
}
