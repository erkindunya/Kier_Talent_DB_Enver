import * as React from 'react';
import {Select} from 'antd';
import {observer} from "mobx-react";


@observer
export default class FunctionSelector extends React.Component<any, any> {


  handleChange = (value)=>{
    console.log(value)
  }

  buildFunctionSelector = () =>{
    const Option = Select.Option;
    return (
      <Select onChange={this.handleChange}>
        {
          this.props.items.map(f => <Option value={f.value}>{f.label}</Option>)
        }
      </Select>
    )
  }


  render(){
    return this.buildFunctionSelector();
  }

}
