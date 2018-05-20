import * as React from 'react';
import {Spin} from "antd";

const LoadingSpinner = (props) => {

  const style = {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    vAlign: 'middle',
    height: '900'
  }
  return <div style={style}><Spin size="large" tip={"Loading Talent" +
  " Data"}/></div>
}

export default LoadingSpinner;
