import * as React from 'react';
import {Radio} from 'antd';

export default class MovementStatusSelector extends React.Component {

  handleChange = (e) => {
    console.log(e.target.value);
  }

  buildSelector = () => {
    const RadioButton = Radio.Button;
    const RadioGroup = Radio.Group;
    return (
      <RadioGroup onChange={this.handleChange}>
        <RadioButton value="Now">Now</RadioButton>
        <RadioButton value="Soon">Soon</RadioButton>
        <RadioButton value="Future">Future</RadioButton>
        <RadioButton value="Lateral">Lateral</RadioButton>
      </RadioGroup>
    )
  }

  render() {
    return this.buildSelector();
  }
}





