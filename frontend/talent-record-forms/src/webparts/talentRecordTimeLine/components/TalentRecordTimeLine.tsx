import * as React from 'react';
import {ITalentRecordTimeLineProps} from './ITalentRecordTimeLineProps';
import {escape} from '@microsoft/sp-lodash-subset';
import 'antd/dist/antd.less';
import {Timeline} from "antd";

export default class TalentRecordTimeLine extends React.Component<ITalentRecordTimeLineProps, {}> {
  public render(): React.ReactElement<ITalentRecordTimeLineProps> {
    return (
      <Timeline>
        <Timeline.Item color="green">Employee Hired 2015-09-01</Timeline.Item>
        <Timeline.Item color="green">Changed Business Unit From XYZ to BMW 2015-09-01</Timeline.Item>
        <Timeline.Item color="red">
          <p>First Talent Record Created</p>
          <p>Potential Rating is set to 4</p>
          <p>Performance Rating is set 6</p>
        </Timeline.Item>
        <Timeline.Item>
          <p>New Manager assigned</p>
          <p>Changed Position to Software Engineer Level 5</p>
          <p>Flight Risk was upgraded to High</p>
        </Timeline.Item>
        <Timeline.Item color="green">Employee Hired 2015-09-01</Timeline.Item>
        <Timeline.Item color="green">Changed Business Unit From XYZ to BMW 2015-09-01</Timeline.Item>
        <Timeline.Item color="red">
          <p>First Talent Record Created</p>
          <p>Potential Rating is set to 4</p>
          <p>Performance Rating is set 6</p>
        </Timeline.Item>
        <Timeline.Item>
          <p>New Manager assigned</p>
          <p>Changed Position to Software Engineer Level 5</p>
          <p>Flight Risk was upgraded to High</p>
        </Timeline.Item>
        <Timeline.Item color="green">Employee Hired 2015-09-01</Timeline.Item>
        <Timeline.Item color="green">Changed Business Unit From XYZ to BMW 2015-09-01</Timeline.Item>
        <Timeline.Item color="red">
          <p>First Talent Record Created</p>
          <p>Potential Rating is set to 4</p>
          <p>Performance Rating is set 6</p>
        </Timeline.Item>
        <Timeline.Item>
          <p>New Manager assigned</p>
          <p>Changed Position to Software Engineer Level 5</p>
          <p>Flight Risk was upgraded to High</p>
        </Timeline.Item>
        <Timeline.Item color="green">Employee Hired 2015-09-01</Timeline.Item>
        <Timeline.Item color="green">Changed Business Unit From XYZ to BMW 2015-09-01</Timeline.Item>
        <Timeline.Item color="red">
          <p>First Talent Record Created</p>
          <p>Potential Rating is set to 4</p>
          <p>Performance Rating is set 6</p>
        </Timeline.Item>
        <Timeline.Item>
          <p>New Manager assigned</p>
          <p>Changed Position to Software Engineer Level 5</p>
          <p>Flight Risk was upgraded to High</p>
        </Timeline.Item>
      </Timeline>
    );
  }
}
