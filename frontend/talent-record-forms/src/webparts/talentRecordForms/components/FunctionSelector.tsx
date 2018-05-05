import * as React from 'react';
import {Select} from 'antd';
import functions from './mockData/Functions';

export default class FunctionSelector extends React.Component{


  handleChange = (value)=>{
    console.log(value)
  }

  buildFunctionSelector = () =>{
    const Option = Select.Option;
    return (
      <Select onChange={this.handleChange}>
        {
          functions.map(f => <Option value={f.value}>{f.label}</Option>)
        }
      </Select>
    )
  }


  render(){
    return this.buildFunctionSelector();
  }

}
