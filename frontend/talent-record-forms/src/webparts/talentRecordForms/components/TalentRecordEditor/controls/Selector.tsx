import * as React from 'react';
import {Select} from 'antd';
import {observer} from "mobx-react";


@observer
export default class Selector extends React.Component<any, any> {


  handleChange = (value) => {
    console.log(value)
  }

  buildFunctionSelector = () => {
    const Option = Select.Option;
    return (

      <Select onChange={this.handleChange} placeholder={this.props.placeholder}>
        {
          this.props.items.map(f => <Option value={f.value}>{f.label}</Option>)
        }
      </Select>
    )
  }


  render() {

    const initialValue = (this.props.item) ? this.props.converter(this.props.item) : []
    const options = (this.props.item) ? {
      initialValue: initialValue,
      rules: [{required: true, message: this.props.validationMessage}]
    } : {
      rules: [{required: true, message: this.props.validationMessage}]
    }

    const element = this.props.form.getFieldDecorator(this.props.controlId, options)(this.buildFunctionSelector())
    return element;
  }

}
