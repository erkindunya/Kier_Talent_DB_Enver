import { Cascader } from 'antd';
import * as React from 'react';
import BusinessUnits from '../../../../stores/services/mockData/BusinessUnits';
import {observer} from "mobx-react";

@observer
export default class BusinessUnitsCascader extends React.Component<any, any> {

  onChange(value){
    console.log(value);
  }
  render (){
    return (<Cascader options={this.props.items} onChange={this.onChange} placeholder="Please select business units"/>)
  }
}


