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
      <RadioGroup size="small" onChange={this.handleChange}>
        {this.props.items.map(i => <RadioButton value={i.value}>{i.label}</RadioButton>)}
      </RadioGroup>
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

    const element = this.props.form.getFieldDecorator(this.props.controlId, options)(this.buildSelector())
    return element;
  }
}





