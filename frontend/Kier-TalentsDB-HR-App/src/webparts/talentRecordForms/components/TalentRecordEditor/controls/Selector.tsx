import * as React from 'react';
import {Select} from 'antd';
import {observer} from "mobx-react";


@observer
export default class Selector extends React.Component<any, any> {


  handleChange = (value) => {
    console.log(value)
    this.props.changed(value);
  }

  buildFunctionSelector = () => {
    const Option = Select.Option;
    return (

      <Select disabled={this.props.disabled} size="small" onChange={this.handleChange} placeholder={this.props.placeholder}>
        {
          this.props.items.map(f => <Option value={f.value}>{f.label}</Option>)
        }
      </Select>
    )
  }


  render() {

    const initialValue = (this.props.value) ? this.props.value : []
    const options = (this.props.value) ? {
      initialValue: initialValue,
      rules: [{required: true, message: this.props.validationMessage}]
    } : {
      rules: [{required: true, message: this.props.validationMessage}]
    }

    const element = this.props.form.getFieldDecorator(this.props.controlId, options)(this.buildFunctionSelector())
    return element;
  }

}
