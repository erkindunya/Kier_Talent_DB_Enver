import { Cascader } from 'antd';
import * as React from 'react';
import requirements from './mockData/DevelopmentRequirements';

export default class DevelopmentRequirementCascader extends React.Component{

  onChange(value){
    console.log(value);
  }
  render (){
    return(<Cascader options={requirements} onChange={this.onChange} placeholder="Please a development option"/>)
  }
}


