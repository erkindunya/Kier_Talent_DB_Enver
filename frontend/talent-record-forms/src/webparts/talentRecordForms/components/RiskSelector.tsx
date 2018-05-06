import * as React from 'react';
import {Radio} from 'antd';
import {observe} from "mobx";
import {observer} from "mobx-react";

@observer
export default class RiskSelector extends React.Component<any, any> {

  handleChange = (e) => {
    console.log(e.target.value);
  }

  buildRiskSelector = () => {
    const RadioButton = Radio.Button;
    const RadioGroup = Radio.Group;
    return (
      <RadioGroup onChange={this.handleChange}>
        {
          this.props.items.map(r => <RadioButton value={r.value}>{r.label}</RadioButton>)
        }
      </RadioGroup>
    )
  }

  render() {
    return this.buildRiskSelector();
  }
}





