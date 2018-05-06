import { Cascader } from 'antd';
import * as React from 'react';
import requirements from '../../../stores/services/mockData/DevelopmentRequirements';
import {observer} from "mobx-react";

@observer
export default class DevelopmentRequirementCascader extends React.Component<any, any> {

  onChange(value){
    console.log(value);
  }
  render (){
    return (<Cascader options={this.props.items} onChange={this.onChange} placeholder="Please a development option"/>)
  }
}


