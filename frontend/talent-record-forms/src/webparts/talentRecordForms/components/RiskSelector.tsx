import * as React from 'react';
import {Radio} from 'antd';

export default class RiskSelector extends React.Component {

  handleChange = (e) => {
    console.log(e.target.value);
  }

  buildRiskSelector = () => {
    const RadioButton = Radio.Button;
    const RadioGroup = Radio.Group;
    return (
      <RadioGroup onChange={this.handleChange}>
        <RadioButton value="High">High</RadioButton>
        <RadioButton value="Medium">Medium</RadioButton>
        <RadioButton value="Low">Low</RadioButton>
      </RadioGroup>
    )
  }

  render() {
    return this.buildRiskSelector();
  }
}





