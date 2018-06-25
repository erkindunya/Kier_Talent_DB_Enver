import * as React from 'react';
import {Popover, Radio} from 'antd';

export default class OptionsSelector extends React.Component<any, any> {

  handleChange = (e) => {
    console.log(e.target.value);
    this.props.changed(e.target.value);
  }



  buildSelector = () => {
    const RadioButton = Radio.Button;
    const RadioGroup = Radio.Group;
    const content = "Welcome Welceom";
    return (
      <RadioGroup size="small" onChange={this.handleChange} disabled={this.props.disbaled}>
        {this.props.items.map(i => <Radio value={i.value}>{i.label}</Radio>)}
      </RadioGroup>
    )
  }

  render() {

    const initialValue = (this.props.value) ? this.props.value : []
    const options = (this.props.value) ? {
      initialValue: initialValue,
      rules: [{required: this.props.required, message: this.props.validationMessage}]
    } : {
      rules: [{required: this.props.required, message: this.props.validationMessage}]
    }

    const element = this.props.form.getFieldDecorator(this.props.controlId, options)(this.buildSelector())
    return element;
  }
}





