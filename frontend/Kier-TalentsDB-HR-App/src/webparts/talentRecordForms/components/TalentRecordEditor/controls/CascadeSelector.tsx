import {Cascader} from 'antd';
import * as React from 'react';
import {inject, observer} from "mobx-react";

@inject("store")
@observer
export default class CascadeSelector extends React.Component<any, any> {

  BuildCascader = () => {
    return (
      <Cascader options={this.props.items}
                placeholder={this.props.placeholder}
                onChange={this.OnChange}
                size="small"
                changeOnSelect
                disabled={this.props.disabled}
      />
    )
  }

  OnChange = (value) => {
    this.props.changed(value);
  }

  render() {

    let initialValue = (this.props.item) ? this.props.item : [];

    const options = (this.props.item) ? {
      initialValue: initialValue,
      rules: [{required: this.props.required, message: this.props.validationMessage}]
    } : {
      rules: [{required: this.props.required, message: this.props.validationMessage}]
    }

    const element = this.props.form.getFieldDecorator(this.props.controlId, options)(this.BuildCascader());

    return element;

  }
}


