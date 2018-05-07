import * as React from 'react';
import {Select} from 'antd';
import {observer} from "mobx-react";


@observer
export default class FunctionSelector extends React.Component<any, any> {


  handleChange = (value) => {
    console.log(value)
  }

  buildFunctionSelector = () => {
    const Option = Select.Option;
    console.log(JSON.stringify(this.props.form))

    return (

      <Select onChange={this.handleChange} placeholder="Please select a business function">
        {
          this.props.items.map(f => <Option value={f.value}>{f.label}</Option>)
        }
      </Select>
    )
  }


  render() {
    const element = this.props.form.getFieldDecorator("businessFunctions", {
      /*initialValue:this.props.item.function,*/
      rules: [{required: true, message: 'Please select a function!'}]
    })(this.buildFunctionSelector())
    return element;
  }

}
