import * as React from 'react';
import {Switch} from "antd";


export default class NewHireSwitch extends React.Component {

  handleChange = () => {
    console.log("Changed");
  }

  render() {
    return (
      <Switch defaultChecked={false} onChange={this.handleChange}/>
    )
  }
}
