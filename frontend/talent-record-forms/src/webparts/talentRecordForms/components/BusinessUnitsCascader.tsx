import { Cascader } from 'antd';
import * as React from 'react';
import businessUnits from './mockData/BusinessUnits';

export default class BusinessUnitsCascader extends React.Component{

  onChange(value){
    console.log(value);
  }
  render (){
    return(<Cascader options={businessUnits} onChange={this.onChange} placeholder="Please select business units"/>)
  }
}


